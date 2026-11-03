/* ============================================================ 
 * color-gradient.js —— 终极防卡顿版（延迟渲染 + OKLab 补间）
 * ============================================================ */
(function (global) {
  'use strict';

  var C = global.CO_Color;
  var U = global.CO_Util;
  var $ = U.$;
  var hexToRgb = C.hexToRgb, rgbToHex = C.rgbToHex, mixOklch = C.mixOklch;

  function t(key, vars) {
    if (global.CO_I18N && typeof global.CO_I18N.t === 'function') {
      var v = global.CO_I18N.t(key, vars);
      if (v != null && v !== key) return v;
    }
    return key;
  }

  var GRADIENT_PRESETS = [
    { name: '奶白', stops: ['#FDFBF7', '#F5EEDF', '#E6DFD1'] },
    { name: '晨雾', stops: ['#2F6F8F', '#4A9985', '#E8C07A'] },
    { name: '落日', stops: ['#FF7E5F', '#FFA16D', '#FEB47B'] },
    { name: '深海', stops: ['#0F2027', '#203A43', '#2C5364'] },
    { name: '极光', stops: ['#00C6FF', '#0072FF', '#7C5CFF'] },
    { name: '蜜桃', stops: ['#FBD3E9', '#DB85AB', '#BB377D'] },
    { name: '夜色', stops: ['#232526', '#323435', '#414345'] }
  ];

  function create(cfg) {
    var getStops = cfg.getStops;
    var setStops = cfg.setStops;
    var getRuleStops = cfg.getRuleStops || function () { return []; };
    // 兼容右侧色标的独立存储
    var setRuleStops = cfg.setRuleStops || function() {}; 

    var rafId = null;
    var isDragging = false; // 状态锁：是否正在拖动

    /* ---------------- 1. 结构渲染（只在结构变化时重绘输入框） ---------------- */
    function renderStops() {
      var box = $('g-stops');
      if (!box) return;
      var stops = getStops() || [];
      
      box.innerHTML = stops.map(function (s, i) {
        return '<div class="co-stop" data-i="' + i + '">' +
          '<div class="co-picker">' +
            '<input type="color" value="' + s.hex.toLowerCase() + '" class="g-color" data-index="' + i + '">' +
            '<input type="text" value="' + s.hex + '" class="g-hex" data-index="' + i + '" spellcheck="false">' +
          '</div>' +
          '<label>' + t('stopsPos') + ' <input type="number" min="0" max="100" value="' + s.pos + '" class="g-pos" data-index="' + i + '">%</label>' +
          (stops.length > 2 ? '<button type="button" class="co-stop-del" data-action="del-grad" data-index="' + i + '" aria-label="' + t('stopDel') + '">✕</button>' : '') +
        '</div>';
      }).join('');
      
      updateView();
    }

    function renderRuleStops() {
      var box = $('g-rule-stops');
      if (!box) return;
      var stops = getRuleStops() || [];

      if (stops.length < 2) {
        box.innerHTML = '<div style="font-size:12px;color:var(--nm-text-3);padding:8px;">' + t('ruleStopWait') + '</div>';
        updateView();
        return;
      }

      box.innerHTML = stops.map(function (s, i) {
        return '<div class="co-stop" data-i="' + i + '">' +
          '<div class="co-picker">' +
            '<input type="color" value="' + s.hex.toLowerCase() + '" class="g-rule-color" data-index="' + i + '">' +
            '<input type="text" value="' + s.hex + '" class="g-rule-hex" data-index="' + i + '" spellcheck="false">' +
          '</div>' +
          '<label>' + t('stopsPos') + ' <input type="number" min="0" max="100" value="' + s.pos + '" class="g-rule-pos" data-index="' + i + '">%</label>' +
          (stops.length > 2 ? '<button type="button" class="co-stop-del" data-action="del-rule-grad" data-index="' + i + '" aria-label="' + t('stopDel') + '">✕</button>' : '') +
        '</div>';
      }).join('');
      
      updateView();
    }

    /* ---------------- 2. 核心算法 ---------------- */
    function getExpandedStops(stopsInput, skipSmooth) {
      var sorted = stopsInput.slice().sort(function (a, b) { return a.pos - b.pos; });
      
      // 🔥 关键修复：如果是拖动状态，或者关闭了平滑，直接返回原色标
      var smoothEl = $('g-smooth');
      var smooth = smoothEl ? smoothEl.checked : true;
      if (!smooth || skipSmooth) return sorted; 

      var out = [];
      for (var i = 0; i < sorted.length; i++) {
        out.push(sorted[i]);
        if (i < sorted.length - 1) {
          var span = sorted[i + 1].pos - sorted[i].pos;
          if (span > 0.1) {
            for (var k = 1; k < 6; k++) {
              out.push({
                hex: rgbToHex(mixOklch(hexToRgb(sorted[i].hex), hexToRgb(sorted[i + 1].hex), k / 6)),
                pos: sorted[i].pos + span * k / 6
              });
            }
          }
        }
      }
      return out;
    }

    function buildGradientCss(stops) {
      return stops.map(function (x) {
        var safePos = Math.max(0, Math.min(100, x.pos || 0));
        return x.hex + ' ' + (Math.round(safePos * 10) / 10) + '%';
      }).join(', ');
    }

    /* ---------------- 3. 视图更新（RAF + 延迟计算） ---------------- */
    function updateView() {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(function() {
        var typeEl = $('g-type'), angleEl = $('g-angle');
        var type = typeEl ? typeEl.value : 'linear';
        var a = angleEl ? angleEl.value : 135;

        function buildCss(stopString) {
          return type === 'radial'
            ? 'radial-gradient(circle, ' + stopString + ')'
            : type === 'conic'
              ? 'conic-gradient(from ' + a + 'deg, ' + stopString + ')'
              : 'linear-gradient(' + a + 'deg, ' + stopString + ')';
        }

        // 左侧：如果正在拖动，跳过平滑插值，保证帧率
        var rawStopsL = getStops() || [];
        if (rawStopsL.length >= 2) {
          var expandedL = getExpandedStops(rawStopsL, isDragging); // 👈 传入 isDragging
          var listL = buildGradientCss(expandedL);
          var cssL = buildCss(listL);
          
          var pvL = $('g-pv-main');
          if (pvL) pvL.style.background = cssL;

          var codeL = $('g-code');
          if (codeL) {
            var sortedL = rawStopsL.slice().sort(function (p, q) { return p.pos - q.pos; });
            codeL.value = 'background: ' + sortedL[0].hex + ';\nbackground: ' + cssL + ';';
          }
        }

        // 右侧：同理
        var rawStopsR = getRuleStops() || [];
        if (rawStopsR.length >= 2) {
          var expandedR = getExpandedStops(rawStopsR, isDragging); // 👈 传入 isDragging
          var listR = buildGradientCss(expandedR);
          var cssR = buildCss(listR);
          
          var pvR = $('g-pv-rule');
          if (pvR) pvR.style.background = cssR;

          var codeR = $('g-rule-code');
          if (codeR) {
            var sortedR = rawStopsR.slice().sort(function (p, q) { return p.pos - q.pos; });
            codeR.value = 'background: ' + sortedR[0].hex + ';\nbackground: ' + cssR + ';';
          }
        } else {
          var pvR2 = $('g-pv-rule');
          if (pvR2) pvR2.style.background = 'var(--nm-bg)';
          var codeR2 = $('g-rule-code');
          if (codeR2) codeR2.value = '';
        }

        var av = $('g-angle-v');
        if (av) av.textContent = a + '°';
      });
    }

    /* ---------------- 4. 预设与同步 ---------------- */
    function renderPresets() {
      var box = $('g-presets');
      if (!box) return;
      box.innerHTML = GRADIENT_PRESETS.map(function (p, i) {
        return '<button type="button" class="co-preset" data-preset="' + i + '" title="' + p.name + '"' +
          ' aria-label="' + t('toastPresetApplied', { name: p.name }) + '"' +
          ' style="background:linear-gradient(135deg,' + p.stops.join(',') + ');"></button>';
      }).join('');
    }

    function syncMainFromStops() {
      setTimeout(function () {
        var sorted = getStops().slice().sort(function (a, b) { return a.pos - b.pos; });
        if (!sorted.length) return;
        cfg.onMainFromStops(sorted[0].hex);
      }, 300);
    }

    /* ---------------- 5. 事件绑定（监听拖拽状态） ---------------- */
    function bindEvents() {
      var boxL = $('g-stops');
      var boxR = $('g-rule-stops');

      // 🔥 核心：监听鼠标按下和抬起，控制是否跳过插值
      function onPointerDown() { isDragging = true; }
      function onPointerUp() { 
        isDragging = false; 
        updateView(); // 松手后，用平滑插值重新渲染一次
      }

      if (boxL) {
        boxL.addEventListener('pointerdown', onPointerDown);
        boxL.addEventListener('pointerup', onPointerUp);
        boxL.addEventListener('pointercancel', onPointerUp); // 防止移出窗口卡死

        boxL.addEventListener('input', function(e) {
          var el = e.target;
          var idx = +el.dataset.index;
          if (isNaN(idx)) return;
          var stops = getStops();
          if (!stops || !stops[idx]) return;

          if (el.classList.contains('g-color')) {
            stops[idx].hex = el.value.toUpperCase();
            var hx = boxL.querySelector('.g-hex[data-index="' + idx + '"]');
            if (hx) hx.value = stops[idx].hex;
          } else if (el.classList.contains('g-hex')) {
            var v = el.value.trim();
            if (!/^#?[0-9a-f]{6}$/i.test(v)) return;
            if (v.charAt(0) !== '#') v = '#' + v;
            stops[idx].hex = v.toUpperCase();
            var cp = boxL.querySelector('.g-color[data-index="' + idx + '"]');
            if (cp) cp.value = v.toLowerCase();
          } else if (el.classList.contains('g-pos')) {
            stops[idx].pos = Math.max(0, Math.min(100, +el.value || 0));
          } else return;

          setStops(stops);
          updateView();
        });
      }

      if (boxR) {
        boxR.addEventListener('pointerdown', onPointerDown);
        boxR.addEventListener('pointerup', onPointerUp);
        boxR.addEventListener('pointercancel', onPointerUp);

        boxR.addEventListener('input', function(e) {
          var el = e.target;
          var idx = +el.dataset.index;
          if (isNaN(idx)) return;
          var stops = getRuleStops();
          if (!stops || !stops[idx]) return;

          if (el.classList.contains('g-rule-color')) {
            stops[idx].hex = el.value.toUpperCase();
            var hx = boxR.querySelector('.g-rule-hex[data-index="' + idx + '"]');
            if (hx) hx.value = stops[idx].hex;
          } else if (el.classList.contains('g-rule-hex')) {
            var v = el.value.trim();
            if (!/^#?[0-9a-f]{6}$/i.test(v)) return;
            if (v.charAt(0) !== '#') v = '#' + v;
            stops[idx].hex = v.toUpperCase();
            var cp = boxR.querySelector('.g-rule-color[data-index="' + idx + '"]');
            if (cp) cp.value = v.toLowerCase();
          } else if (el.classList.contains('g-rule-pos')) {
            stops[idx].pos = Math.max(0, Math.min(100, +el.value || 0));
          } else return;

          setRuleStops(stops);
          updateView();
        });
      }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindEvents);
    else bindEvents();

    return {
      renderStops: renderStops,
      renderRuleStops: renderRuleStops,
      renderPresets: renderPresets,
      update: updateView,
      syncMainFromStops: syncMainFromStops,
      getExpandedStops: getExpandedStops,
      buildGradientCss: buildGradientCss
    };
  }

  global.CO_Gradient = { create: create, PRESETS: GRADIENT_PRESETS };

})(window);