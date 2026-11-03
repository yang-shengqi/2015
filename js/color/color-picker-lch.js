/* ============================================================
 * color-picker-lch.js —— OKLCH 面板逻辑 (接入国际化版)
 * ============================================================ */
(function (global) {
  'use strict';
  if (!global.CO_Color) return;
  var C = global.CO_Color;

  function getI18n(key) {
    return (global.CO_I18N && typeof global.CO_I18N.t === 'function') ? global.CO_I18N.t(key) : key;
  }

  function init() {
    var ci = document.getElementById('ci');
    var wrapper = document.querySelector('.cp-wrapper'); 
    if (!ci || !wrapper || document.getElementById('cp-oklch-panel')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cp-btn cp-lch-btn co-tip';
    btn.textContent = 'LCH';
    btn.dataset.tip = getI18n('tipOklch'); // 👈 接入词典
    wrapper.appendChild(btn);

    var panel = document.createElement('div');
    panel.className = 'co-cp-panel';
    panel.id = 'cp-oklch-panel';
    panel.innerHTML = `
      <div class="cp-hint">${getI18n('panelOklchTitle')}</div>
      <div class="cp-row">
        <span>L</span>
        <input type="range" class="nm-range" id="cpOkL" min="0" max="1" step="0.005">
        <output id="cpOkL-out" class="cp-out">0.50</output>
      </div>
      <div class="cp-row">
        <span>C</span>
        <input type="range" class="nm-range" id="cpOkC" min="0" max="0.4" step="0.005">
        <output id="cpOkC-out" class="cp-out">0.100</output>
      </div>
      <div class="cp-row">
        <span>H</span>
        <input type="range" class="nm-range" id="cpOkH" min="0" max="360" step="1">
        <output id="cpOkH-out" class="cp-out">0 °</output>
      </div>
    `;
    wrapper.appendChild(panel);

    var lRange = panel.querySelector('#cpOkL');
    var cRange = panel.querySelector('#cpOkC');
    var hRange = panel.querySelector('#cpOkH');
    var lOut = panel.querySelector('#cpOkL-out');
    var cOut = panel.querySelector('#cpOkC-out');
    var hOut = panel.querySelector('#cpOkH-out');

    function syncUI(hex) {
      var rgb = C.hexToRgb(hex);
      var oklch = C.rgbToOklch(rgb); 
      lRange.value = oklch.L;
      cRange.value = oklch.C;
      hRange.value = oklch.h;
      lOut.textContent = oklch.L.toFixed(2);
      cOut.textContent = oklch.C.toFixed(3);
      hOut.textContent = Math.round(oklch.h) + ' °';
    }
    syncUI(ci.value);

    function onSliderInput() {
      var l = +lRange.value, c = +cRange.value, h = +hRange.value;
      lOut.textContent = l.toFixed(2);
      cOut.textContent = c.toFixed(3);
      hOut.textContent = Math.round(h) + ' °';
      var newRgb = C.oklchToRgb({ L: l, C: c, h: h });
      var hex = C.rgbToHex(newRgb);
      ci.value = hex.toLowerCase();
      ci.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    panel.addEventListener('input', function(e) {
      if (e.target.type === 'range') onSliderInput();
    });

    btn.addEventListener('click', function(e) {
      e.preventDefault(); e.stopPropagation();
      panel.classList.toggle('show');
      btn.classList.toggle('active');
      var hslPanel = document.getElementById('cp-hsl-panel');
      var hslBtn = document.querySelector('.cp-btn:not(.cp-lch-btn)');
      if (hslPanel && panel.classList.contains('show')) {
        hslPanel.classList.remove('show');
        if (hslBtn) hslBtn.classList.remove('active');
      }
    });

    document.addEventListener('click', function(e) {
      if (!wrapper.contains(e.target)) {
        panel.classList.remove('show');
        btn.classList.remove('active');
      }
    });

    // 👇 监听全局语言切换
    document.addEventListener('co:langchange', function() {
      btn.dataset.tip = getI18n('tipOklch');
      panel.querySelector('.cp-hint').textContent = getI18n('panelOklchTitle');
    });

    var lastHex = ci.value;
    setInterval(function() {
      if (ci.value !== lastHex) {
        lastHex = ci.value;
        syncUI(ci.value);
      }
    }, 100);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  global.CO_PickerLch = { loaded: true };

})(window);