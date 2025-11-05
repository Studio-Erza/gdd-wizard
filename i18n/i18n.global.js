// i18n/i18n.js
(function(){
  'use strict';

  // --- tiny markdown (for data-i18n innerHTML) ---
  function mdToHTML(s){
    const x = String(s||'');
    return x
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,'<em>$1</em>');
  }

  const I18N = {
    dicts: {},          // key -> { en:'...', es:'...' }
    names: {},          // lang -> display name (packs register themselves)
    lang: 'en',
    _observer: null,

    // --- APIs used by packs ---
    registerLanguage(code, display){ this.names[code] = display || code; },
    addDict(code, flatDict){
      if (!code || typeof flatDict !== 'object') return;
      Object.keys(flatDict).forEach(k=>{
        this.dicts[k] = this.dicts[k] || {};
        this.dicts[k][code] = flatDict[k];
      });
    },

    // --- core translate API ---
    t(key, fallback){
      if (key === 'app.title') return 'GDD Wizard'; // brand lock
      const row = this.dicts[key];
      return (row && row[this.lang] != null) ? row[this.lang]
           : (fallback != null ? String(fallback) : key);
    },
    setLanguage(code){
      if (!this.names[code]) code = 'en';
      this.lang = code;
      try{ localStorage.setItem('gddw.lang', code); }catch(e){}
      this.apply(document);
      document.dispatchEvent(new CustomEvent('i18n:changed', { detail:{ lang: code }}));
    },

    apply(scope){
      if (this._observer) this._observer.disconnect();
      this._translate(scope || document);
      if (this._observer) this._observer.observe(document.body, {
        childList:true, subtree:true, characterData:true, attributes:true,
        attributeFilter:['placeholder','title','alt','data-i18n','aria-label']
      });
    },
    _translate(root){
      const base = (root && root.nodeType===1) ? root : document.body;
      const isKey = (k)=> !!k && (k in this.dicts || k==='app.title');

      // [data-i18n] → rich innerHTML
      base.querySelectorAll('[data-i18n]').forEach(el=>{
        const k = el.getAttribute('data-i18n');
        if (isKey(k)) el.innerHTML = mdToHTML(this.t(k));
      });

      // attributes & placeholders → plain text
      ['placeholder','title','alt','aria-label'].forEach(attr=>{
        base.querySelectorAll('['+attr+']').forEach(el=>{
          const k = el.getAttribute(attr);
          if (isKey(k)) el.setAttribute(attr, this.t(k));
        });
      });

      // bare text keys (only if element has no child elements)
      (function walk(node, api){
        node.childNodes && node.childNodes.forEach(ch=>{
          if (ch.nodeType === 3){
            const raw = (ch.nodeValue||'').trim();
            if (raw && (raw in api.dicts || raw==='app.title')){
              const p = ch.parentNode;
              if (p && p.children && p.children.length === 0){
                p.innerHTML = mdToHTML(api.t(raw));
              } else ch.nodeValue = api.t(raw);
            }
          } else if (ch.nodeType === 1) walk(ch, api);
        });
      })(base, this);

      // keep <title> branded
      const tEl = document.querySelector('title');
      if (tEl) tEl.textContent = 'GDD Wizard';
    },

    observe(){
      if (this._observer) this._observer.disconnect();
      this._observer = new MutationObserver(muts=>{
        for (const m of muts){
          const tgt = (m.target && m.target.nodeType===1) ? m.target : (m.target && m.target.parentNode) || document.body;
          this.apply(tgt);
        }
      });
      this._observer.observe(document.body, { childList:true, subtree:true });
    },

    bindLanguageSelector(){
      const sel = document.getElementById('langSelect');
      if (!sel) return;
      sel.innerHTML = '';
      Object.keys(this.names).forEach(code=>{
        const opt = document.createElement('option');
        opt.value = code;
        opt.textContent = this.names[code] || code;
        if (code === this.lang) opt.selected = true;
        sel.appendChild(opt);
      });
      sel.onchange = ()=> this.setLanguage(sel.value);
      this.apply(document);
    },

    // --- loader (simple to add more packs; works on file://) ---
    loadPacks(codes, basePath='./i18n/'){
      return Promise.all(codes.map(code => new Promise((resolve)=>{
        const s = document.createElement('script');
        s.src = basePath + 'i18n.' + code + '.js';
        s.async = true;
        s.onload = resolve;
        s.onerror = resolve; // non-blocking
        document.head.appendChild(s);
      })));
    }
  };

  window.I18N = I18N;

  function boot(){
    // restore saved or ?lang=xx
    try{
      const saved = localStorage.getItem('gddw.lang'); if (saved) I18N.lang = saved;
      const q = new URLSearchParams(location.search).get('lang'); if (q) I18N.lang = q;
    }catch(e){}

    // packs to load by default — add 'fr', etc. here later
    const PACKS = ['en','es','fr','pt','de','cs'];

    I18N.loadPacks(PACKS).then(()=>{
      I18N.apply(document);
      I18N.observe();
      I18N.bindLanguageSelector();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();

