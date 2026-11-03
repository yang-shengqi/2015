/* ============================================================
 * color-picker-hsl.js —— HSL 面板逻辑 (接入国际化版)
 * ============================================================ */
(function (global) {
  'use strict';
  if (!global.CO_Color) return;
  var C = global.CO_Color;

  function getI18n(key) {
    return (global.CO_I18N && typeof global.CO_I18N.t === 'function') ? global.CO_I18N.t(key) : key;
  }

  function hslToRgb(h, s, l) {
    s /= 100; l /= 100;
    var k = n => (n + h / 30) % 12;
    var a = s * Math.min(l, 1 - l);
    var f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return { r: Math.round(255 * f(0)), g: Math.round(255 * f(8)), b: Math.round(255 * f(4)) };
  }

  function init() {
    var ci = document.getElementById('ci');
    if (!ci || document.getElementById('cp-hsl-panel')) return;
    var picker = ci.closest('.co-picker');
    if (!picker) return;

    // 👇 顺手把主色框的提示词也通过 JS 注入，不需要去改 HTML 了
    picker.dataset.tip = getI18n('tipMainColor');

    var wrapper = document.createElement('div');
    wrapper.className = 'cp-wrapper';
    picker.parentNode.insertBefore(wrapper, picker);
    wrapper.appendChild(picker); 

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cp-btn co-tip';
    btn.textContent = 'HSL';
    btn.dataset.tip = getI18n('tipHsl'); // 👈 接入词典
    wrapper.appendChild(btn);

    var panel = document.createElement('div');
    panel.className = 'co-cp-panel';
    panel.id = 'cp-hsl-panel';
    panel.innerHTML = `
      <div class="cp-hint">${getI18n('panelHslTitle')}</div>
      <div class="cp-row">
        <span>H</span>
        <input type="range" class="nm-range" id="cpH" min="0" max="360">
        <output id="cpH-out" class="cp-out">0 °</output>
      </div>
      <div class="cp-row">
        <span>S</span>
        <input type="range" class="nm-range" id="cpS" min="0" max="100">
        <output id="cpS-out" class="cp-out">0 %</output>
      </div>
      <div class="cp-row">
        <span>L</span>
        <input type="range" class="nm-range" id="cpL" min="0" max="100">
        <output id="cpL-out" class="cp-out">0 %</output>
      </div>
      <button type="button" class="btn cp-eyedropper">${getI18n('btnEyeDropper')}</button>
    `;
    wrapper.appendChild(panel);

    var hRange = panel.querySelector('#cpH');
    var sRange = panel.querySelector('#cpS');
    var lRange = panel.querySelector('#cpL');
    var hOut = panel.querySelector('#cpH-out');
    var sOut = panel.querySelector('#cpS-out');
    var lOut = panel.querySelector('#cpL-out');

    function syncUI(hex) {
      var rgb = C.hexToRgb(hex);
      var hsl = C.rgbToHsl(rgb.r, rgb.g, rgb.b);
      hRange.value = hsl.h;
      sRange.value = hsl.s;
      lRange.value = hsl.l;
      hOut.textContent = Math.round(hsl.h) + ' °';
      sOut.textContent = Math.round(hsl.s) + ' %';
      lOut.textContent = Math.round(hsl.l) + ' %';
    }
    syncUI(ci.value);

    function onSliderInput() {
      var h = +hRange.value, s = +sRange.value, l = +lRange.value;
      hOut.textContent = Math.round(h) + ' °';
      sOut.textContent = Math.round(s) + ' %';
      lOut.textContent = Math.round(l) + ' %';
      var newRgb = hslToRgb(h, s, l);
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
      var lchPanel = document.getElementById('cp-oklch-panel');
      var lchBtn = document.querySelector('.cp-lch-btn');
      if (lchPanel && panel.classList.contains('show')) {
        lchPanel.classList.remove('show');
        if (lchBtn) lchBtn.classList.remove('active');
      }
    });

    document.addEventListener('click', function(e) {
      if (!wrapper.contains(e.target)) {
        panel.classList.remove('show');
        btn.classList.remove('active');
      }
    });

    var edBtn = panel.querySelector('.cp-eyedropper');
    if (global.EyeDropper) {
      edBtn.addEventListener('click', function() {
        new global.EyeDropper().open().then(res => {
          ci.value = res.sRGBHex.toLowerCase();
          syncUI(ci.value);
          panel.classList.remove('show');
          btn.classList.remove('active');
          ci.dispatchEvent(new Event('input', { bubbles: true }));
        }).catch(() => {});
      });
    } else { edBtn.style.display = 'none'; }

    // 👇 监听全局语言切换
    document.addEventListener('co:langchange', function() {
      picker.dataset.tip = getI18n('tipMainColor');
      btn.dataset.tip = getI18n('tipHsl');
      panel.querySelector('.cp-hint').textContent = getI18n('panelHslTitle');
      if (global.EyeDropper) edBtn.textContent = getI18n('btnEyeDropper');
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

  global.CO_PickerHsl = { loaded: true };

})(window);