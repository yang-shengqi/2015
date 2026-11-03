/* ============================================================
 * charts.js —— Chart.js 封装
 * ------------------------------------------------------------
 * 变量名已对齐第三代规范：--nm-*
 *
 * 本版修改：
 *   ★ 移除废弃的 themechange 监听
 *   ★ TOKEN_NAMES 数组去重
 *   ★ 将 Tooltip 硬编码颜色提取为常量（Canvas 不支持 CSS var 特例）
 * ============================================================ */
(function (App) {
  'use strict';

  /* ★ 变量名对齐第三代（去重） */
  var TOKEN_NAMES = [
    '--nm-c1', '--nm-c2', '--nm-c3', '--nm-c4', '--nm-fail',
    '--nm-line', '--nm-text-3', '--nm-text-2', '--nm-bg',
    '--nm-ok', '--nm-warn', '--nm-accent'
  ];

  /* ★ Canvas 内不支持 CSS var，故提取为常量（对应 --nm-text / --nm-light） */
  var TOOLTIP_COLORS = {
    bg:        'rgba(47, 51, 58, .92)',  /* --nm-text (#2f333a) + 透明度 */
    text:      '#ffffff',                /* --nm-light */
    border:    'rgba(255, 255, 255, 0.10)'
  };

  var registry = [];

  var _chartLoading = null;

  function ensureChart(cb) {
    if (typeof Chart !== 'undefined') { cb(); return; }

    if (!_chartLoading) {
      _chartLoading = new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = 'js/chart.umd.min.js';
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    _chartLoading.then(cb, function () {
      console.warn('[charts] Chart.js 加载失败');
    });
  }

  /* ★ tooltip 默认：深灰，不用纯黑 */
  function applyGlobalDefaults() {
    if (typeof Chart === 'undefined' ||
        !Chart.defaults || !Chart.defaults.plugins) return;

    var gTip = Chart.defaults.plugins.tooltip;
    gTip.backgroundColor = TOOLTIP_COLORS.bg;
    gTip.titleColor      = TOOLTIP_COLORS.text;
    gTip.bodyColor       = TOOLTIP_COLORS.text;
    gTip.footerColor     = TOOLTIP_COLORS.text;
    gTip.borderColor     = TOOLTIP_COLORS.border;
    gTip.borderWidth     = 1;
    gTip.padding         = 12;
    gTip.cornerRadius    = 8;
    gTip.displayColors   = true;
    gTip.boxPadding      = 4;
    gTip.titleFont       = { size: 12, weight: '600' };
    gTip.bodyFont        = { size: 12 };
  }

  applyGlobalDefaults();

  function tokens() {
    return App.cssVars(TOKEN_NAMES);
  }

  var MOUSE_EVENTS = [
    'mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'
  ];

  function defaults(t) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: App.utils.reducedMotion()
        ? false
        : { duration: 420, easing: 'easeOutCubic' },
      interaction: { mode: 'index', intersect: false },
      events: MOUSE_EVENTS,

      plugins: {
        legend: {
          display: true,
          labels: {
            color: t['--nm-text-2'],
            boxWidth: 12,
            boxHeight: 12,
            padding: 12
          }
        },
        tooltip: {
          backgroundColor: TOOLTIP_COLORS.bg,
          titleColor:      TOOLTIP_COLORS.text,
          bodyColor:       TOOLTIP_COLORS.text,
          footerColor:     TOOLTIP_COLORS.text,
          borderColor:     TOOLTIP_COLORS.border,
          borderWidth:     1,
          padding:         12,
          cornerRadius:    8,
          displayColors:   true,
          boxPadding:      4,
          titleFont:       { size: 12, weight: '600' },
          bodyFont:        { size: 12 }
        }
      },

      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: t['--nm-text-3'], font: { size: 11 } }
        },
        y: {
          grid: { color: t['--nm-line'], drawTicks: false },
          border: { display: false },
          ticks: { color: t['--nm-text-3'], font: { size: 11 } }
        }
      }
    };
  }

  function merge(target, source) {
    if (!source) return target;
    for (var key in source) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
      var sv = source[key];
      var tv = target[key];
      if (sv && typeof sv === 'object' && !Array.isArray(sv) &&
          tv && typeof tv === 'object' && !Array.isArray(tv)) {
        merge(tv, sv);
      } else {
        target[key] = sv;
      }
    }
    return target;
  }

  function find(id) {
    for (var i = 0; i < registry.length; i++) {
      if (registry[i].id === id) return registry[i];
    }
    return null;
  }

  function create(id, canvas, factory, opts) {
    if (!canvas) {
      console.warn('[charts] canvas 为空：', id);
      return;
    }

    canvas.setAttribute('tabindex', '-1');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.outline = 'none';

    if (!canvas.__noKeyboardBound) {
      canvas.addEventListener('keydown', function (e) {
        e.stopPropagation();
      }, true);
      canvas.addEventListener('keypress', function (e) {
        e.stopPropagation();
      }, true);
      canvas.addEventListener('focus', function () {
        canvas.blur();
      });
      canvas.__noKeyboardBound = true;
    }

    var entry = find(id);
    if (entry) {
      entry.factory = factory;
      entry.opts = opts || entry.opts || null;
      rebuild(entry);
      return;
    }
    entry = { id: id, canvas: canvas, factory: factory, instance: null, opts: opts || null };
    registry.push(entry);
    rebuild(entry);
  }

  function applyA11y(entry) {
    if (!entry || !entry.canvas || !entry.opts) return;
    var opts = entry.opts;

    if (opts.ariaLabel) {
      App.a11y.labelChart(entry.canvas, opts.ariaLabel);
    }

    var desc = opts.description;
    if (typeof desc === 'function') {
      try { desc = desc(); } catch (e) { desc = ''; }
    }
    if (desc) {
      App.a11y.describeChart(entry.canvas, desc);
    }
  }

  function rebuild(entry) {
    if (typeof Chart === 'undefined') {
      ensureChart(function () {
        applyGlobalDefaults();
        rebuild(entry);
      });
      return;
    }

    var t = tokens();
    var config = entry.factory(t) || {};
    config.options = merge(defaults(t), config.options || {});
    config.options.events = MOUSE_EVENTS;

    if (entry.instance) {
      entry.instance.destroy();
      entry.instance = null;
    }

    entry.instance = new Chart(entry.canvas.getContext('2d'), config);

    applyA11y(entry);
  }

  function redrawAll() {
    registry.forEach(rebuild);
  }

  function destroy(id) {
    var entry = find(id);
    if (!entry) return;
    if (entry.instance) entry.instance.destroy();
    registry.splice(registry.indexOf(entry), 1);
  }

  App.charts = {
    create: create,
    redrawAll: redrawAll,
    destroy: destroy,
    tokens: tokens
  };

})(window.App = window.App || {});