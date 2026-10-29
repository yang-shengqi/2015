/* ============================================================
 * core.js —— 地基（第三代版）
 * ============================================================ */
(function (App) {
  'use strict';

  /* ==========================================================
   * 〇、全局常量（唯一定义处）
   * ========================================================== */
  App.constants = {
    FALLBACK_RATES: {
      USD: 7.8470, EUR: 9.0758, JPY: 0.0493, CHF: 9.6495,
      GBP: 10.6170, CAD: 5.6539, AUD: 5.5565, SGD: 6.1324,
      CNH: 1.1635, HKD: 1.0000
    },
    DEFAULT_CNY_HKD: 1.1694
  };

  /* ==========================================================
   * 一、DOM 助手
   * ========================================================== */
  App.$ = function (sel, root) {
    return (root || document).querySelector(sel);
  };

  App.$$ = function (sel, root) {
    return Array.prototype.slice.call(
      (root || document).querySelectorAll(sel)
    );
  };

  /* ==========================================================
   * 二、CSS 变量读取
   * ========================================================== */
  App.cssVar = function (name, root) {
    return getComputedStyle(root || document.documentElement)
      .getPropertyValue(name).trim();
  };

  App.cssVars = function (names, root) {
    var cs = getComputedStyle(root || document.documentElement);
    var out = {};
    for (var i = 0; i < names.length; i++) {
      out[names[i]] = cs.getPropertyValue(names[i]).trim();
    }
    return out;
  };

  /* ==========================================================
   * 三、本地存储
   * ========================================================== */
  var PREFIX = 'console-';

  App.storage = {
    get: function (key, fallback) {
      try {
        var v = localStorage.getItem(PREFIX + key);
        return v === null ? fallback : v;
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { localStorage.setItem(PREFIX + key, value); } catch (e) {}
    },
    remove: function (key) {
      try { localStorage.removeItem(PREFIX + key); } catch (e) {}
    },
    getJSON: function (key, fallback) {
      var raw = App.storage.get(key, null);
      if (raw === null) return fallback;
      try { return JSON.parse(raw); } catch (e) { return fallback; }
    },
    setJSON: function (key, value) {
      try { App.storage.set(key, JSON.stringify(value)); } catch (e) {}
    },
    rawGet: function (key, fallback) {
      try {
        var v = localStorage.getItem(key);
        return v === null ? fallback : v;
      } catch (e) { return fallback; }
    },
    rawSet: function (key, value) {
      try { localStorage.setItem(key, value); } catch (e) {}
    },
    migrate: function (key) {
      try {
        var oldVal = App.storage.rawGet(key, null);
        var newVal = App.storage.get(key, null);
        if (oldVal !== null && newVal === null) {
          App.storage.set(key, oldVal);
          try { localStorage.removeItem(key); } catch (e) {}
        }
      } catch (e) {}
    }
  };

  /* ==========================================================
   * 四、状态中心
   * ========================================================== */
  var _state = {};
  App.store = {
    get: function (key, fallback) {
      return Object.prototype.hasOwnProperty.call(_state, key) ? _state[key] : fallback;
    },
    set: function (key, value) { _state[key] = value; return value; },
    has: function (key) { return Object.prototype.hasOwnProperty.call(_state, key); },
    all: function () {
      var out = {};
      for (var k in _state) {
        if (Object.prototype.hasOwnProperty.call(_state, k)) out[k] = _state[k];
      }
      return out;
    },
    clear: function () { _state = {}; }
  };

  /* ==========================================================
   * 五、事件总线
   * ========================================================== */
  App.events = {
    on: function (name, fn) {
      var handler = function (e) { fn(e.detail); };
      document.addEventListener(name, handler);
      return function off() { document.removeEventListener(name, handler); };
    },
    emit: function (name, detail) {
      document.dispatchEvent(new CustomEvent(name, { detail: detail }));
    }
  };

  /* ==========================================================
   * 六、通用工具
   * ========================================================== */
  var _usdRateWarned = false;

  App.utils = {
    debounce: function (fn, wait) {
      var t = null;
      return function () {
        var args = arguments, self = this;
        clearTimeout(t);
        t = setTimeout(function () { fn.apply(self, args); }, wait);
      };
    },
    throttle: function (fn, wait) {
      var last = 0, timer = null;
      return function () {
        var args = arguments, self = this;
        var now = Date.now();
        var remain = wait - (now - last);
        if (remain <= 0) {
          clearTimeout(timer); timer = null; last = now;
          fn.apply(self, args);
        } else if (!timer) {
          timer = setTimeout(function () {
            last = Date.now(); timer = null;
            fn.apply(self, args);
          }, remain);
        }
      };
    },
    ready: function (fn) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn, { once: true });
      } else { fn(); }
    },
    reducedMotion: function () {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
    formatNumber: function (x) {
      if (x === undefined || x === null || isNaN(x)) return '0';
      var parts = Number(x).toFixed(2).split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    },
    escapeHTML: function (s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    },
    scrollTo: function (top, behavior) {
      window.scrollTo({
        top: top,
        behavior: behavior || (App.utils.reducedMotion() ? 'auto' : 'smooth')
      });
    },
    /* 保留原签名防报错，但实际返回的是汇率 */
    usdToHkd: function () {
      var r = 0;
      try {
        if (App.fx && typeof App.fx.rate === 'function') { r = App.fx.rate('USD'); }
      } catch (e) { r = 0; }
      if (r > 0 && r !== 1) return r;
      if (!_usdRateWarned) {
        _usdRateWarned = true;
        console.warn('[core] 未取到 USD→HKD 生效汇率，暂用兜底 ' + App.constants.FALLBACK_RATES.USD);
      }
      return App.constants.FALLBACK_RATES.USD;
    },
    isEmpty: function (v) {
      return v === null || v === undefined || v === '' || (typeof v === 'number' && isNaN(v));
    },
    clamp: function (v, lo, hi) { return Math.max(lo, Math.min(hi, v)); },
    padZero: function (n, len) {
      var s = String(n); var L = len || 2;
      while (s.length < L) s = '0' + s;
      return s;
    },
    uuid: function (prefix) {
      return (prefix || 'uid') + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    },
    _scrollLock: 0,
    lockScroll: function () {
      App.utils._scrollLock++;
      document.body.style.overflow = 'hidden';
    },
    unlockScroll: function () {
      App.utils._scrollLock = Math.max(0, App.utils._scrollLock - 1);
      if (App.utils._scrollLock === 0) {
        document.body.style.overflow = '';
      }
    },

    /* 👇 新增：全局 Toast 提示（右上角堆叠版） 👇 */
    toast: function (msg, type) {
      var container = document.getElementById('toastContainer');
      if (!container) {
        // 以防万一找不到容器，兜底打印在控制台
        console.warn('Toast容器不存在，消息：', msg);
        return;
      }
      
      // 1. 动态创建一条消息
      var el = document.createElement('div');
      el.className = 'toast-item';
      el.textContent = msg;
      if (type === 'ok') el.classList.add('ok');
      if (type === 'fail') el.classList.add('fail');
      
      // 2. 插入到右上角容器
      container.appendChild(el);
      
      // 3. 强制重绘后触发入场动画（滑入）
      void el.offsetWidth;
      el.classList.add('show');
      
      // 4. 定时 3 秒后淡出
      setTimeout(function () {
        el.classList.remove('show');
        el.classList.add('hide');
        
        // 等待退场动画结束（300ms）后从 DOM 彻底移除，防止节点堆积
        setTimeout(function () {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        }, 300);
      }, 3000);
    }
  };

  /* ==========================================================
   * 七、无障碍工具
   * ========================================================== */
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  App.a11y = {
    trapFocus: function (container, opts) {
      if (!container) return function () {};
      opts = opts || {};
      var previous = opts.returnFocus || document.activeElement;

      function getFocusable() {
        return App.$$(FOCUSABLE, container).filter(function (el) {
          return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
        });
      }

      function onKeydown(e) {
        if (e.key === 'Escape') {
          if (typeof opts.onEscape === 'function') {
            e.stopPropagation(); opts.onEscape(e);
          }
          return;
        }
        if (e.key !== 'Tab') return;
        var list = getFocusable();
        if (!list.length) { e.preventDefault(); return; }
        var first = list[0], last = list[list.length - 1], active = document.activeElement;
        if (e.shiftKey) {
          if (active === first || !container.contains(active)) { e.preventDefault(); last.focus(); }
        } else {
          if (active === last || !container.contains(active)) { e.preventDefault(); first.focus(); }
        }
      }

      document.addEventListener('keydown', onKeydown, true);
      var init = opts.initialFocus;
      if (typeof init === 'string') init = container.querySelector(init);
      if (!init) init = getFocusable()[0];
      if (init) { requestAnimationFrame(function () { if (init && init.focus) init.focus(); }); }

      return function release() {
        document.removeEventListener('keydown', onKeydown, true);
        if (previous && typeof previous.focus === 'function') {
          requestAnimationFrame(function () { previous.focus(); });
        }
      };
    },
    labelChart: function (target, label) {
      var canvas = (typeof target === 'string') ? document.getElementById(target) : target;
      if (!canvas || !label) return;
      var host = canvas.parentElement || canvas;
      host.setAttribute('role', 'img');
      host.setAttribute('aria-label', label);
      canvas.setAttribute('aria-hidden', 'true');
    },
    describeChart: function (target, text) {
      var canvas = (typeof target === 'string') ? document.getElementById(target) : target;
      if (!canvas || !text) return;
      var host = canvas.parentElement || canvas;
      var descId = 'chart-desc-' + (canvas.id || 'x');
      var el = document.getElementById(descId);
      if (!el) {
        el = document.createElement('p'); el.id = descId; el.className = 'sr-only';
        host.appendChild(el);
      }
      el.textContent = text;
      if (host.getAttribute('role') === 'img') { host.setAttribute('aria-describedby', descId); }
    },
    closeOnEsc: function (handler) {
      if (typeof handler !== 'function') return function () {};
      var fn = function (e) { if (e.key === 'Escape') handler(e); };
      document.addEventListener('keydown', fn);
      return function off() { document.removeEventListener('keydown', fn); };
    }
  };

  /* ==========================================================
   * 八、通用分页（页码 + 年份，共用 .page-btn）
   * ========================================================== */
  App.pagination = {
    MAX_VISIBLE: 7,

    /* ---------- 页码分页（保留，用于普通数据分页） ---------- */
    render: function (cur, total, pageKey) {
      if (total <= 1) return '';
      var MAX = App.pagination.MAX_VISIBLE;
      var items = [];
      if (total <= MAX) {
        for (var i = 1; i <= total; i++) items.push(i);
      } else {
        var left = Math.max(1, cur - 2);
        var right = Math.min(total, cur + 2);
        if (left > 1) { items.push(1); if (left > 2) items.push('...'); }
        for (var j = left; j <= right; j++) items.push(j);
        if (right < total) {
          if (right < total - 1) items.push('...');
          items.push(total);
        }
      }
      var html = '<div class="pagination-wrap"><div class="pagination">';
      html += (cur > 1)
        ? '<button class="page-btn page-arrow" data-page="prev">‹</button>'
        : '<span class="page-btn page-arrow disabled">‹</span>';
      for (var k = 0; k < items.length; k++) {
        var it = items[k];
        if (it === '...') {
          html += '<span class="page-ellipsis">…</span>';
        } else {
          var active = (it === cur) ? ' active' : '';
          html += '<button class="page-btn' + active + '" data-page="' + it + '">' + it + '</button>';
        }
      }
      html += (cur < total)
        ? '<button class="page-btn page-arrow" data-page="next">›</button>'
        : '<span class="page-btn page-arrow disabled">›</span>';
      var key = pageKey || 'page.tpl';
      var tpl = App.i18n && typeof App.i18n.t === 'function' ? App.i18n.t(key, '第 {cur} / {total} 页') : '第 {cur} / {total} 页';
      html += '</div><div class="page-info">' + tpl.replace('{cur}', cur).replace('{total}', total) + '</div></div>';
      return html;
    },

    bind: function (container, cur, total, onChange) {
      App.$$('.page-btn[data-page]', container).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var p = btn.getAttribute('data-page');
          var newPage = cur;
          if (p === 'prev') newPage = Math.max(1, cur - 1);
          else if (p === 'next') newPage = Math.min(total, cur + 1);
          else newPage = parseInt(p, 10);
          if (newPage !== cur && typeof onChange === 'function') onChange(newPage);
        });
      });
    },

    /* ---------- 年份分页（统一基准：‹ 2026 2025 2024 2023 2022 ›） ----------
     * years   : 降序年份数组，如 ['2026','2025','2024','2023','2022','2021']
     * current : 当前选中，如 '2026'
     * page    : 当前组索引，0 起
     * perPage : 每组年份数，默认 5
     * 返回    : HTML 字符串
     * 事件    : 按钮带 data-year="2026" / data-nav="p|n"
     */
    renderYearPager: function (years, current, page, perPage) {
      if (!years || !years.length) return '';
      perPage = perPage || 5;
      var pages = Math.ceil(years.length / perPage);
      page = Math.max(0, Math.min(page || 0, pages - 1));
      var slice = years.slice(page * perPage, page * perPage + perPage);

      var html = '<div class="pagination">';
      // ★ 不管有几页，永远显示左右箭头（使用 class="disabled" 控制状态）
      html += '<button class="page-btn page-arrow' + (page <= 0 ? ' disabled' : '') + '" data-nav="p" aria-label="上一组">‹</button>';
      
      slice.forEach(function (y) {
        html += '<button class="page-btn' + (y === current ? ' active' : '') +
          '" data-year="' + y + '">' + y + '</button>';
      });
      
      // ★ 不管有几页，永远显示左右箭头（使用 class="disabled" 控制状态）
      html += '<button class="page-btn page-arrow' + (page >= pages - 1 ? ' disabled' : '') + '" data-nav="n" aria-label="下一组">›</button>';
      
      html += '</div>';
      return html;
    },

    /* 绑定年份分页。onYear(year) / onNav(dir) 由业务传入 */
    bindYearPager: function (container, onYear, onNav) {
      App.$$('.page-btn[data-year]', container).forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (typeof onYear === 'function') onYear(btn.getAttribute('data-year'));
        });
      });
      App.$$('.page-btn[data-nav]', container).forEach(function (btn) {
        // ★ 这里之前是 if (btn.disabled) return;
        // 为了绝对防呆，我们改成检查是否包含 disabled 类名或属性
        if (btn.hasAttribute('disabled') || btn.classList.contains('disabled')) return;
        
        btn.addEventListener('click', function () {
          if (typeof onNav === 'function') onNav(btn.getAttribute('data-nav'));
        });
      });
    }
  };

  /* ==========================================================
   * 九、HK 业务工具（暂留在此，建议未来抽离为 hk-utils.js）
   * ========================================================== */
  var CURRENCY_CN = { 'USD': '美元', 'EUR': '欧元', 'JPY': '日元', 'CHF': '瑞郎', 'GBP': '英镑', 'CAD': '加元', 'AUD': '澳元', 'SGD': '新元', 'CNH': '人民币', 'HKD': '港元' };

  App.hkUtils = {
    rates: function () {
      var live = (App.fx && typeof App.fx.rates === 'function') ? App.fx.rates() : {};
      var out = {};
      var fallback = App.constants.FALLBACK_RATES;
      Object.keys(fallback).forEach(function (code) {
        var v = live[code];
        out[code] = (typeof v === 'number' && v > 0) ? v : fallback[code];
      });
      out.HKD = 1; return out;
    },
    toHKD: function (amount, ccy, rates) {
      var r = rates || App.hkUtils.rates();
      var rate = (ccy === 'HKD') ? 1 : (r[ccy] || App.constants.FALLBACK_RATES[ccy] || 1);
      return (Number(amount) || 0) * rate;
    },
    effectiveValue: function (f) {
      var v = Number(f && f.value) || 0;
      if (v === 0 && f && Number(f.cost) !== 0) { v = Number(f.cost) || 0; }
      return v;
    },
    ccyLabel: function (code) {
      var lang = (App.i18n && typeof App.i18n.lang === 'function') ? App.i18n.lang() : 'zh';
      if (lang === 'en') return code;
      return CURRENCY_CN[code] || code;
    },
    fmtAxisNum: function (v, decimals) {
      if (v === 0) return '0';
      var d = (decimals == null) ? 0 : decimals;
      var lang = (App.i18n && typeof App.i18n.lang === 'function') ? App.i18n.lang() : 'zh';
      var a = Math.abs(v); var sign = v < 0 ? '-' : '';
      if (lang === 'en') {
        if (a >= 1e9) return sign + (a / 1e9).toFixed(d) + 'B';
        if (a >= 1e6) return sign + (a / 1e6).toFixed(d) + 'M';
        if (a >= 1e3) return sign + (a / 1e3).toFixed(d) + 'k';
        return String(v);
      }
      if (a >= 1e8) return sign + (a / 1e8).toFixed(d) + '亿';
      if (a >= 1e4) return sign + (a / 1e4).toFixed(d) + '万';
      if (a >= 1e3) return sign + (a / 1e3).toFixed(d) + 'k';
      return String(v);
    },
    cashPool: function (holder) {
      var acc = (App.hkData && App.hkData.accountSummary) || {};
      var key = Object.keys(acc).filter(function (k) {
        return k.toLowerCase() === String(holder).toLowerCase();
      })[0];
      var a = key ? acc[key] : {};
      return (Number(a.hkdBalance) || 0) + (Number(a.foreignBalance) || 0);
    },
    holderOf: function (f) { return String((f && f.holder) || 'unknown').toLowerCase(); },
    typeOf: function (f) {
      if (!f) return undefined;
      var map = (App.hkData && App.hkData.dividendTypeMap) || {};
      var key = (App.hkData && typeof App.hkData.tplKey === 'function') ? App.hkData.tplKey(f.id, f.holder) : (String(f.id) + '@' + String(f.holder || 'unknown'));
      return map[key];
    },
    escapeHolder: function (holder) {
      return App.utils.escapeHTML(String(holder == null ? '' : holder).toUpperCase());
    },
    /* 修复：同步 aria-hidden，精准配对解锁 */
    closeModal: function () {
      var ids = ['hkModalOverlay', 'imgModal'];
      ids.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.classList.contains('open')) {
          el.classList.remove('open');
          el.setAttribute('aria-hidden', 'true');
          App.utils.unlockScroll();
        }
      });
    },
    openExampleImage: function () {
      var m = document.getElementById('imgModal');
      if (!m) return;
      m.classList.add('open');
      m.setAttribute('aria-hidden', 'false');
      App.utils.lockScroll();
    }
  };

  /* ==========================================================
   * 十、自测
   * ========================================================== */
  App.selfTestCore = function () {
    var fail = [];
    var u = App.utils;
    var R = App.constants.FALLBACK_RATES;

    if (u.formatNumber(1234.56) !== '1,234.56') fail.push('formatNumber(1234.56)');
    if (u.formatNumber(0) !== '0.00') fail.push('formatNumber(0)');
    if (u.formatNumber(1000000) !== '1,000,000.00') fail.push('formatNumber(1000000)');
    if (u.formatNumber(null) !== '0') fail.push('formatNumber(null)');
    if (u.formatNumber(-1234.5) !== '-1,234.50') fail.push('formatNumber(-1234.5)');
    if (u.escapeHTML('<b>') !== '&lt;b&gt;') fail.push('escapeHTML');
    if (R.USD !== 7.8470) fail.push('FALLBACK_RATES.USD');
    if (R.CNH !== 1.1635) fail.push('FALLBACK_RATES.CNH');
    if (R.HKD !== 1.0000) fail.push('FALLBACK_RATES.HKD');
    if (App.constants.DEFAULT_CNY_HKD !== 1.1694) fail.push('DEFAULT_CNY_HKD');
    if (!App.a11y) fail.push('App.a11y');
    if (App.a11y && typeof App.a11y.trapFocus !== 'function') fail.push('App.a11y.trapFocus');
    if (App.a11y && typeof App.a11y.labelChart !== 'function') fail.push('App.a11y.labelChart');
    if (typeof u.isEmpty !== 'function') fail.push('App.utils.isEmpty');
    if (!u.isEmpty('')) fail.push('isEmpty("")');
    if (!u.isEmpty(null)) fail.push('isEmpty(null)');
    if (u.isEmpty(0)) fail.push('isEmpty(0)');
    if (u.isEmpty('x')) fail.push('isEmpty("x")');
    if (typeof u.clamp !== 'function') fail.push('App.utils.clamp');
    if (u.clamp(5, 1, 3) !== 3) fail.push('clamp(5,1,3)');
    if (u.clamp(-5, 1, 3) !== 1) fail.push('clamp(-5,1,3)');
    if (u.clamp(2, 1, 3) !== 2) fail.push('clamp(2,1,3)');
    if (u.padZero(7, 2) !== '07') fail.push('padZero(7,2)');
    if (u.padZero(123, 5) !== '00123') fail.push('padZero(123,5)');
    if (!App.hkUtils) fail.push('App.hkUtils');

    if (App.hkUtils) {
      var hu = App.hkUtils;
      if (hu.toHKD(100, 'HKD', {}) !== 100) fail.push('toHKD(100,"HKD")');
      var v1 = hu.toHKD(100, 'USD', {});
      if (Math.abs(v1 - 784.70) > 0.01) fail.push('toHKD(100,"USD")');
      if (hu.effectiveValue({ value: 0, cost: 100 }) !== 100) fail.push('effectiveValue(0,100)');
      if (hu.effectiveValue({ value: 200, cost: 100 }) !== 200) fail.push('effectiveValue(200,100)');
      var lang = (App.i18n && typeof App.i18n.lang === 'function') ? App.i18n.lang() : 'zh';
      if (lang === 'zh') {
        if (hu.ccyLabel('USD') !== '美元') fail.push('ccyLabel("USD")');
        if (hu.fmtAxisNum(12345, 0).indexOf('万') === -1) fail.push('fmtAxisNum(12345)');
        if (hu.fmtAxisNum(123456789, 0).indexOf('亿') === -1) fail.push('fmtAxisNum(123456789)');
      }
      if (hu.holderOf({ holder: 'HUANG' }) !== 'huang') fail.push('holderOf');
      if (hu.escapeHolder('<script>').indexOf('&lt;') === -1) fail.push('escapeHolder');
    }
    if (typeof App.storage.migrate !== 'function') fail.push('App.storage.migrate');
    return fail;
  };

  console.log('%c[core] ✓ 杨晟琦的核心工具箱全站第四代组件已就绪 · 2026年10月29日核心基建加载完毕', 'color:#30d158;font-weight:bold');
})(window.App = window.App || {});