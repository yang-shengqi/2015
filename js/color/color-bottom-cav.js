/* ============================================================
 * color-sticky-controls.js —— 控制行底部悬浮条 (终极脱壳版)
 * ============================================================ */
(function (global) {
  'use strict';

  function init() {
    if (document.querySelector('.co-sticky-bar')) return;

    var bar = document.querySelector('#s-gen .co-controls');
    if (!bar) return;

    /* ---------- 1. 克隆并彻底清理原生痕迹 ---------- */
    var clone = bar.cloneNode(true);

    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach(function (el) {
      el.removeAttribute('id');
    });

    // 核心修复 1：剥离所有 data-tip，换成 data-global-tip，彻底干掉原生的 CSS 气泡
    clone.querySelectorAll('[data-tip]').forEach(function (el) {
      var tip = el.getAttribute('data-tip');
      if (tip) el.setAttribute('data-global-tip', tip);
      el.removeAttribute('data-tip');
    });
    // 同时干掉原本可能用于触发伪元素的类名
    clone.querySelectorAll('.co-tip').forEach(function (el) {
      el.classList.remove('co-tip');
    });

    var libInput = clone.querySelector('input[name="lib"]');
    if (libInput) {
      var seg = libInput.closest('.co-seg');
      if (seg) seg.classList.add('co-libs');
    }

    clone.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(function (el) {
      if (el.name) el.name = el.name + '_sticky';
    });

    // 核心修复 2：把取色面板（HSL/LCH）从克隆体中直接抽离
    var cpPanels = [];
    clone.querySelectorAll('.co-cp-panel').forEach(function (p) {
      p.style.position = 'fixed';
      p.style.zIndex = '99999';
      if (p.querySelector('.cp-eyedropper')) p.classList.add('co-hsl-panel');
      else p.classList.add('co-lch-panel');
      
      cpPanels.push(p);
      p.remove(); // 从克隆体中删掉
    });

    /* ---------- 2. 注入悬浮容器 ---------- */
    var wrap = document.createElement('div');
    wrap.className = 'co-sticky-bar';
    wrap.setAttribute('role', 'region');
    wrap.appendChild(clone);
    document.body.appendChild(wrap);

    // 面板挂载到 body
    cpPanels.forEach(function(p) {
      document.body.appendChild(p);
    });

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

    /* ---------- 4. 全局 Tooltip (直接从原元素取数据) ---------- */
    var globalTip = document.createElement('div');
    globalTip.style.cssText = `
      position: fixed; z-index: 2147483647; /* 绝对最高层级 */
      background: var(--nm-bg, #e0e5ec); color: var(--nm-text-2, #666);
      font-size: 11px; font-family: var(--nm-font, sans-serif);
      padding: 6px 10px; border-radius: var(--nm-r-sm, 6px);
      box-shadow: var(--nm-out-sm, 0 2px 8px rgba(0,0,0,.1));
      white-space: nowrap; pointer-events: none;
      opacity: 0; visibility: hidden;
      transform: translate(-50%, -100%) translateY(2px); /* 居中对齐并稍微下移 */
      transition: opacity .2s ease, transform .2s ease, visibility .2s;
    `;
    document.body.appendChild(globalTip);

    function hideTip() {
      globalTip.style.opacity = '0';
      globalTip.style.visibility = 'hidden';
      globalTip.style.transform = 'translate(-50%, -100%) translateY(2px)';
    }

    wrap.addEventListener('mouseover', function (e) {
      // 向上寻找被悬停的 label 或带有提示的元素
      var target = e.target.closest('label, [data-global-tip]');
      if (target) {
        // 核心：优先从克隆体获取，如果没有，去原节点实时抓取！
        var tipText = target.getAttribute('data-global-tip');
        if (!tipText) {
          var orig = origOf.get(target);
          if (orig) tipText = orig.getAttribute('data-tip');
        }

        if (tipText) {
          globalTip.textContent = tipText;
          var rect = target.getBoundingClientRect();
          
          // 悬浮在正上方 8px
          globalTip.style.left = (rect.left + rect.width / 2) + 'px';
          globalTip.style.top = (rect.top - 8) + 'px';
          globalTip.style.opacity = '1';
          globalTip.style.visibility = 'visible';
          globalTip.style.transform = 'translate(-50%, -100%) translateY(0)';
          return;
        }
      }
      hideTip();
    });

    wrap.addEventListener('mouseleave', hideTip);
    window.addEventListener('scroll', hideTip, { passive: true });

    /* ---------- 5. HSL / LCH 面板交互 (已提权到 body) ---------- */
    clone.querySelectorAll('.cp-wrapper').forEach(function (cw) {
      var btns = cw.querySelectorAll('.cp-btn');
      
      btns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var isLch = btn.classList.contains('cp-lch-btn');
          
          btns.forEach(function (b) { if (b !== btn) b.classList.remove('active'); });

          cpPanels.forEach(function (p) {
            var targetPanel = isLch ? p.classList.contains('co-lch-panel') : p.classList.contains('co-hsl-panel');
            if (targetPanel) {
              var willShow = !p.classList.contains('show');
              
              if (willShow) {
                // 计算按钮的屏幕坐标，让面板在按钮正上方悬浮
                var rect = btn.getBoundingClientRect();
                p.style.left = (rect.left + rect.width / 2) + 'px';
                p.style.top = (rect.top - 10) + 'px';
                // 借助 transform 完美定位在按钮上方并居中
                p.style.transform = 'translate(-50%, -100%)'; 
                
                p.classList.add('show');
                btn.classList.add('active');
              } else {
                p.classList.remove('show');
                btn.classList.remove('active');
              }
            } else {
              p.classList.remove('show');
            }
          });
        });
      });
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) {
        cpPanels.forEach(function (p) { p.classList.remove('show'); });
        clone.querySelectorAll('.cp-btn').forEach(function (b) { b.classList.remove('active'); });
      }
    });

    /* ---------- 6. 事件转发 ---------- */
    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('button');
      if (!btn || !wrap.contains(btn) || btn.classList.contains('cp-btn')) return;
      var orig = origOf.get(btn);
      if (orig && orig.tagName === 'BUTTON') {
        e.preventDefault();
        orig.click();
      }
    });

    wrap.addEventListener('input', function (e) {
      var t = e.target;
      if (t && t.matches && (t.type === 'range' || t.matches('input[type="text"], input[type="color"]'))) {
        var orig = origOf.get(t);
        if (orig) {
          orig.value = t.value;
          orig.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    });
    
    cpPanels.forEach(function(panel) {
      panel.addEventListener('input', function(e) {
        if (e.target.type === 'range') {
          var orig = origOf.get(e.target);
          if (orig) {
            orig.value = e.target.value;
            orig.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }
      });
    });

    wrap.addEventListener('change', function (e) {
      var t = e.target;
      if (t && t.matches && t.matches('input[type="radio"], input[type="checkbox"]')) {
        var orig = origOf.get(t);
        if (orig) {
          orig.checked = t.checked;
          orig.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });

    /* ---------- 7. 双向同步 ---------- */
    function syncState() {
      pairs.forEach(function (p) {
        var o = p[0], c = p[1];
        
        // 同步动态更新的提示词
        if (o.hasAttribute('data-tip') && c.getAttribute('data-global-tip') !== o.getAttribute('data-tip')) {
          c.setAttribute('data-global-tip', o.getAttribute('data-tip'));
        }

        if (o.tagName === 'INPUT') {
          if (o.type === 'radio' || o.type === 'checkbox') {
            if (c.checked !== o.checked) c.checked = o.checked;
          } else if (c.value !== o.value) {
            c.value = o.value;
          }
        } else if (o.tagName === 'OUTPUT') {
          if (c.textContent !== o.textContent) {
            c.textContent = o.textContent;
          }
        }
      });
    }

    /* ---------- 8. 滚动显隐 ---------- */
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
      // 隐藏悬浮条时，强制关闭面板
      cpPanels.forEach(function (p) { p.classList.remove('show'); });
      clone.querySelectorAll('.cp-btn').forEach(function (b) { b.classList.remove('active'); });
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