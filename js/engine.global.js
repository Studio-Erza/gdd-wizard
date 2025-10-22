(function(){
  'use strict';
  const C = window.GDDWContent || {};

  const {
    LABEL_LIMIT, DIAGRAM_SCALES, DEFAULT_DIAGRAM_SCALE,
    DEFAULT_IMG_MM, MIN_IMG_MM, MAX_IMG_MM, STEP_IMG_MM,
    todayISO, escapeHtml, escapeHtmlAttr,
    resolveExportOrder, FrameworkRegistry, Exporters, TemplateRegistry,
    sectionHTML, renderFooter
  } = C;

  // ---- Lightweight i18n helpers for runtime dialogs ----
  function i18nText(key, fallback){
    try{
      if (window.I18N && typeof I18N.t === 'function') return I18N.t(key, fallback);
    }catch(e){}
    return fallback || key;
  }
  function i18nConfirm(key, fallback){ return confirm(i18nText(key, fallback)); }
  function i18nAlert(key, fallback){ return alert(i18nText(key, fallback)); }

  // --- File System Access helpers (Chromium-based browsers) ---
  const FS = {
    supported: () => !!(window.showSaveFilePicker || window.showDirectoryPicker || window.showOpenFilePicker),

    // tiny IndexedDB wrapper to store a directory handle
    async _db(){ 
      return await new Promise((res, rej)=>{
        const req = indexedDB.open('gddw-fs', 1);
        req.onupgradeneeded = () => req.result.createObjectStore('handles');
        req.onsuccess = () => res(req.result);
        req.onerror = () => rej(req.error);
      });
    },
    async _get(key){
      const db = await FS._db();
      return await new Promise((res, rej)=>{
        const tx = db.transaction('handles','readonly');
        const st = tx.objectStore('handles');
        const rq = st.get(key);
        rq.onsuccess = () => res(rq.result || null);
        rq.onerror = () => rej(rq.error);
      });
    },
    async _set(key, val){
      const db = await FS._db();
      return await new Promise((res, rej)=>{
        const tx = db.transaction('handles','readwrite');
        const st = tx.objectStore('handles');
        const rq = st.put(val, key);
        rq.onsuccess = () => res(true);
        rq.onerror = () => rej(rq.error);
      });
    },

    // Ask once and remember
    async pickAndRememberDir(){
      const dir = await window.showDirectoryPicker();
      await FS._set('exportDir', dir);
      return dir;
    },

    // Get previously remembered dir (or null)
    async getRememberedDir(){
      const dir = await FS._get('exportDir');
      if (!dir) return null;

      // Check permission; if not granted, request it
      const perm = await dir.queryPermission({ mode: 'readwrite' });
      if (perm === 'granted') return dir;
      const req = await dir.requestPermission({ mode: 'readwrite' });
      return (req === 'granted') ? dir : null;
    },

    // Save text to a file inside a chosen directory
    async saveTextInDir(dirHandle, filename, text){
      const fileHandle = await dirHandle.getFileHandle(filename, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(text);
      await writable.close();
    },

    // Open a file picker starting in a known directory
    async openFromDir(dirHandle, pickerOpts){
      if (window.showOpenFilePicker) {
        const [fh] = await window.showOpenFilePicker({
          startIn: dirHandle || 'downloads',
          multiple: false,
          types: pickerOpts?.types || [
            { description: 'JSON', accept: { 'application/json': ['.json'] } }
          ]
        });
        const file = await fh.getFile();
        return await file.text();
      }
      return null; // signal fallback path
    }
  };

  // Storage
  const STORAGE_PREFIX = 'gddw';
  const LEGACY_STORAGE_KEY = 'gddw';

  // State (ensure a default exportTheme so the Theme buttons always show/activate)
  const Wizard = { step: 0, steps: [], data: { templateId: 'basic', exportTheme: 'light' } };

  // Preference keys to keep across local storage & JSON exports
  const PREF_KEYS = ['diagramScale','exportTheme'];
  const BASIC_TEMPLATE_PREF_KEYS = ['metaImageMM','coverInvert'];
  function preferenceKeysForTemplate(t){
    const keys = [...PREF_KEYS];
    if ((t?.id||'basic') === 'basic') keys.push(...BASIC_TEMPLATE_PREF_KEYS);
    return keys;
  }

  // Template plumbing
  const TemplateSelectorStep = {
    key: 'template',
    title: 'step.template.title',
    hint: 'step.template.hint',
    single: true,
    fields: [
      { type:'radios', name:'templateId', label:'field.templateId.label' },
      { type: 'info', name: 'jamTips', html: `
          <div class="tipsTitle">ui.jamTips.title</div>
          <ul class="tipsList">
            <li>ui.jamTips.docCaptain</li>
            <li>ui.jamTips.discordCall</li>
            <li>ui.jamTips.pdfExport</li>
            <li>ui.jamTips.milestoneCheckins</li>
          </ul>
        ` }
    ]
  };
  function getActiveTemplate(){ const id=String(Wizard.data.templateId||'basic'); return (TemplateRegistry && TemplateRegistry[id]) || TemplateRegistry?.basic || { id:id, sections: [] }; }
  function stepsForActiveTemplate(){
    const t = getActiveTemplate();
    const steps = (t.sections || []).map(entry => {
      const F = FrameworkRegistry && FrameworkRegistry[entry.framework];
      const title = entry.title || (F && F.title ? F.title(entry.rules, entry) : entry.id);
      const fields = F && F.step ? F.step(entry.rules, entry) : [];
      return { key: entry.id, title, fields, single: !!(F && F.single), hint: entry.hint, rules: (entry.rules||{}), framework: entry.framework, raw: entry };
    });
    return [TemplateSelectorStep, ...steps];
  }

  // DOM
  const stepsEl = document.getElementById('steps');
  const fieldsEl = document.getElementById('fields');
  const progressBarEl = document.getElementById('progressBar');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  const btnExportJSON = document.getElementById('btnExportJSON');
  const btnImportJSON = document.getElementById('btnImportJSON');
  const importJSONInput = document.getElementById('importJSON');
  const btnReset = document.getElementById('btnReset');
  const btnPrintHeader = document.getElementById('btnPrintHeader');

  function buildSteps(){ stepsEl.innerHTML=''; Wizard.steps.forEach((s,i)=>{ const el=document.createElement('div'); el.className='step'+(i===Wizard.step?' active':''); el.innerHTML=`<span class="step-index">${i+1}</span><span>${escapeHtml(s.title)}</span>`; el.onclick=()=>go(i); stepsEl.appendChild(el); }); }
  function buildStepsNavProgress(){ buildSteps(); const pct=(Wizard.step)/(Math.max(1,Wizard.steps.length-1))*100; progressBarEl.style.width=pct+'%'; }

  function renderField(field,parent){
    if (field.type==='dynamic-steps')      return parent.appendChild(renderDynamicSteps(field));
    if (field.type==='dynamic-features')   return parent.appendChild(renderDynamicFeatures(field));
    if (field.type==='dynamic-team')       return parent.appendChild(renderDynamicTeam(field));
    if (field.type==='dynamic-milestones') return parent.appendChild(renderDynamicMilestones(field));
    if (field.type==='image')              return parent.appendChild(renderImageField(field));
    if (field.type==='review-panel')       return parent.appendChild(renderReviewPanel(field.variant));
    if (field.type === 'info') {
      const wrap = document.createElement('div');
      wrap.className = 'infoPanel';
      wrap.innerHTML = field.html || '';
      parent.appendChild(wrap);
      return wrap;
    }
    const wrap=document.createElement('div'); if(parent.classList.contains('single')) wrap.style.gridColumn='1 / -1'; if(field.label){ const lab=document.createElement('label'); lab.textContent=field.label; wrap.appendChild(lab); }   
	if (field.type==='textarea'){ const ta=document.createElement('textarea'); ta.placeholder=field.placeholder||''; ta.value=Wizard.data[field.name]||''; ta.oninput=e=>set(field.name,e.target.value); wrap.appendChild(ta); parent.appendChild(wrap); return wrap; }
    if (field.type==='checkboxes'){ 
  const list=document.createElement('div'); 
  list.className='checklist'; 
  const cur=new Set(Wizard.data[field.name]||[]); 
  (field.options||[]).forEach(opt=>{
    const lab=document.createElement('label'); 
    lab.className='chip'; 
    const cb=document.createElement('input'); 
    cb.type='checkbox'; 
    cb.value=opt;                  // store the i18n key as value
    cb.checked=cur.has(opt); 
    cb.onchange=()=>{
      const now=new Set(Wizard.data[field.name]||[]); 
      if(cb.checked) now.add(opt); else now.delete(opt); 
      set(field.name, Array.from(now)); 
    }; 
    lab.appendChild(cb); 
    // label text is the i18n key, translation system will replace it
    lab.appendChild(document.createTextNode(opt)); 
    list.appendChild(lab); 
  }); 
  wrap.appendChild(list); 
  parent.appendChild(wrap); 
  return wrap; 
}
    if (field.type==='radios'){ const list=document.createElement('div'); list.className='radio-group'; if(field.name==='templateId'){ const current=String(Wizard.data.templateId||'basic'); Object.values(TemplateRegistry||{}).forEach(tpl=>{ const row=document.createElement('label'); row.className='radio-option'; const rb=document.createElement('input'); rb.type='radio'; rb.name='templateId'; rb.value=tpl.id; rb.checked=(tpl.id===current); rb.onchange=()=>{ switchTemplate(tpl.id); }; row.appendChild(rb); row.appendChild(document.createTextNode(tpl.label||tpl.id)); list.appendChild(row); }); } wrap.appendChild(list); parent.appendChild(wrap); return wrap; }
    const inp=document.createElement('input'); inp.type=field.inputType||'text'; inp.placeholder=field.placeholder||''; inp.value=Wizard.data[field.name]||field.value||''; inp.oninput=e=>set(field.name,e.target.value); wrap.appendChild(inp); parent.appendChild(wrap); return wrap;
  }

  function repeatableEditor(cfg){
    const wrap=document.createElement('div');
    wrap.className='featureCard';

    const header=document.createElement('div');
    header.className='featureHeader';
    header.appendChild(document.createElement('div')).innerHTML=`<span class="featureTitle">${escapeHtml(cfg.title)}</span> <span class="muted">(${cfg.items.length})</span>`;

    const add=document.createElement('button');
    add.className='icon secondary';
    add.textContent='btn.add';
    const canAdd = (cfg.maxItems==null) || (cfg.items.length < cfg.maxItems);
    add.disabled = !canAdd;
    add.onclick=()=>{ if(cfg.maxItems!=null && cfg.items.length>=cfg.maxItems) return; cfg.items.push(cfg.create()); persist(); render(); };
    header.appendChild(add);
    wrap.appendChild(header);

    const list=document.createElement('div');
    list.className='fields single';

    const api={
      controls(idx){
        const row=document.createElement('div');
        row.className='row';
        const up=document.createElement('button');
        up.className='icon secondary';
        up.textContent='ui.arrow.up';
        up.onclick=()=>{ if(idx>0){ const a=cfg.items[idx-1]; cfg.items[idx-1]=cfg.items[idx]; cfg.items[idx]=a; persist(); render(); } };
        const dn=document.createElement('button');
        dn.className='icon secondary';
        dn.textContent='ui.arrow.down';
        dn.onclick=()=>{ if(idx<cfg.items.length-1){ const a=cfg.items[idx+1]; cfg.items[idx+1]=cfg.items[idx]; cfg.items[idx]=a; persist(); render(); } };
        const rm=document.createElement('button');
        rm.className='icon secondary btn-remove-step';
        rm.textContent='btn.remove';
        const canRemove = (cfg.minItems==null) || (cfg.items.length > cfg.minItems);
        rm.disabled = !canRemove;
        rm.onclick=()=>{ if(cfg.minItems!=null && cfg.items.length<=cfg.minItems) return; cfg.items.splice(idx,1); persist(); render(); };
        row.appendChild(up); row.appendChild(dn); row.appendChild(rm);
        return row;
      }
    };

    cfg.items.forEach((row,idx)=>{ const card=document.createElement('div'); card.className='featureCard'; const parts=cfg.renderRow(row,idx,api); parts.forEach(ch=>card.appendChild(ch)); list.appendChild(card); });
    wrap.appendChild(list);

    const outer=document.createElement('div');
    outer.style.gridColumn='1 / -1';
    outer.appendChild(wrap);
    return outer;
  }

  function renderDynamicSteps(field){
    const MIN_ITEMS = 3;
    const MAX_ITEMS = 12;
    if(!Array.isArray(Wizard.data.loopSteps)) Wizard.data.loopSteps=['','',''];
    Wizard.data.loopSteps = Wizard.data.loopSteps.slice(0, MAX_ITEMS);
    while (Wizard.data.loopSteps.length < MIN_ITEMS) Wizard.data.loopSteps.push('');

    return repeatableEditor({
      title:'section.loopSteps',
      items:Wizard.data.loopSteps,
      minItems: MIN_ITEMS,
      maxItems: MAX_ITEMS,
      create:()=>'' ,
      renderRow:(txt,idx,api)=>{
        const ph=field.placeholders||{};
        const inp=document.createElement('input');
        inp.type='text';
        inp.placeholder=ph.label??'ph.loop.label';
        inp.maxLength=LABEL_LIMIT;
        inp.value=(txt==null?'':txt);
        inp.oninput=e=>{ Wizard.data.loopSteps[idx]=e.target.value; persist(); };
        return [inp, api.controls(idx)];
      }
    });
  }

  // i18n-aware Feature header helper
  function i18nFeatureTitle(idx){
    const base = (window.I18N && typeof I18N.t === 'function') ? (I18N.t('section.features') || 'Feature') : 'Feature';
    return `${base} ${idx + 1}`;
  }

  function renderDynamicFeatures(field){
    if(!Array.isArray(Wizard.data.features)||Wizard.data.features.length===0){ Wizard.data.features=[{title:'',purpose:'',impact:''}]; }
    return repeatableEditor({
      title:'section.features',
      items:Wizard.data.features,
      create:()=>({title:'',purpose:'',impact:''}),
      renderRow:(row,idx,api)=>{
        const ph=field.placeholders||{};
        const ttl=document.createElement('input'); ttl.type='text'; ttl.placeholder=ph.title??'ph.features.title'; ttl.value=row.title||''; ttl.oninput=e=>{ row.title=e.target.value; persist(); };
        const purL=document.createElement('label'); purL.textContent='field.purpose';
        const pur=document.createElement('textarea'); pur.placeholder=ph.purpose??'ph.features.purpose'; pur.value=row.purpose||''; pur.oninput=e=>{ row.purpose=e.target.value; persist(); };
        const impL=document.createElement('label'); impL.textContent='field.playerImpact';
        const imp=document.createElement('textarea'); imp.placeholder=ph.details??'ph.features.details'; imp.value=row.impact||''; imp.oninput=e=>{ row.impact=e.target.value; persist(); };
        const lbl=document.createElement('label'); const ft=i18nFeatureTitle(idx); lbl.textContent=ft; lbl.setAttribute('title', ft); lbl.setAttribute('aria-label', ft);
        return [lbl, ttl, purL, pur, impL, imp, api.controls(idx)];
      }
    });
  }

  // i18n-aware Milestone header helper
  function i18nMilestoneTitle(idx){
    const base = (window.I18N && typeof I18N.t === 'function') ? I18N.t('export.milestone') : 'Milestone';
    return `${base} ${idx + 1}`;
  }

  function renderDynamicMilestones(field){
    if(!Array.isArray(Wizard.data.milestones)||Wizard.data.milestones.length===0){ Wizard.data.milestones=[{date:'',notes:''},{date:'',notes:''}]; }
    return repeatableEditor({
      title:'section.milestones',
      items:Wizard.data.milestones,
      create:()=>({date:'',notes:''}),
      renderRow:(row,idx,api)=>{
        const ph=field.placeholders||{};
        const lbl=document.createElement('label'); lbl.textContent=i18nMilestoneTitle(idx); lbl.setAttribute('title', i18nMilestoneTitle(idx)); lbl.setAttribute('aria-label', i18nMilestoneTitle(idx));
        const dL=document.createElement('label'); dL.textContent='field.date';
        const dI=document.createElement('input'); dI.type='date'; dI.placeholder=ph.date||'ph.milestones.date'; dI.value=row.date||''; dI.oninput=e=>{ row.date=e.target.value; persist(); };
        const nL=document.createElement('label'); nL.textContent='field.notes';
        const nT=document.createElement('textarea'); nT.placeholder=ph.notes??'ph.milestones.notes'; nT.value=row.notes||''; nT.oninput=e=>{ row.notes=e.target.value; persist(); };
        return [lbl, dL, dI, nL, nT, api.controls(idx)];
      }
    });
  }

  // --- RESTORED: Team & Roles editor ---
  function renderDynamicTeam(field){
    if(!Array.isArray(Wizard.data.teamMembers) || Wizard.data.teamMembers.length===0){
      const legacy=String(Wizard.data.team||'').trim();
      Wizard.data.teamMembers = legacy ? [{ member: legacy, role: '' }] : [{ member:'', role:'' }];
    }
    return repeatableEditor({
      title:'section.teamRoles',
      items: Wizard.data.teamMembers,
      create:()=>({ member:'', role:'' }),
      renderRow:(row, idx, api)=>{
        const ph = field.placeholders || {};
        const roleL=document.createElement('label'); roleL.textContent='field.role';
        const role=document.createElement('input'); role.type='text'; role.placeholder=ph.role??'ph.team.role'; role.value=row.role||''; role.oninput=e=>{ row.role=e.target.value; persist(); };
        const memL=document.createElement('label'); memL.textContent='field.member';
        const mem=document.createElement('input'); mem.type='text'; mem.placeholder=ph.member??'ph.team.member'; mem.value=row.member||''; mem.oninput=e=>{ row.member=e.target.value; persist(); };
        return [roleL, role, memL, mem, api.controls(idx)];
      }
    });
  }

  function renderImageField(field){ const wrap=document.createElement('div'); wrap.style.gridColumn='1 / -1'; const lab=document.createElement('label'); lab.textContent=field.label||'field.image'; wrap.appendChild(lab); const panel=document.createElement('div'); panel.className='imgPanel'; const row=document.createElement('div'); row.className='imgRow'; const thumb=document.createElement('div'); thumb.className='dz-thumb'; thumb.innerHTML=Wizard.data.metaImage?`<img src="${escapeHtmlAttr(Wizard.data.metaImage)}" alt="" />`:'ui.camera'; row.appendChild(thumb); const btnRow=document.createElement('div'); btnRow.className='btnRow'; const uploadBtn=document.createElement('button'); uploadBtn.className='secondary'; uploadBtn.textContent='btn.uploadImage'; const clearBtn=document.createElement('button'); clearBtn.className='secondary'; clearBtn.textContent='btn.clear'; btnRow.appendChild(uploadBtn); btnRow.appendChild(clearBtn); row.appendChild(btnRow); const sizeRow=document.createElement('div'); sizeRow.className='sizeRow'; const minus=document.createElement('button'); minus.className='secondary'; minus.textContent='ui.minus'; const sizeVal=document.createElement('span'); sizeVal.textContent=`${Number(Wizard.data.metaImageMM||DEFAULT_IMG_MM)} mm`; const plus=document.createElement('button'); plus.className='secondary'; plus.textContent='ui.plus'; sizeRow.appendChild(document.createTextNode('label.printSize')); sizeRow.appendChild(minus); sizeRow.appendChild(sizeVal); sizeRow.appendChild(plus); const tip=document.createElement('div'); tip.className='tip'; tip.innerHTML='tip.image.dragdrop'; panel.appendChild(row); panel.appendChild(sizeRow); panel.appendChild(tip); wrap.appendChild(panel); uploadBtn.onclick=()=>{ const inp=document.createElement('input'); inp.type='file'; inp.accept='image/*'; inp.onchange=e=>{ const f=e.target.files&&e.target.files[0]; if(f) handleImageFile(f); }; inp.click(); }; clearBtn.onclick=()=>{ set('metaImage',''); thumb.innerHTML='ui.camera'; persist(); }; minus.onclick=()=>{ const cur=Number(Wizard.data.metaImageMM||DEFAULT_IMG_MM); const next=Math.max(MIN_IMG_MM, cur-STEP_IMG_MM); set('metaImageMM', next); sizeVal.textContent=`${next} mm`; persist(); }; plus.onclick=()=>{ const cur=Number(Wizard.data.metaImageMM||DEFAULT_IMG_MM); const next=Math.min(MAX_IMG_MM, cur+STEP_IMG_MM); set('metaImageMM', next); sizeVal.textContent=`${next} mm`; persist(); }; let dragCounter=0; const acceptDrop=e=>{ e.preventDefault(); e.stopPropagation(); if(e.dataTransfer) e.dataTransfer.dropEffect='copy'; }; const onEnter=e=>{ acceptDrop(e); dragCounter++; panel.classList.add('dragging'); }; const onLeave=e=>{ acceptDrop(e); dragCounter=Math.max(0,dragCounter-1); if(dragCounter===0) panel.classList.remove('dragging'); }; const onOver=e=>acceptDrop(e); const onDrop=e=>{ acceptDrop(e); dragCounter=0; panel.classList.remove('dragging'); const dt=e.dataTransfer; if(!dt) return; const files=dt.files; if(files&&files.length){ handleImageFile(files[0]); } }; [panel, thumb].forEach(el=>{ el.addEventListener('dragenter', onEnter); el.addEventListener('dragleave', onLeave); el.addEventListener('dragover', onOver); el.addEventListener('drop', onDrop); }); async function handleImageFile(file){ const typeOk=(file.type&&/^image\//.test(file.type))||/\.(png|jpe?g|webp)$/i.test(file.name||''); if(!typeOk){ i18nAlert('err.image.type','Unsupported image type'); return; } try{ const dataUrl=await downscaleImage(file,1200,1200); thumb.innerHTML=`<img src="${escapeHtmlAttr(dataUrl)}" alt=""/>`; set('metaImage', dataUrl); render(); }catch(err){ i18nAlert('err.image.load','Image load failed'); } } const outer=document.createElement('div'); outer.style.gridColumn='1 / -1'; outer.appendChild(wrap); return outer; }

  function renderReviewPanel(variant){
    const wrap=document.createElement('div');
    wrap.style.gridColumn='1 / -1';

    const bar=document.createElement('div');
    bar.className='stickyBar';

    const sizeGroup=document.createElement('div');
    sizeGroup.className='group';
    sizeGroup.innerHTML=`<div class="title">ui.diagramSize</div>`;
    const sizeBtns=document.createElement('div');
    sizeBtns.className='btns';

    // Replace percentage buttons with − / + stepping through DIAGRAM_SCALES
    const minusBtn=document.createElement('button');
    minusBtn.textContent='ui.minus';
    const plusBtn=document.createElement('button');
    plusBtn.textContent='ui.plus';

    function currentIndex(){
      const s=Number(Wizard.data.diagramScale||DEFAULT_DIAGRAM_SCALE);
      let idx=0, best=Infinity;
      DIAGRAM_SCALES.forEach((v,i)=>{ const d=Math.abs(v-s); if(d<best){ best=d; idx=i; } });
      return idx;
    }
    function applyIndex(idx){
      const clamp=Math.max(0, Math.min(DIAGRAM_SCALES.length-1, idx));
      Wizard.data.diagramScale=DIAGRAM_SCALES[clamp];
      persist();
      minusBtn.disabled = (clamp===0);
      plusBtn.disabled  = (clamp===DIAGRAM_SCALES.length-1);
      renderPreview();
    }

    minusBtn.addEventListener('click',()=>applyIndex(currentIndex()-1));
    plusBtn.addEventListener('click',()=>applyIndex(currentIndex()+1));

    sizeBtns.appendChild(minusBtn);
    sizeBtns.appendChild(plusBtn);
    sizeGroup.appendChild(sizeBtns);

    // initialize disabled state
    (function initSizeControls(){ const idx=currentIndex(); minusBtn.disabled=(idx===0); plusBtn.disabled=(idx===DIAGRAM_SCALES.length-1); })();

    const themeGroup=document.createElement('div');
    themeGroup.className='group';
    themeGroup.innerHTML=`<div class="title">ui.theme</div>`;
    const themeBtns=document.createElement('div');
    themeBtns.className='btns';
    ['light','dark'].forEach(id=>{
      const b=document.createElement('button'); b.textContent = (id === 'light') ? 'theme.light' : 'theme.dark'; b.dataset.theme=id; b.onclick=()=>{ Wizard.data.exportTheme=id||'light'; persist(); syncTheme(); renderPreview(); }; themeBtns.appendChild(b);
    });
    function syncTheme(){ if (!Wizard.data.exportTheme) Wizard.data.exportTheme = 'light'; const th = Wizard.data.exportTheme==='dark' ? 'dark' : 'light'; [...themeBtns.children].forEach(b=> b.classList.toggle('active', b.dataset.theme===th)); }
    syncTheme();
    themeGroup.appendChild(themeBtns);

    const rightGroup=document.createElement('div');
    rightGroup.className='group right';
    const invertBtns=document.createElement('div');
    invertBtns.className='btns';
    if(variant==='basic'){
      const invertBtn=document.createElement('button');
      invertBtn.textContent='btn.invertCover';
      function syncInvert(){ invertBtn.classList.toggle('active', !!Wizard.data.coverInvert); }
      invertBtn.onclick=()=>{ Wizard.data.coverInvert=!Wizard.data.coverInvert; persist(); syncInvert(); renderPreview(); };
      syncInvert();
      invertBtns.appendChild(invertBtn);
    }

    const tools=document.createElement('div');
    const refreshBtn=document.createElement('button');
    refreshBtn.className='secondary';
    refreshBtn.textContent='btn.refreshPreview';
    refreshBtn.onclick=()=>renderPreview();
    const printBtn=document.createElement('button');
    printBtn.textContent='btn.print';
    printBtn.onclick=doPrint;

    bar.appendChild(sizeGroup);
    bar.appendChild(themeGroup);
    bar.appendChild(rightGroup);
    rightGroup.appendChild(invertBtns);

    wrap.appendChild(bar);
    wrap.appendChild(tools);
    tools.appendChild(refreshBtn);
    tools.appendChild(printBtn);

    const pv=document.createElement('div');
    pv.className='previewWrap';
    pv.innerHTML = `<div class="muted">ui.generatingPreview</div>`;
    wrap.appendChild(pv);

    renderPreview();

    async function renderPreview(){
      pv.innerHTML=`<div class="muted">ui.generatingPreview</div>`;
      const inner=await buildPrintHTML(Wizard.data);
      const theme=Wizard.data.exportTheme==='dark'?'dark':'light';
      pv.innerHTML=`<div class="previewPage theme-${theme}"><div class="previewContent">${inner}</div></div>`;
    }

    return wrap;
  }

  // --- MINIMAL FIX: prefer URL over BASE64 when running from file:// to avoid CORS ---
  async function ensureFooterLogoBase64() {
    if (location.protocol === 'file:') {
      // Force URL usage for footer logo during offline/file:// runs
      // renderFooter() will use FOOTER_LOGO_URL; leave BASE64 empty.
      window.FOOTER_LOGO_BASE64 = '';
      return;
    }
    if (window.FOOTER_LOGO_URL && !window.FOOTER_LOGO_BASE64) {
      try {
        const res = await fetch(window.FOOTER_LOGO_URL);
        const blob = await res.blob();
        const reader = new FileReader();
        const dataUrl = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
        // strip the "data:image/png;base64," prefix
        window.FOOTER_LOGO_BASE64 = String(dataUrl).split(',')[1] || '';
      } catch (e) {
        console.warn("Could not load footer logo:", e);
        window.FOOTER_LOGO_BASE64 = '';
      }
    }
  }

  // NEW: wait until an <img> is decode-ready (addresses first-print race for footer logo)
  async function waitForImageDecode(img, timeout = 1200) {
    if (!img) return; // nothing to wait for
    if (img.complete && img.naturalWidth > 0) return; // already ready
    if (typeof img.decode === 'function') {
      try {
        await Promise.race([
          img.decode(),
          new Promise((_, rej) => setTimeout(rej, timeout))
        ]);
        return;
      } catch (_) { /* fall through to events/timeout */ }
    }
    await new Promise((resolve) => {
      const t = setTimeout(resolve, timeout);
      img.addEventListener('load', () => { clearTimeout(t); resolve(); }, { once: true });
      img.addEventListener('error', () => { clearTimeout(t); resolve(); }, { once: true });
    });
  }

  // NOTE: Surgical change below — LoopOverview & ExampleSession render as h3 (no section wrapper)
  async function buildPrintHTML(d){
    const t=getActiveTemplate();
    const order=resolveExportOrder(t);
    const coverEntry=order.find(e=> e && e.id==='cover');
    const bodyEntries=order.filter(e=> e && e.id!=='cover' && e.id!=='review');

    const coverBlock=coverEntry ? (FrameworkRegistry[coverEntry.framework]?.export?.(d, coverEntry) || '') : '';

    const bodyHTML=bodyEntries.map(entry=>{
      const F=FrameworkRegistry[entry.framework];
      const title=entry.title || (F?.title ? F.title(entry.rules, entry) : entry.id);
      const inner=F?.export ? F.export(d, entry) : '';

      if (entry.id === 'loop_overview' || entry.id === 'example_session') {
        return `<h3>${escapeHtml(title)}</h3>${inner}`;
      }

      const cls=(entry.id==='core_loop') ? 'loop-section' : '';
      return sectionHTML(title, inner, cls);
    }).join('');

    const theme=(d.exportTheme==='dark')?'dark':'light';
    const footer=renderFooter(theme);
    const combined=`<div class="contentWrap">${coverBlock}${bodyHTML}</div>${footer}`;
    return `<div class="page"><div class="pageSafe">${combined}</div></div>`;
  }
  function ensurePrintRoot(){ let pv=document.getElementById('printView'); if(!pv){ pv=document.createElement('div'); pv.id='printView'; document.body.appendChild(pv); } return pv; }
  async function doPrint() {
  await ensureFooterLogoBase64();
  window.__GDDW_EXPORTING__ = true;const pv=ensurePrintRoot(); const theme=(Wizard.data.exportTheme==='dark')?'dark':'light'; pv.setAttribute('data-theme', theme); const html=await buildPrintHTML(Wizard.data); pv.innerHTML=`<div id="printBg"></div>` + html; await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))); try{ const page=pv.querySelector('.page'); const safe=page?.querySelector('.pageSafe'); if(page && safe){ const probe=document.createElement('div'); probe.style.height='100vh'; probe.style.opacity='0'; safe.appendChild(probe); const pageH=probe.getBoundingClientRect().height||0; probe.remove(); const secs=[...page.querySelectorAll('section')]; secs.forEach(s=>s.classList.remove('no-top-divider')); if(pageH>0){ const baseTop=safe.getBoundingClientRect().top; let prevIdx=null; const tol=2; secs.forEach((sec)=>{ const y=sec.getBoundingClientRect().top - baseTop; const idx=Math.floor((y+0.001)/pageH); const mod=((y%pageH)+pageH)%pageH; const isTop = mod < tol; if (isTop || (prevIdx!==null && idx>prevIdx)) sec.classList.add('no-top-divider'); prevIdx=idx; }); } } }catch(e){}

  // NEW: ensure footer logo image is decode-ready before printing (fixes first-print missing logo)
  const footerImg = pv.querySelector('.gdd-footer img');
  if (footerImg) {
    footerImg.setAttribute('loading', 'eager');
    footerImg.setAttribute('decoding', 'sync');
    await waitForImageDecode(footerImg, 1200);
  }
  await new Promise(r => setTimeout(r, 50));

  window.print(); window.__GDDW_EXPORTING__ = false;
}

  function go(index=Wizard.step, opts={}){ const preserve=!!opts.preserveScroll; const skipFocus=!!opts.skipFocus; const y=preserve?window.scrollY:0; Wizard.step=Math.max(0, Math.min(index, Wizard.steps.length-1)); const s=Wizard.steps[Wizard.step]; fieldsEl.classList.toggle('single', !!s.single); fieldsEl.innerHTML=''; s.fields.forEach(fld=>renderField(fld, fieldsEl)); buildStepsNavProgress(); prevBtn.disabled=(Wizard.step===0); nextBtn.textContent=(Wizard.step===Wizard.steps.length-1)?'btn.print':'btn.next'; if(!skipFocus){ const first=fieldsEl.querySelector('input,textarea,input[type="checkbox"],.dz-thumb,button'); if(first) first.focus(); } if(preserve){ requestAnimationFrame(()=> window.scrollTo({ top:y, behavior:'instant' })); } persist(); }
  function render(){ go(Wizard.step, { preserveScroll:true, skipFocus:true }); }

  function storageKeyFor(templateId){ return `${STORAGE_PREFIX}:${templateId}`; }
  function get(k){ return Wizard.data[k]; }
  function set(k,v){ Wizard.data[k]=v; persist(); }
  function persist(){ try{ localStorage.setItem(storageKeyFor(Wizard.data.templateId||'basic'), JSON.stringify(Wizard.data)); }catch(e){} }
  function migrateLegacyIfNeeded(){ try{ const raw=localStorage.getItem(LEGACY_STORAGE_KEY); if(!raw) return; const obj=JSON.parse(raw); if(obj && typeof obj==='object'){ const tid=String(obj.templateId||'basic'); const key=storageKeyFor(tid); if(!localStorage.getItem(key)){ localStorage.setItem(key, JSON.stringify(obj)); } localStorage.removeItem(LEGACY_STORAGE_KEY); } }catch(e){} }
  function loadTemplateData(templateId){
    const key=storageKeyFor(templateId);
    let data=null;
    try{ const raw=localStorage.getItem(key); if(raw) data=JSON.parse(raw); }catch(e){}
    if(!data) data=makeDefaultData(templateId);

    const t=(TemplateRegistry && TemplateRegistry[templateId]) || TemplateRegistry?.basic || { id: templateId, sections: [] };
    const orderedKeys=computeKeysInWizardOrder(t);
    const extraPrefs = preferenceKeysForTemplate(t);

    const allowed=new Set([...
      orderedKeys,'templateId', ...extraPrefs, 'metaImage']);
    const pruned={};
    Object.keys(data||{}).forEach(k=>{ if(allowed.has(k)) pruned[k]=data[k]; });
    return pruned;
  }
  function computeKeysInWizardOrder(t){ const keys=[]; (t.sections||[]).forEach(entry=>{ const F=FrameworkRegistry && FrameworkRegistry[entry.framework]; const fields=F && F.step ? F.step(entry.rules, entry) : []; fields.forEach(f=>{ if(f && typeof f==='object'){ if(f.type==='input' || f.type==='textarea' || f.type==='checkboxes' || f.type==='radios'){ if(f.name) keys.push(f.name); } else if (f.type==='review-panel' || f.type==='image'){ } } }); if(entry.framework==='repeatable_items'){ if(entry.editor==='dynamic-steps') keys.push('loopSteps'); if(entry.editor==='dynamic-features') keys.push('features'); if(entry.editor==='dynamic-team') keys.push('teamMembers'); if(entry.editor==='dynamic-milestones') keys.push('milestones'); } }); return keys; }
  function makeDefaultData(templateId){ return { templateId }; }
  function switchTemplate(id){ Wizard.data=loadTemplateData(id); if(!Wizard.data.exportTheme) Wizard.data.exportTheme='light'; Wizard.steps=stepsForActiveTemplate(); Wizard.step=0; buildStepsNavProgress(); render(); persist(); }

  function download(filename,text){ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([text],{type:'application/json'})); a.download=filename; a.click(); URL.revokeObjectURL(a.href); }

  // FS-aware export: save to remembered folder when available, else fall back
  async function exportJSON(){
    const t=getActiveTemplate();
    const ordered=computeKeysInWizardOrder(t);
    const prefs = preferenceKeysForTemplate(t);
    const dataOnly={};
    [...ordered, ...prefs].forEach(k=>{ if(k in Wizard.data) dataOnly[k]=Wizard.data[k]; });
    if (Wizard.data.metaImage) dataOnly.metaImage = Wizard.data.metaImage;
    const payload={ templateId:t.id||'basic', version:2, data:dataOnly };

    // Build nicer filename: Project_Title_template.json
    const rawTitle = (Wizard.data.project || 'Untitled').trim();
    const safeTitle = rawTitle.replace(/[^a-z0-9\-_.]+/gi, '_');
    const filename = `${safeTitle || 'Untitled'}_${t.id || 'basic'}.json`;

    const text=JSON.stringify(payload, null, 2);

    if (FS.supported()) {
      try{
        let dir = await FS.getRememberedDir();
        if (!dir) dir = await FS.pickAndRememberDir();
        await FS.saveTextInDir(dir, filename, text);
        i18nAlert('msg.savedToFolder','Saved to your chosen folder.');
        return;
      }catch(e){
        console.warn('FS export failed, falling back:', e);
        i18nAlert('err.fs.exportFailed','Could not save to the chosen folder; a download will start instead.');
        // fall through to classic download
      }
    }

    // Fallback: classic browser download
    download(filename, text);
  }

  function importJSON(obj){
    try{
      const t=getActiveTemplate();
      let payload=obj;
      if(payload && typeof payload==='object' && !('data' in payload)) payload={ templateId: payload.templateId||t.id, version:1, data: payload };
      const tid=String(payload.templateId||t.id||'basic');
      const baseT = (TemplateRegistry && TemplateRegistry[tid]) || t;
      const ordered=computeKeysInWizardOrder(baseT);
      const prefs = preferenceKeysForTemplate(baseT);
      const allowed=new Set([...ordered, ...prefs, 'metaImage']);
      const pruned={ templateId: tid };
      Object.keys(payload.data||{}).forEach(k=>{ if(allowed.has(k)) pruned[k]=payload.data[k]; });
      if ('metaImage' in (payload.data||{})) pruned.metaImage = payload.data.metaImage;
      Wizard.data=pruned;
      if(!Wizard.data.exportTheme) Wizard.data.exportTheme='light';
      persist();
      Wizard.steps=stepsForActiveTemplate();
      Wizard.step=0;
      render();
      i18nAlert('msg.imported','Imported your JSON data.');
    }catch(e){ i18nAlert('err.json.invalid','Invalid JSON.'); }
  }
  function downscaleImage(file,maxW,maxH){ return new Promise((resolve,reject)=>{ const img=new Image(); const fr=new FileReader(); fr.onload=()=>{ img.onload=()=>{ try{ const ratio=Math.min(maxW/img.width, maxH/img.height, 1); const w=Math.round(img.width*ratio); const h=Math.round(img.height*ratio); const c=document.createElement('canvas'); c.width=w; c.height=h; const ctx=c.getContext('2d'); ctx.imageSmoothingQuality='high'; ctx.drawImage(img,0,0,w,h); resolve(c.toDataURL('image/png', 0.95)); }catch(err){ reject(err); } }; img.onerror=()=>reject(new Error('err.image.load')); img.src=fr.result; }; fr.onerror=()=>reject(new Error('err.file.read')); fr.readAsDataURL(file); }); }
  function attachEvents(){ prevBtn.onclick=()=>{ if(Wizard.step>0) go(Wizard.step-1); }; nextBtn.onclick=()=>{ if(Wizard.step<Wizard.steps.length-1) go(Wizard.step+1); else doPrint(); }; btnExportJSON.onclick=exportJSON; 

    // Prefer FS API to open starting in the remembered folder; fallback to <input>
    btnImportJSON.onclick = async () => {
      if (FS.supported()) {
        try{
          const dir = await FS.getRememberedDir();
          const text = await FS.openFromDir(dir, {
            types: [{ description:'GDD Wizard JSON', accept: { 'application/json': ['.json'] } }]
          });
          if (text != null) {
            try { importJSON(JSON.parse(text)); }
            catch (err) { i18nAlert('err.json.invalid','Invalid JSON.'); }
            return;
          }
        }catch(e){
          console.warn('FS import failed, falling back:', e);
          i18nAlert('err.fs.importFailed','Could not open from the chosen folder; pick a file manually.');
        }
      }
      importJSONInput.click();
    };

    importJSONInput.onchange=e=>{ const f=e.target.files&&e.target.files[0]; if(!f) return; const fr=new FileReader(); fr.onload=()=>{ try{ const obj=JSON.parse(String(fr.result||'{}')); importJSON(obj); }catch(err){ i18nAlert('err.json.invalid','Invalid JSON.'); } }; fr.readAsText(f); };

    btnReset.onclick=()=>{ if(i18nConfirm('confirm.reset','Reset current template data?')){ Wizard.data=makeDefaultData(Wizard.data.templateId||'basic'); if(!Wizard.data.exportTheme) Wizard.data.exportTheme='light'; persist(); render(); i18nAlert('msg.reset','Template data reset.'); } };
    btnPrintHeader.onclick=doPrint;
    document.addEventListener('i18n:changed', () => { render(); });
  }
  function init(){ migrateLegacyIfNeeded(); Wizard.steps=stepsForActiveTemplate(); Wizard.data=loadTemplateData(Wizard.data.templateId); if(!Wizard.data.exportTheme) Wizard.data.exportTheme='light'; attachEvents(); render(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
