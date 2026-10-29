/* ============================================================
 * color-app.js —— 页面入口
 * ============================================================ */
(function () {
  'use strict';

  function tt(key, vars, fallback) {
    if (window.CO_I18N && typeof window.CO_I18N.t === 'function') {
      var v = window.CO_I18N.t(key, vars);
      if (v != null && v !== key) return v;
    }
    return fallback != null ? fallback : key;
  }

  function debounce(func, delay) {
    var timer;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        func.apply(context, args);
      }, delay);
    };
  }

  if (!window.CO_Color || !window.CO_Util) {
    var coreErr = document.createElement('div');
    coreErr.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#ff3b30;color:#fff;padding:14px 28px;border-radius:8px;font-weight:bold;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.3);font-family:sans-serif;font-size:15px;';
    coreErr.textContent = tt('toastFatalCore', null, '⚠️ 致命错误：color-math.js 或 color-util.js 缺失，色彩工具无法运行！');
    document.body.appendChild(coreErr);
    return;
  }

  var C = window.CO_Color, U = window.CO_Util;
  var $ = U.$;
  var R = window.CO_Render;
  var hexToRgb = C.hexToRgb, rgbToHex = C.rgbToHex;

  var rootCSS = getComputedStyle(document.documentElement);
  var NM_BG = (rootCSS.getPropertyValue('--nm-bg') || '#e0e5ec').trim();
  var NM_DARK = (rootCSS.getPropertyValue('--nm-dark') || '#b8bcc2').trim();
  var SYSTEM_ACCENT = (rootCSS.getPropertyValue('--nm-accent') || '#6D5DFC').trim();

  function injectFailsafeCSS() {
    if (document.getElementById('color-mod-failed-style')) return;
    var style = document.createElement('style');
    style.id = 'color-mod-failed-style';
    style.textContent = `
      .color-mod-failed { border: 2px solid #ff3b30 !important; box-shadow: 0 0 15px rgba(255, 59, 48, 0.3) !important; position: relative !important; }
      .color-mod-failed::before { content: attr(data-missing); position: absolute; top: 0; right: 0; background: #ff3b30; color: #fff; font-size: 12px; padding: 4px 10px; border-bottom-left-radius: 8px; font-weight: bold; z-index: 9999; pointer-events: none; font-family: sans-serif; }
    `;
    document.head.appendChild(style);
  }

  function checkMissingModules() {
    var map = [
      { mod: window.CO_Names,    name: 'color-names.js',    target: '#s-gen, #results' },
      { mod: window.CO_Harmony,  name: 'color-harmony.js',  target: '#s-gen' },
      { mod: window.CO_Filter,   name: 'color-filter.js',   target: '#s-gen' },
      { mod: window.CO_Generator,name: 'color-generator.js',target: '#s-gen' },
      { mod: window.CO_Extract,  name: 'color-extract.js',  target: '#s-extract' },
      { mod: window.CO_Swatch,   name: 'color-swatch.js',   target: '#results' },
      { mod: window.CO_Canvas,   name: 'color-canvas.js',   target: '#s-extract' },
      { mod: window.CO_Gradient, name: 'color-gradient.js', target: '#s-grad' },
      { mod: window.CO_Export,   name: 'color-export.js',   target: '#s-grad' },
      { mod: window.CO_Render,   name: 'color-render.js',   target: '#results, #s-gen' },
      { mod: window.WebPalette,  name: 'web-palette.js',    target: '#s-web' }
    ];

    map.forEach(function(item) {
      if (!item.mod) {
        item.target.split(',').forEach(function(sel) {
          sel = sel.trim();
          var el = document.querySelector(sel);
          if (!el) return;
          var card = el.querySelector('.card') || el.querySelector('.co-stage__upload') || el;
          var missingText = tt('toastMissingMod', { name: item.name }, '⚠️ 缺少 ' + item.name);
          if (card.classList.contains('color-mod-failed')) {
            var currentText = card.getAttribute('data-missing') || '';
            if (currentText.indexOf(item.name) === -1) card.setAttribute('data-missing', currentText + ' & ' + item.name);
          } else {
            card.classList.add('color-mod-failed');
            card.setAttribute('data-missing', missingText);
          }
        });
      }
    });
  }

  var state = {
    hasImage: false, extracted: null, derived: null, baseImageColors: [],
    genColors: [], genNames: [], ruleColors: [], ruleNames: [],
    mainRgb: hexToRgb(SYSTEM_ACCENT.length === 7 ? SYSTEM_ACCENT : '#6D5DFC'),
    wheelConfig: { bg: NM_BG, stroke: true, strokeColor: NM_DARK },
    hexConfig: { bg: NM_BG, stroke: true, strokeColor: NM_DARK },
    gradientStops: [], 
    ruleGradientStops: []
  };
  window.__co_state = state;

  var cvsW, ctxW, cvsH, ctxH;
  var grad, exporter;

  if (window.CO_Gradient && window.CO_Export) {
    grad = window.CO_Gradient.create({
      getStops: function () { return state.gradientStops; },
      setStops: function (arr) { state.gradientStops = arr; },
      getRuleStops: function () { return state.ruleGradientStops; },
      onMainFromStops: function (hex) {
        if (rgbToHex(state.mainRgb).toUpperCase() === hex.toUpperCase()) return;
        state.mainRgb = hexToRgb(hex);
        if ($('ci')) $('ci').value = hex.toLowerCase();
        if ($('ti')) $('ti').value = hex;
        state.hasImage = false;
        runGenerator(true);
      }
    });

    exporter = window.CO_Export.create({
      getState: function () { return state; },
      getGradient: function () { return grad; },
      getColorSet: function () { return state.hasImage ? state.extracted : state.derived; },
      toast: U.toast
    });
  }

  function getPalette() {
    if (!window.CO_Names) return null;
    var libChecked = document.querySelector('input[name="lib"]:checked');
    var lib = libChecked ? libChecked.value : 'none';
    if (lib === 'cn') return window.CO_Names.CN_PALETTE;
    if (lib === 'morandi') return window.CO_Names.MORANDI_PALETTE;
    if (lib === 'jp') return window.CO_Names.JP_PALETTE;
    if (lib === 'cyber') return window.CO_Names.CYBER_PALETTE;
    return null;
  }

  function deriveFromPalette(colors) {
    if (!colors || !colors.length) return null;
    var counts = [200, 140, 100, 70, 50], out = [];
    colors.forEach(function (c, i) {
      var o = C.rgbToOklch(c), base = counts[i] || 30;
      [
        { L: C.clamp(o.L, 0.1, 0.95),        C: C.clamp(o.C, 0, 0.37),          k: 1 },
        { L: C.clamp(o.L + 0.16, 0.1, 0.95), C: C.clamp(o.C * 0.7, 0.02, 0.37), k: 0.55 },
        { L: C.clamp(o.L - 0.16, 0.1, 0.95), C: C.clamp(o.C * 0.8, 0.02, 0.37), k: 0.4 }
      ].forEach(function (v) {
        var rgb = C.oklchToRgb({ L: v.L, C: v.C, h: o.h });
        var hsl = C.rgbToHsl(rgb.r, rgb.g, rgb.b);
        out.push({
          r: rgb.r, g: rgb.g, b: rgb.b, hex: rgbToHex(rgb),
          count: Math.max(1, Math.round(base * v.k)),
          h: hsl.h / 360, s: hsl.s / 100, l: hsl.l / 100
        });
      });
    });
    var map = new Map();
    out.forEach(function (c) {
      if (map.has(c.hex)) map.get(c.hex).count += c.count;
      else map.set(c.hex, c);
    });
    var display = Array.from(map.values()).sort(function (a, b) { return b.count - a.count; });
    return { colors: display, total: display.reduce(function (s, c) { return s + c.count; }, 0) };
  }

  function syncPrimaryButtons() {
    var bgHex = rgbToHex(state.mainRgb);
    var textHex = C.textOn(state.mainRgb);

    var mainColorName = document.getElementById('mainColorName');
    if (mainColorName) {
      var palette = getPalette() || window.CO_Names.CN_PALETTE;
      var match = window.CO_Filter.matchColorInPalette(state.mainRgb, palette, null);
      mainColorName.textContent = match.name;
    }

    if ($('ci')) $('ci').value = bgHex.toLowerCase();
    if ($('ti')) $('ti').value = bgHex.toUpperCase();

    var btns = document.querySelectorAll('.btn-primary, #uploadCta, .co-btn-random');
    for (var i = 0; i < btns.length; i++) {
      if (btns[i].dataset.action === 'copy-rule-css' || btns[i].dataset.action === 'copy-rule-gradient') continue;
      btns[i].style.backgroundColor = bgHex;
      btns[i].style.color = textHex;
    }

    if (state.ruleColors && state.ruleColors.length) {
      var ruleHex = rgbToHex(state.ruleColors[0]);
      var ruleText = C.textOn(state.ruleColors[0]);
      var ruleBtns = document.querySelectorAll('[data-action="copy-rule-css"], [data-action="copy-rule-gradient"]');
      for (var j = 0; j < ruleBtns.length; j++) {
        ruleBtns[j].style.backgroundColor = ruleHex;
        ruleBtns[j].style.color = ruleText;
      }
    }

    var gAngle = $('g-angle');
    var gSmooth = $('g-smooth');
    if (gAngle) {
      gAngle.style.accentColor = bgHex;
      gAngle.style.setProperty('--nm-accent', bgHex);
    }
    if (gSmooth) {
      gSmooth.style.accentColor = bgHex;
      gSmooth.style.setProperty('--nm-accent', bgHex);
    }
  }

  function runGenerator(keepStops) {
    if (!window.CO_Generator || !R) return;

    var palette = getPalette();
    var checked = document.querySelector('.co-seg input[name="rule"]:checked');
    var ruleName = checked ? checked.value : 'comp';

    var result = window.CO_Generator.generateRows(state, palette, ruleName);
    state.genColors = result.genColors;
    state.genNames = result.genNames;
    state.ruleColors = result.ruleColors;
    state.ruleNames = result.ruleNames;

    if (!keepStops) {
      state.gradientStops = state.genColors.map(function (c, i) {
        return { hex: rgbToHex(c), pos: Math.round(i * 100 / (state.genColors.length - 1)) };
      });
    }
    
    state.ruleGradientStops = result.ruleColors.map(function (c, i) {
      return { hex: rgbToHex(c), pos: Math.round(i * 100 / (result.ruleColors.length - 1)) };
    });

    R.renderStripes(state.genColors, state.genNames, 'stripes');
    R.renderStripes(state.ruleColors, state.ruleNames, 'ruleStripes');
    R.renderPreview(state.genColors, state.ruleColors, state.mainRgb);

    var combinedColors = state.genColors.concat(state.ruleColors.slice(1));
    var combinedNames = state.genNames.concat(state.ruleNames.slice(1));
    R.renderColorTable(combinedColors, combinedNames);

    // 👈 使用纯文本数组渲染 CSS 代码，杜绝 <br> 漏出
    R.renderCssCode(state.genColors, result.cssNames || state.genNames);
    R.renderRuleCssCode(state.ruleColors, result.cssRuleNames || state.ruleNames);
    
    R.renderContrast(state.genColors, state.ruleColors);
    R.renderToneScale(state.mainRgb);

    var mainHex = rgbToHex(state.mainRgb);
    if (document.querySelector('.co-root')) document.querySelector('.co-root').style.setProperty('--co-accent', mainHex);

    if (grad) {
      grad.renderStops();
      if (grad.renderRuleStops) grad.renderRuleStops();
    }

    if (!state.hasImage && state.genColors.length) state.derived = deriveFromPalette(state.genColors);

    if (window.WebPalette) {
      try { WebPalette.update(state.mainRgb, state.genColors); } catch (err) {}
    }
    R.renderAnalysis(state, ctxW, ctxH);
    syncPrimaryButtons();

    if (grad) grad.update();
  }

  function bindEvents() {
    var debouncedRun = debounce(runGenerator, 50);

    document.body.addEventListener('click', function (e) {
      var copyTarget = e.target.closest('[data-copy]');
      if (copyTarget) { U.copyText(copyTarget.dataset.copy); return; }
      
      var target = e.target.closest('[data-action]');
      if (!target) return;

      var action = target.dataset.action;
      
      if (action === 'copy-tone' || action === 'copy-stripe') U.copyText(target.dataset.hex);
      else if (action === 'copy-css') U.copyText($('code') ? $('code').value : '');
      else if (action === 'copy-hex') U.copyText(state.genColors.map(rgbToHex).join(', '));
      else if (action === 'copy-rule-css') U.copyText($('ruleCode') ? $('ruleCode').value : '');
      else if (action === 'copy-rule-hex') U.copyText(state.ruleColors.map(rgbToHex).join(', '));
      else if (action === 'copy-gradient') U.copyText($('g-code') ? $('g-code').value : '');
      else if (action === 'copy-rule-gradient') U.copyText($('g-rule-code') ? $('g-rule-code').value : '');
      else if (action === 'download-gradient' && exporter) exporter.exportGradientPng();
      else if (action === 'download-rule-gradient') {
        if (exporter && exporter.exportRuleGradientPng) exporter.exportRuleGradientPng();
        else U.toast(tt('toastRuleDlTodo'), 'fail');
      }
      else if (action === 'download-wheel' && exporter) exporter.exportWheelPng();
      else if (action === 'download-hex' && exporter) exporter.exportHexPng();
      
      else if (action === 'del-grad' && grad) {
        if (state.gradientStops.length > 2) {
          state.gradientStops.splice(+target.dataset.index, 1);
          grad.renderStops();
          grad.syncMainFromStops();
        } else U.toast(tt('toastDelMin'), 'fail');
      }
      else if (action === 'del-rule-grad' && grad) {
        if (state.ruleGradientStops && state.ruleGradientStops.length > 2) {
          state.ruleGradientStops.splice(+target.dataset.index, 1);
          grad.renderRuleStops();
        } else U.toast(tt('toastDelMin'), 'fail');
      }
      else if (action === 'download-aco' && window.CO_Swatch) {
        var sA = state.hasImage ? state.extracted : state.derived;
        if (sA) U.downloadBlob(window.CO_Swatch.createACO(sA.colors), 'Palette.aco');
      }
      else if (action === 'download-ase' && window.CO_Swatch) {
        var sB = state.hasImage ? state.extracted : state.derived;
        if (sB) U.downloadBlob(window.CO_Swatch.createASE(sB.colors), 'Palette.ase');
      }
      else if (action === 'set-wheel-bg' || action === 'set-hex-bg') {
        var scope = action === 'set-wheel-bg' ? 'wheel' : 'hex';
        var cfg = scope === 'wheel' ? state.wheelConfig : state.hexConfig;
        var color = target.dataset.color;
        cfg.bg = color;
        document.querySelectorAll('.co-radio[data-scope="' + scope + '"]').forEach(function (b) { b.classList.remove('active'); });
        target.classList.add('active');
        if (R) R.renderAnalysis(state, ctxW, ctxH);
      }
    });

    if ($('g-add') && grad) $('g-add').addEventListener('click', function () {
      if (state.gradientStops.length >= 10) return U.toast(tt('toastMaxStops'), 'fail');
      var s = state.gradientStops.slice().sort(function (a, b) { return a.pos - b.pos; });
      
      var maxGap = -1, insertIdx = 0, insertPos = 50;
      for (var i = 0; i < s.length - 1; i++) {
        var gap = s[i+1].pos - s[i].pos;
        if (gap > maxGap) {
          maxGap = gap;
          insertIdx = i;
          insertPos = s[i].pos + gap / 2;
        }
      }
      var newHex = rgbToHex(C.mixOklch(hexToRgb(s[insertIdx].hex), hexToRgb(s[insertIdx+1].hex), 0.5));
      state.gradientStops.push({ hex: newHex, pos: insertPos });
      grad.renderStops();
    });

    if ($('g-rule-add') && grad) $('g-rule-add').addEventListener('click', function () {
      if (state.ruleGradientStops && state.ruleGradientStops.length >= 10) return U.toast(tt('toastMaxRuleStops'), 'fail');
      if (!state.ruleGradientStops || state.ruleGradientStops.length < 2) return;
      var s = state.ruleGradientStops.slice().sort(function (a, b) { return a.pos - b.pos; });
      
      var maxGap = -1, insertIdx = 0, insertPos = 50;
      for (var i = 0; i < s.length - 1; i++) {
        var gap = s[i+1].pos - s[i].pos;
        if (gap > maxGap) {
          maxGap = gap;
          insertIdx = i;
          insertPos = s[i].pos + gap / 2;
        }
      }
      var newHex = rgbToHex(C.mixOklch(hexToRgb(s[insertIdx].hex), hexToRgb(s[insertIdx+1].hex), 0.5));
      state.ruleGradientStops.push({ hex: newHex, pos: insertPos });
      grad.renderRuleStops();
    });

    document.body.addEventListener('change', function (e) {
      if (e.target.name === 'rule' || e.target.name === 'lib') runGenerator();
      if (e.target.id === 'wheelStrokeToggle' || e.target.id === 'strokeToggle') {
        var wt = $('wheelStrokeToggle'), st = $('strokeToggle');
        state.wheelConfig.stroke = wt ? wt.checked : true;
        state.hexConfig.stroke = st ? st.checked : true;
        if (R) R.renderAnalysis(state, ctxW, ctxH);
      }
      if ((e.target.id === 'g-type' || e.target.id === 'g-smooth') && grad) grad.update();
    });

    var gAngle = $('g-angle');
    if (gAngle) {
      gAngle.addEventListener('input', function () {
        if (grad) grad.update();
      });
      gAngle.addEventListener('wheel', function (e) {
        e.preventDefault();
        var step = e.deltaY > 0 ? -5 : 5;
        var newVal = Math.max(0, Math.min(360, +this.value + step));
        if (newVal !== +this.value) {
          this.value = newVal;
          this.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, { passive: false });
    }

    if ($('ci')) $('ci').addEventListener('input', function (e) {
      state.mainRgb = hexToRgb(e.target.value);
      if ($('ti')) $('ti').value = e.target.value.toUpperCase();
      state.hasImage = false;
      debouncedRun(); 
    });

    if ($('ti')) $('ti').addEventListener('input', function (e) {
      var v = e.target.value.trim();
      if (/^#?[0-9a-f]{6}$/i.test(v)) {
        if (v.charAt(0) !== '#') v = '#' + v;
        state.mainRgb = hexToRgb(v);
        if ($('ci')) $('ci').value = v;
        state.hasImage = false;
        debouncedRun(); 
      }
    });

    var drop = $('dropZone'), inp = $('fileInput');
    if (drop && inp) {
      drop.addEventListener('click', function (e) { if (e.target !== inp) inp.click(); });
      drop.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inp.click(); }
      });
      drop.addEventListener('dragover', function (e) { e.preventDefault(); drop.classList.add('dragover'); });
      drop.addEventListener('dragleave', function (e) { e.preventDefault(); drop.classList.remove('dragover'); });
      drop.addEventListener('drop', function (e) {
        e.preventDefault(); drop.classList.remove('dragover');
        if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
      });
      inp.addEventListener('change', function (e) {
        if (e.target.files[0]) handleFile(e.target.files[0]);
      });
    }

    if ($('rand')) $('rand').addEventListener('click', function () {
      state.hasImage = false;
      var randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      state.mainRgb = hexToRgb(randomHex);
      if ($('ci')) $('ci').value = randomHex;
      if ($('ti')) $('ti').value = randomHex.toUpperCase();
      runGenerator();
    });

    if ($('g-presets') && window.CO_Gradient && grad) $('g-presets').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-preset]');
      if (!btn) return;
      var preset = window.CO_Gradient.PRESETS[+btn.dataset.preset];
      if (!preset) return;
      var n = preset.stops.length;
      state.gradientStops = preset.stops.map(function (hex, i) {
        return { hex: hex.toUpperCase(), pos: n === 1 ? 0 : Math.round(i * 100 / (n - 1)) };
      });
      grad.renderStops();
      U.toast(tt('toastPresetApplied', { name: preset.name }), 'ok');
    });

    if ($('g-random') && grad) $('g-random').addEventListener('click', function () {
      try {
        var newStops = [];
        var palette = getPalette(); 
        if (palette && palette.length > 0) {
          for (var i = 0; i < 5; i++) {
            var p = palette[Math.floor(Math.random() * palette.length)];
            newStops.push({ hex: p.hex, pos: i * 25 });
          }
        } else {
          var h = Math.random() * 360;
          var c = 0.08 + Math.random() * 0.25;
          var L = 0.3 + Math.random() * 0.4;
          
          for (var i = 0; i < 5; i++) {
            var t = i / 4;
            var hue = (h + t * (Math.random() * 80 - 40) + 360) % 360;
            var lum = L + t * 0.4 + (Math.random() - 0.5) * 0.05;
            lum = Math.max(0.1, Math.min(0.95, lum));
            
            newStops.push({ 
              hex: rgbToHex(C.oklchToRgb({ L: lum, C: c, h: hue })), 
              pos: i * 25 
            });
          }
        }

        state.gradientStops = newStops;
        grad.renderStops();

        state.mainRgb = hexToRgb(newStops[0].hex);
        if ($('ci')) $('ci').value = newStops[0].hex.toLowerCase();
        if ($('ti')) $('ti').value = newStops[0].hex;
        state.hasImage = false; 
        runGenerator(true); 
        U.toast(tt('toastRandomOk'), 'ok');
      } catch (err) {
        console.error('random gradient failed:', err);
        U.toast(tt('toastRandomFail'), 'fail');
      }
    });

    document.addEventListener('co:langchange', function () {
      if (R) runGenerator(true);
    });
  }

  function handleFile(file) {
    if (!R) return;
    R.extractImage(file, function (res) {
      state.hasImage = true;
      state.extracted = { colors: res.colors, total: res.total };
      state.baseImageColors = res.colors.slice(0, 5);
      state.mainRgb = hexToRgb(state.baseImageColors[0].hex);

      if ($('ci')) $('ci').value = rgbToHex(state.mainRgb).toLowerCase();
      if ($('ti')) $('ti').value = rgbToHex(state.mainRgb);

      var results = $('results'), bar = $('actionBar');
      if (results) results.classList.add('is-visible');
      if (bar) bar.classList.add('is-visible');

      runGenerator();
    });
  }

  function boot() {
    injectFailsafeCSS();
    checkMissingModules();

    cvsW = $('canvasWheel'); cvsH = $('canvasHex');
    if (cvsW) ctxW = cvsW.getContext('2d');
    if (cvsH) ctxH = cvsH.getContext('2d');

    var initialHex = SYSTEM_ACCENT && SYSTEM_ACCENT.length === 7 ? SYSTEM_ACCENT : '#6D5DFC';
    state.mainRgb = hexToRgb(initialHex);

    if ($('ci')) $('ci').value = initialHex.toLowerCase();
    if ($('ti')) $('ti').value = initialHex.toUpperCase();

    if (window.CO_I18N) window.CO_I18N.apply(window.CO_I18N.getLang(), { silent: true });

    state.gradientStops = [
      { hex: initialHex, pos: 0 },
      { hex: '#4A9985', pos: 25 },
      { hex: '#2F6F8F', pos: 50 },
      { hex: '#E8C07A', pos: 75 },
      { hex: '#6D5DFC', pos: 100 }
    ];

    bindEvents();
    
    if (grad) {
      grad.renderPresets();
      grad.renderStops();
    }
    
    runGenerator();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

/* ============================================================
 * 色库悬停提示自动计算 (Auto Tooltip)
 * ============================================================ */
(function autoCalcLibCounts() {
  function updateTips() {
    if (!window.CO_Names) return;
    var names = window.CO_Names;
    
    var libLabels = document.querySelectorAll('#libs label');
    if (!libLabels.length) {
      setTimeout(updateTips, 100);
      return;
    }

    var counts = {
      morandi: (names.MORANDI_RAW || []).length,
      cn: (names.CN_RAW || []).length,
      jp: (names.JP_RAW || []).length,
      cyber: (names.CYBER_RAW || []).length
    };

    var isZh = document.documentElement.lang.indexOf('zh') === 0;
    var texts = isZh ? {
      morandi: '莫兰迪色系 · 共 ' + counts.morandi + ' 色',
      cn: '中国传统色 · 共 ' + counts.cn + ' 色',
      jp: '日式传统色 · 共 ' + counts.jp + ' 色',
      cyber: '赛博朋克色 · 共 ' + counts.cyber + ' 色',
      none: '不限制色库 · 全色相随机'
    } : {
      morandi: 'Morandi · ' + counts.morandi + ' colors',
      cn: 'Chinese Traditional · ' + counts.cn + ' colors',
      jp: 'Japanese Traditional · ' + counts.jp + ' colors',
      cyber: 'Cyberpunk · ' + counts.cyber + ' colors',
      none: 'No Limit · Full Hue Random'
    };

    libLabels.forEach(function(label) {
      var input = label.querySelector('input');
      if (input && texts[input.value]) {
        label.setAttribute('data-tip', texts[input.value]);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateTips);
  } else {
    updateTips();
  }

  document.addEventListener('co:langchange', function() {
    updateTips();
  });
})();