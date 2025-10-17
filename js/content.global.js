// content.global.js — GLOBAL templates, frameworks, exporters, helpers
// NOTE: Self-contained and engine-compatible. Exposes window.GDDWContent.
(function(){
  'use strict';

  // ---------- Constants ----------
  const LABEL_LIMIT = 120; // legacy cap for some inputs (kept for compatibility)
  const DIAGRAM_SCALES = [0.75, 1, 1.25, 1.5];
  const DEFAULT_DIAGRAM_SCALE = 1.0;
  const DEFAULT_IMG_MM = 24, MIN_IMG_MM = 12, MAX_IMG_MM = 48, STEP_IMG_MM = 2;
  const DIAGRAM_LINE_LIMIT = 15; // per-line wrap width for core-loop labels

  // Optional footer logo (URL preferred; base64 as fallback)
  const FOOTER_LOGO_URL   = (typeof window.FOOTER_LOGO_URL === 'string') ? window.FOOTER_LOGO_URL : './assets/Erza_Logo_Black.png';
  const FOOTER_LOGO_BASE64 = (typeof window.FOOTER_LOGO_BASE64 === 'string') ? window.FOOTER_LOGO_BASE64 : '';

  // ---------- Small helpers ----------
  function todayISO(){ return new Date().toISOString().slice(0,10); }

  function escapeHtml(s){
    return String(s||'').replace(/[&<>"']/g, c => ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
    }[c]));
  }
  function escapeHtmlAttr(s){
    return String(s||'').replace(/["'&<>]/g, c => ({
      '"':'&quot;', "'":'&#39;', '&':'&amp;', '<':'&lt;', '>':'&gt;'
    }[c]));
  }

  function sectionHTML(title, inner, cls=''){ return `<section class="${cls}"><h2>${escapeHtml(title)}</h2>${inner}</section>`; }

  function isExporting(){ return !!window.__GDDW_EXPORTING__; }
  function renderFooter(){
    let src = '';
    if (isExporting() && FOOTER_LOGO_BASE64) src = `data:image/png;base64,${FOOTER_LOGO_BASE64}`;
    else if (FOOTER_LOGO_URL) src = FOOTER_LOGO_URL;
    else if (FOOTER_LOGO_BASE64) src = `data:image/png;base64,${FOOTER_LOGO_BASE64}`;
    const logo = src ? `<img class="doc-footer-logo" alt="alt.footerLogo" src="${src}">` : '';
    return `<div class="gdd-footer">${logo}<span>export.footer.madeWith</span></div>`;
  }

  // ---------- Field factory helpers ----------
  function f(name, label, type='text', placeholder='', value=''){ return { type:'input', name, label, inputType:type, placeholder, value }; }
  function t(name, label, placeholder=''){ return { type:'textarea', name, label, placeholder }; }
  function ck(name, label, options=[]){ return { type:'checkboxes', name, label, options }; }

  // ---------- i18n-friendly paragraph helper ----------
  function P3Key(titleKey, value){ return `<h3>${escapeHtml(titleKey)}</h3><p>${escapeHtml(value||'')}</p>`; }

  // ---------- Exporters (renderers for preview/print) ----------
  function renderSummary(d){
    const out = [];
    if (d.genre)        out.push(P3Key('export.genre', d.genre));
    if (d.coreFantasy)  out.push(P3Key('export.coreFantasy', d.coreFantasy));
    if (d.toneStyle)    out.push(P3Key('export.toneStyle', d.toneStyle));
    if (d.narrative)    out.push(P3Key('export.narrative', d.narrative));
    if (d.inspirations) out.push(P3Key('export.inspirations', d.inspirations));
    return out.join('') || '<p>—</p>';
  }

  // NEW: Marketing exporter (replaces Audience/Goals)
  function renderMarketing(d){
    const P = (k, v) => `<h3>${escapeHtml(k)}</h3><p>${escapeHtml(v||'')}</p>`;
    const primary = String(d.primaryAudience||'').trim();
    const secondary = String(d.secondaryAudience||'').trim();
    const audienceBlock = (primary || secondary)
      ? [
          primary ? `<p><strong class="label">export.primaryAudience</strong> ${escapeHtml(primary)}</p>` : '',
          secondary ? `<p><strong class="label">export.secondaryAudience</strong> ${escapeHtml(secondary)}</p>` : ''
        ].join('')
      : '<p>—</p>';
    return [
      P('export.hook', d.hook),
      P('export.platforms', d.platforms),
      `<h3>export.targetAudience</h3>${audienceBlock}`,
      P('export.strategy', d.strategy)
    ].join('');
  }

  function renderCoreLoop(d, rules={}){
    const steps = Array.isArray(d.loopSteps) ? d.loopSteps.map(s=>String(s||'').trim()).filter(Boolean) : [];
    const showDiagram = rules.showDiagram !== false;
    const ratio = (typeof d.diagramScale==='number' && isFinite(d.diagramScale)) ? d.diagramScale : DEFAULT_DIAGRAM_SCALE;
    const clamped = Math.min(1.5, Math.max(0.5, ratio));
    const scalePct = Math.round(clamped * 100);
    const theme = d.exportTheme==='dark' ? 'dark' : 'light';
    const wrapPerLine = (typeof rules.labelMax === 'number' && isFinite(rules.labelMax)) ? rules.labelMax : DIAGRAM_LINE_LIMIT;
    const svg = showDiagram ? svgForCoreLoop(steps, { lineMax: wrapPerLine }, theme) : '';
    const overview = `<h3>export.loopOverview</h3><p>${escapeHtml(loopOverviewAuto(d))}</p>`;
    const example = d.exampleSession ? `<h3>export.exampleSession</h3><p>${escapeHtml(d.exampleSession)}</p>` : '';
    const diagram = `<div class="loop-flex-spacer"></div><div class="loop-diagram"><div class="loop-diagram-inner" style="--loop-scale-pct:${scalePct}%">${svg}</div></div>`;
    return `${overview}${example}${diagram}`;
  }

  function renderFeatures(d){
    const feats = Array.isArray(d.features) ? d.features : [];
    if (!feats.length) return '<p>—</p>';
    return feats.map(f => {
      const title = escapeHtml(f.title||'export.untitledFeature');
      const purpose = String(f.purpose||'').trim();
      const impact = String(f.impact||'').trim();
      const rows = [];
      if (purpose) rows.push(`<p><strong class="label">export.purpose</strong> ${escapeHtml(purpose)}</p>`);
      if (impact)  rows.push(`<p><strong class="label">export.playerImpact</strong> ${escapeHtml(impact)}</p>`);
      return `<div class="feature-block"><h3>${title}</h3>${rows.join('')}</div>`;
    }).join('');
  }

  function renderProgress(d){
    return P3Key('export.playerProgression', d.playerProgression)
         + P3Key('export.rewards', d.rewards)
         + P3Key('export.pacing', d.pacing);
  }
  function renderChoices(d){
    return P3Key('export.meaningfulChoices', d.meaningfulChoices)
         + P3Key('export.consequences', d.consequences);
  }
  function renderControls(d){
    return P3Key('export.inputs', d.controlsInputs)
         + P3Key('export.uxNotes', d.uxNotes);
  }
  function renderMilestones(d){
    const arr = (Array.isArray(d.milestones)?d.milestones:[]).map(x=>({ date:String(x?.date||''), notes:String(x?.notes||'') }));
    if(!arr.length) return '<p>—</p>';
    return arr.map(it=>{
      const title = formatMonthDay(it.date)||'export.milestone';
      return `<h3>${escapeHtml(title)}</h3><p>${escapeHtml(it.notes||'')}</p>`;
    }).join('');
  }
  function renderTeamJam(d){
    const list = Array.isArray(d.teamMembers) ? d.teamMembers : [];
    const items = list.filter(x => String(x?.member||'').trim() || String(x?.role||'').trim());
    if (items.length === 0){
      const fb = String(d.team||'').trim();
      if (fb) return `<p>${escapeHtml(fb)}</p>`;
      return '<p>—</p>';
    }
    const parts = items.map(it=>{
      const r=String(it.role||'').trim();
      const m=String(it.member||'').trim();
      return (r && m) ? `${r} - ${m}` : (r || m || '—');
    });
    return `<p class="team-line">${escapeHtml(parts.join(' | '))}</p>`;
  }
  function renderAssets(d){
    return P3Key('export.engineVersion', d.engineVersion)
         + P3Key('export.pluginsTools', d.pluginsTools)
         + P3Key('export.assetSources', d.assetSources);
  }

  // ---------- Date helpers ----------
  function getLang(){
    try {
      if (window.I18N && typeof window.I18N.lang === 'string') return window.I18N.lang;
      const saved = localStorage.getItem('gddw.lang');
      if (saved) return saved;
    } catch(e){}
    return 'en';
  }
  function formatMonthDay(dateStr, lang){
    if(!dateStr) return '';
    let d;
    if (dateStr instanceof Date) d = dateStr;
    else if (typeof dateStr === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) d = new Date(dateStr + 'T00:00:00');
    else d = new Date(dateStr);
    if(isNaN(d)) return '';
    const ln = lang || getLang();
    return new Intl.DateTimeFormat(ln, { month:'long', day:'numeric' }).format(d);
  }

  // ---------- Core loop SVG ----------
  function wrapLabel(text, max){
    const LIMIT = (typeof max==='number' ? max : DIAGRAM_LINE_LIMIT);
    const tokens = String(text||'').trim().split(/\s+/).filter(Boolean);
    const lines = []; let line='';
    const push=()=>{ if(line.trim().length){ lines.push(line.trim()); line=''; } };
    for(const tok of tokens){
      if(tok.length>LIMIT){ push(); for(let i=0;i<tok.length;i+=LIMIT){ lines.push(tok.slice(i,i+LIMIT)); } continue; }
      const sep = line.length ? ' ' : '';
      if ((line+sep+tok).length>LIMIT){ push(); line=tok; } else { line = line+sep+tok; }
    }
    push(); return lines.slice(0,3); // limit to 3 lines per label
  }
  function markerDef(stroke, mkId){
    const mw=14,mh=14,refX=12.5,refY=7;
    return `<marker id="${mkId}" markerUnits="strokeWidth" markerWidth="${mw}" markerHeight="${mh}" refX="${refX}" refY="${refY}" orient="auto-start-reverse" viewBox="0 0 ${mw} ${mh}" overflow="visible"><path d="M1,1 Q7,6 1,13 L12,7 Z" fill="${stroke}"/></marker>`;
  }
  function arcPoint(cx,cy,r,ang){ return { x: cx + r*Math.cos(ang), y: cy + r*Math.sin(ang) }; }
  function svgForCoreLoop(steps, opts, theme){
    const n = Math.max(steps.length, 3);
    const W=2400, H=1600, cx=W/2, cy=H/2; const R=Math.min(W,H)/2-120; const arcR=R-60;
    const stroke = theme==='dark' ? '#9a9a9a' : '#444';
    const labelColor = theme==='dark' ? '#e8e8e8' : '#111';
    const gap = (2*Math.PI/n)*0.32; const fontSize=56; const strokeWidth=4.8; const lineH=fontSize*1.18;
    const mkId = 'triRound-' + Math.random().toString(36).slice(2);
    const wrapLimit = (opts && typeof opts.lineMax==='number' && isFinite(opts.lineMax)) ? opts.lineMax
                    : (opts && typeof opts.labelMax==='number' && isFinite(opts.labelMax)) ? opts.labelMax
                    : DIAGRAM_LINE_LIMIT;
    const labels = steps.map(s=>wrapLabel(s, wrapLimit));
    let out = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><defs>${markerDef(stroke, mkId)}</defs>`;
    const centers = labels.map((_,i)=>{ const ang=(i/n)*2*Math.PI - Math.PI/2; return { x:cx+R*Math.cos(ang), y:cy+R*Math.sin(ang), a:ang }; });
    centers.forEach((p,i)=>{ const q=centers[(i+1)%n]; const aStart=p.a+gap, aEnd=q.a-gap; const sPt=arcPoint(cx,cy,arcR,aStart); const ePt=arcPoint(cx,cy,arcR,aEnd); out+=`<path d=\"M ${sPt.x} ${sPt.y} A ${arcR} ${arcR} 0 0 1 ${ePt.x} ${ePt.y}\" stroke=\"${stroke}\" stroke-width=\"${strokeWidth}\" fill=\"none\" marker-end=\"url(#${mkId})\"/>`; });
    centers.forEach((p,i)=>{ const lines=labels[i]; const y0=p.y-(lines.length-1)*lineH/2+8; lines.forEach((ln,k)=>{ out+=`<text x=\"${p.x}\" y=\"${y0+k*lineH}\" text-anchor=\"middle\" fill=\"${labelColor}\" font-size=\"${fontSize}\" font-weight=\"700\">${escapeHtml(ln)}</text>`; }); });
    out+='</svg>'; return out;
  }
  function loopOverviewAuto(d){
    const steps = (Array.isArray(d.loopSteps)?d.loopSteps:[]).map(s=>String(s||'').trim()).filter(Boolean);
    const repeat = (window.I18N && typeof window.I18N.t === 'function') ? window.I18N.t('export.loopRepeat') : 'export.loopRepeat';
    if (steps.length === 0) return repeat; return steps.join(' → ') + ' → ' + repeat;
  }

  // ---------- Frameworks ----------
  const FrameworkRegistry = {
    cover: {
      title: (_rules={}, entry={}) => entry.title || 'section.projectDetails',
      step:  (rules={}, entry={}) => {
        if (Array.isArray(entry.fields) && entry.fields.length) return entry.fields;
        const arr = [ f('project','field.project','text','ph.basic.project') ];
        if (rules.mode === 'basic') arr.push(f('author','field.author','text','ph.basic.author'));
        if (rules.mode === 'jam')   arr.push(f('theme','field.theme','text','ph.jam.theme'));
        arr.push(f('date','field.date','date','', todayISO()));
        if (rules.showImage) arr.push({ type:'image', name:'metaImage', label:'field.coverImage' });
        return arr;
      },
      export: (d, entry) => {
        const kind = entry?.rules?.mode === 'jam' ? 'jam' : 'basic';
        const esc = x=>escapeHtml(x||''); const escAttr = escapeHtmlAttr;
        const mm = (typeof d.metaImageMM==='number' && isFinite(d.metaImageMM)) ? d.metaImageMM : DEFAULT_IMG_MM;
        const invertStyle = d.coverInvert ? 'filter: invert(1) hue-rotate(180deg);' : '';
        const metaImg = (kind==='basic' && d.metaImage)
          ? `<div class="metaImage${d.coverInvert?' invert':''}"><img src="${escAttr(d.metaImage)}" alt="alt.projectImage" style="max-width:${mm}mm;max-height:${mm}mm;${invertStyle}"/></div>`
          : '';
        let metaLines='';
        if (kind==='basic'){
          metaLines = `<p><strong>export.label.author</strong> <span>${esc(d.author||'—')}</span></p><p><strong>export.label.date</strong> <span>${esc(d.date||'')}</span></p>`;
        } else {
          metaLines = `<p><strong>export.label.theme</strong> <span>${esc(d.theme||'—')}</span></p><p><strong>export.label.date</strong> <span>${esc(d.date||'')}</span></p>`;
        }
        return `<div class="cover"><div class="coverRow"><div class="metaBlock"><h1>${esc(d.project||'export.default.projectTitle')}</h1><div class="meta">${metaLines}</div></div>${metaImg}</div></div>`;
      }
    },
    form_section: {
      title: (_rules, entry) => entry.title || 'section.section',
      step:  (_rules, entry) => entry.fields || [],
      export: (d, entry) => entry.exporter ? (Exporters[entry.exporter]?.(d, entry.rules) || '') : ''
    },
    repeatable_items: {
      title: (_rules, entry) => entry.title || 'section.items',
      step:  (_rules, entry) => {
        const arr = [{ type: entry.editor || 'dynamic-features', placeholders: entry.placeholders || entry.rules?.placeholders || {} }];
        if (Array.isArray(entry.extraFields) && entry.extraFields.length) arr.push(...entry.extraFields);
        return arr;
      },
      export: (d, entry) => entry.exporter ? (Exporters[entry.exporter]?.(d, entry.rules) || '') : ''
    },
    grouped_notes: {
      title: (_rules, entry) => entry.title || 'section.groupedNotes',
      step:  (_rules, entry) => (entry.groups || []).map(g => t(g.key, g.title, g.placeholder || '')),
      export: (d, entry) => {
        const groups = entry.groups || [];
        if (!groups.length) return '<p>—</p>';
        return groups.map(g => `<div class="feature-block"><h3>${escapeHtml(g.title)}</h3><p>${escapeHtml(d[g.key]||'')}</p></div>`).join('');
      }
    },
    review_export: {
      title: (_r, e) => e.title || 'section.reviewExport',
      step:  (_r, e) => [{ type:'review-panel', variant: e.variant || 'basic' }],
      export: () => ''
    }
  };

  // ---------- Dynamic editor placeholders (controls UI copy) ----------
  const DYNAMIC_STEP_PLACEHOLDERS = { label: 'ph.loop.label', description: 'ph.loop.description' };
  const DYNAMIC_FEATURES_PLACEHOLDERS = { title:'ph.features.title', purpose:'ph.features.purpose', details:'ph.features.details' };
  const DYNAMIC_MILESTONES_PLACEHOLDERS = { date:'ph.milestones.date', notes:'ph.milestones.notes' };
  const DYNAMIC_TEAM_PLACEHOLDERS = { role:'ph.team.role', member:'ph.team.member' };

  // ---------- Templates ----------
  const TemplateRegistry = {
    basic: {
      id:'basic', label:'tpl.basic.label',
      sections:[
        { id:'cover', framework:'cover', rules:{ mode:'basic', showImage:true }, fields:[
          f('project','field.project','text','ph.basic.project'),
          f('author','field.author','text','ph.basic.author'),
          f('date','field.date','date','', todayISO()),
          { type:'image', name:'metaImage', label:'field.coverImage' }
        ]},
        { id:'summary', framework:'form_section', title:'section.gameSummary', exporter:'summary', fields:[
          t('genre','field.genre','ph.basic.genre'),
          t('coreFantasy','field.coreFantasy','ph.basic.coreFantasy'),
          t('toneStyle','field.toneStyle','ph.basic.toneStyle'),
          t('narrative','field.narrative','ph.basic.narrative'),
          t('inspirations','field.inspirations','ph.basic.inspirations')
        ]},
        // === NEW: Marketing (Basic only) ===
        { id:'marketing', framework:'form_section', title:'section.marketing', exporter:'marketing', fields:[
          t('hook','field.hook','ph.hook'),
          t('platforms','field.platforms','ph.platforms'),
          t('primaryAudience','field.primaryAudience','ph.primaryAudience'),
          t('secondaryAudience','field.secondaryAudience','ph.secondaryAudience'),
          t('strategy','field.strategy','ph.strategy')
        ]},
        { id:'core_loop', framework:'repeatable_items', title:'section.coreLoop', editor:'dynamic-steps', exporter:'core_loop',
          rules:{ labelMax: DIAGRAM_LINE_LIMIT, showNumbers:true, showDiagram:true, minItems:3, maxItems:12 },
          placeholders: DYNAMIC_STEP_PLACEHOLDERS,
          extraFields:[ t('exampleSession','field.exampleSession','ph.basic.exampleSession') ]
        },
        { id:'features', framework:'repeatable_items', title:'section.keyFeatures', editor:'dynamic-features', exporter:'features',
          placeholders: DYNAMIC_FEATURES_PLACEHOLDERS
        },
        { id:'progress', framework:'form_section', title:'section.progressionRewards', exporter:'progress', fields:[
          t('playerProgression','field.playerProgression','ph.basic.playerProgression'),
          t('rewards','field.rewards','ph.basic.rewards'),
          t('pacing','field.pacing','ph.basic.pacing')
        ]},
        { id:'choices', framework:'form_section', title:'section.playerChoices', exporter:'choices', fields:[
          t('meaningfulChoices','field.meaningfulChoices','ph.basic.meaningfulChoices'),
          t('consequences','field.consequences','ph.basic.consequences')
        ]},
        { id:'scope', framework:'grouped_notes', title:'section.scopePlanning', groups:[
          { title:'section.scope.must',   key:'mustHave',    placeholder:'ph.basic.mustHave' },
          { title:'section.scope.nice',   key:'niceToHave',  placeholder:'ph.basic.niceToHave' },
          { title:'section.scope.future', key:'futureIdeas', placeholder:'ph.basic.futureIdeas' }
        ]},
        { id:'review', framework:'review_export', title:'section.reviewExport', variant:'basic' }
      ]
    },
    jam: {
      id:'jam', label:'tpl.jam.label',
      sections:[
        { id:'cover', framework:'cover', rules:{ mode:'jam', showImage:false }, fields:[
          f('project','field.project','text','ph.jam.project'),
          f('theme','field.theme','text','ph.jam.theme'),
          f('date','field.date','date','', todayISO())
        ]},
        { id:'summary', framework:'form_section', title:'section.gameSummary', exporter:'summary', fields:[
          t('genre','field.genre','ph.jam.genre'),
          t('coreFantasy','field.coreFantasy','ph.jam.coreFantasy'),
          t('toneStyle','field.toneStyle','ph.jam.toneStyle')
        ]},
        { id:'core_loop', framework:'repeatable_items', title:'section.coreLoop', editor:'dynamic-steps', exporter:'core_loop',
          rules:{ labelMax: DIAGRAM_LINE_LIMIT, showNumbers:true, showDiagram:true, minItems:3, maxItems:12 },
          placeholders: DYNAMIC_STEP_PLACEHOLDERS,
          extraFields:[ t('exampleSession','field.exampleSession','ph.jam.exampleSession') ]
        },
        { id:'scope', framework:'grouped_notes', title:'section.scopePlanning', groups:[
          { title:'section.scope.must',    key:'scopeMust',    placeholder:'ph.jam.scopeMust' },
          { title:'section.scope.nice',    key:'scopeNice',    placeholder:'ph.jam.scopeNice' },
          { title:'section.scope.stretch', key:'scopeStretch', placeholder:'ph.jam.scopeStretch' }
        ]},
        { id:'controls', framework:'form_section', title:'section.controlsUX', exporter:'controls', fields:[
          t('controlsInputs','field.inputs','ph.jam.controlsInputs'),
          t('uxNotes','field.uxNotes','ph.jam.uxNotes')
        ]},
        { id:'milestones', framework:'repeatable_items', title:'section.milestones', editor:'dynamic-milestones', exporter:'milestones',
          placeholders: DYNAMIC_MILESTONES_PLACEHOLDERS
        },
		{ id:'team', framework:'repeatable_items', title:'section.teamRoles', editor:'dynamic-team', exporter:'team_jam',
		  placeholders: DYNAMIC_TEAM_PLACEHOLDERS },
		{ id:'assets', framework:'form_section', title:'section.assetsTools', exporter:'assets', fields:[
		  t('engineVersion','field.engineVersion','ph.jam.engineVersion'),
          t('pluginsTools','field.pluginsTools','ph.jam.pluginsTools'),
          t('assetSources','field.assetSources','ph.jam.assetSources')
		]},
        // Restored: Jam Review & Export step (UI only)
        { id:'review', framework:'review_export', title:'section.reviewExport', variant:'jam' }
      ],
      // team + assets intentionally appear after milestones in editor but are exported first
      exportSections: ['cover','team','assets','summary','core_loop','scope','controls','milestones']
    }
  };

  // ---------- Exporter registry ----------
  const Exporters = {
    summary:   (d, rules) => renderSummary(d, rules),
    marketing: (d, rules) => renderMarketing(d, rules),
    core_loop: (d, rules) => renderCoreLoop(d, rules),
    features:  (d, rules) => renderFeatures(d, rules),
    progress:  (d, rules) => renderProgress(d, rules),
    choices:   (d, rules) => renderChoices(d, rules),
    controls:  (d, rules) => renderControls(d, rules),
    milestones:(d, rules) => renderMilestones(d, rules),
    team_jam:  (d, rules) => renderTeamJam(d, rules),
    assets:    (d, rules) => renderAssets(d, rules)
  };

  // ---------- Export ordering helper (engine relies on this) ----------
  function resolveExportOrder(t){
    const ex = t && t.exportSections;
    if (!ex || !ex.length) return t.sections || [];
    if (typeof ex[0] === 'string'){
      const byId = new Map((t.sections || []).map(s => [s.id, s]));
      return ex.map(id => byId.get(id)).filter(Boolean);
    }
    return ex;
  }

  // ---------- Expose for engine ----------
  window.GDDWContent = {
    LABEL_LIMIT, DIAGRAM_SCALES, DEFAULT_DIAGRAM_SCALE,
    DEFAULT_IMG_MM, MIN_IMG_MM, MAX_IMG_MM, STEP_IMG_MM,
    todayISO, escapeHtml, escapeHtmlAttr,
    FrameworkRegistry, Exporters, TemplateRegistry,
    sectionHTML, renderFooter,
    resolveExportOrder,
    DIAGRAM_LINE_LIMIT
  };
})();
