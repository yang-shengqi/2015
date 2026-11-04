/* ============================================================
 * color-sticky-controls.js —— 控制行底部悬浮条
 * 原条完全不动；滚出视口后，把克隆体注入底部悬浮胶囊条
 * ============================================================ */
(function (global) {
  'use strict';

  function init() {
    if (document.querySelector('.co-sticky-bar')) return;

    var bar = document.querySelector('#s-gen .co-controls');
    if (!bar) return;

    /* ---------- 1. 克隆并清理 ---------- */
    var clone = bar.cloneNode(true);

    // 去掉所有 id，避免与原条重复
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach(function (el) {
      el.removeAttribute('id');
    });

    // 给面板打上区分标记（利用吸管按钮区分 HSL 和 LCH）
    clone.querySelectorAll('.co-cp-panel').forEach(function (p) {
      if (p.querySelector('.cp-eyedropper')) p.classList.add('co-hsl-panel');
      else p.classList.add('co-lch-panel');
    });

    // 色库分段补 class（原样式依赖 #libs）
    var libInput = clone.querySelector('input[name="lib"]');
    if (libInput) {
      var seg = libInput.closest('.co-seg');
      if (seg) seg.classList.add('co-libs');
    }

    // 同组 radio / checkbox 改名，避免与原条互斥
    clone.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(function (el) {
      if (el.name) el.name = el.name + '_sticky';
    });

    /* ---------- 2. 注入悬浮容器 ---------- */
    var wrap = document.createElement('div');
    wrap.className = 'co-sticky-bar';
    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-label', '主色与配色规则快捷栏');
    wrap.appendChild(clone);
    document.body.appendChild(wrap);

    /* ---------- 3. 按 DOM 顺序一一配对 ---------- */
    var pairs = [];
    (function build(a, b) {
      pairs.push([a, b]);
      var ca = a.children, cb = b.children;
      var n = Math.min(ca.length, cb.length);
      for (var i = 0; i < n; i++) build(ca[i], cb[i]);
    })(bar, clone);

    var origOf = new Map();
    pairs.forEach(function (p) { origOf.set(p[1], p[0]); });

    /* ---------- 3.5 HSL / LCH 悬浮面板交互 ---------- */
    clone.querySelectorAll('.cp-wrapper').forEach(function (cw) {
      var btns = cw.querySelectorAll('.cp-btn');
      var panels = cw.querySelectorAll('.co-cp-panel');

      btns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var isLch = btn.classList.contains('cp-lch-btn');
          
          // 取消兄弟按钮的 active
          btns.forEach(function (b) { if (b !== btn) b.classList.remove('active'); });

          // 切换对应面板
          panels.forEach(function (p) {
            var targetPanel = isLch ? p.classList.contains('co-lch-panel') : p.classList.contains('co-hsl-panel');
            if (targetPanel) {
              var willShow = !p.classList.contains('show');
              p.classList.toggle('show');
              btn.classList.toggle('active', willShow);
            } else {
              p.classList.remove('show');
            }
          });
        });
      });
    });

    // 点击外部关闭悬浮面板
    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) {
        wrap.querySelectorAll('.co-cp-panel').forEach(function (p) { p.classList.remove('show'); });
        wrap.querySelectorAll('.cp-btn').forEach(function (b) { b.classList.remove('active'); });
      }
    });

    /* ---------- 4. 克隆 → 原：事件转发 ---------- */
    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('button');
      if (!btn || !wrap.contains(btn)) return;
      
      // 悬浮条内的 HSL/LCH 按钮已自行处理逻辑，不转发给原页面
      if (btn.classList.contains('cp-btn')) return;

      var orig = origOf.get(btn);
      if (orig && orig.tagName === 'BUTTON') {
        e.preventDefault();
        orig.click();
      }
    });

    wrap.addEventListener('input', function (e) {
      var t = e.target;
      if (!t || !t.matches) return;
      
      // 包含滑块、文本、颜色输入
      if (t.type === 'range' || t.matches('input[type="text"], input[type="color"]')) {
        var orig = origOf.get(t);
        if (orig) {
          orig.value = t.value;
          orig.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    });

    wrap.addEventListener('change', function (e) {
      var t = e.target;
      if (!t || !t.matches) return;
      if (t.matches('input[type="radio"], input[type="checkbox"]')) {
        var orig = origOf.get(t);
        if (orig) {
          orig.checked = t.checked;
          orig.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });

    /* ---------- 5. 原 → 克隆：状态回同步 ---------- */
    function syncState() {
      pairs.forEach(function (p) {
        var o = p[0], c = p[1];
        if (o.tagName === 'INPUT') {
          if (o.type === 'radio' || o.type === 'checkbox') {
            if (c.checked !== o.checked) c.checked = o.checked;
          } else if (c.value !== o.value) {
            c.value = o.value;
          }
        } else if (o.tagName === 'OUTPUT') {
          // 同步滑块旁边的数值文本
          if (c.textContent !== o.textContent) {
            c.textContent = o.textContent;
          }
        }
      });
    }

    /* ---------- 6. 滚动显隐 ---------- */
    var visible = false;
    var syncTimer = 0;
    var rafId = 0;

    function show() {
      if (visible) return;
      wrap.classList.add('is-visible');
      visible = true;
      syncState();
      syncTimer = setInterval(syncState, 150);
    }

    function hide() {
      if (!visible) return;
      wrap.classList.remove('is-visible');
      visible = false;
      if (syncTimer) {
        clearInterval(syncTimer);
        syncTimer = 0;
      }
    }

    function check() {
      var r = bar.getBoundingClientRect();
      if (r.bottom <= 0) show();
      else hide();
    }

    function onScroll() {
      if (rafId) return;
      rafId = requestAnimationFrame(function () {
        rafId = 0;
        check();
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    check();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  global.CO_StickyControls = { loaded: true };

})(window);