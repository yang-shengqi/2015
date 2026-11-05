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

    clone.querySelectorAll('[data-tip]').forEach(function (el) {
      var tip = el.getAttribute('data-tip');
      if (tip) el.setAttribute('data-global-tip', tip);
      el.removeAttribute('data-tip');
    });
    
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

    /* ---------- 2. 核心修复：先建立映射，再把面板拔离 ---------- */
    // 必须在 p.remove() 之前跑完配对，这样面板里的 range 才能被登记进 origOf
    var pairs = [];
    (function build(a, b) {
      pairs.push([a, b]);
      var ca = a.children, cb = b.children;
      var n = Math.min(ca.length, cb.length);
      for (var i = 0; i < n; i++) build(ca[i], cb[i]);
    })(bar, clone);

    var origOf = new Map();
    pairs.forEach(function (p) { origOf.set(p[1], p[0]); });

    // 将取色面板从克隆体中抽离
    var cpPanels = [];
    clone.querySelectorAll('.co-cp-panel').forEach(function (p) {
      p.style.position = 'fixed';
      p.style.zIndex = '99999';
      if (p.querySelector('.cp-eyedropper')) p.classList.add('co-hsl-panel');
      else p.classList.add('co-lch-panel');
      
      cpPanels.push(p);
      p.remove(); 
    });

    /* ---------- 3. 注入悬浮容器 ---------- */
    var wrap = document.createElement('div');
    wrap.className = 'co-sticky-bar';
    wrap.setAttribute('role', 'region');
    wrap.appendChild(clone);
    document.body.appendChild(wrap);

    // 面板挂载到 body
    cpPanels.forEach(function(p) {
      document.body.appendChild(p);
    });

    /* ---------- 4. 全局 Tooltip ---------- */
    var globalTip = document.createElement('div');
    globalTip.style.cssText = `
      position: fixed; z-index: 2147483647;
      background: var(--nm-bg, #e0e5ec); color: var(--nm-text-2, #666);
      font-size: 11px; font-family: var(--nm-font, sans-serif);
      padding: 6px 10px; border-radius: var(--nm-r-sm, 6px);
      box-shadow: var(--nm-out-sm, 0 2px 8px rgba(0,0,0,.1));
      white-space: nowrap; pointer-events: none;
      opacity: 0; visibility: hidden;
      transform: translate(-50%, -100%) translateY(2px);
      transition: opacity .2s ease, transform .2s ease, visibility .2s;
    `;
    document.body.appendChild(globalTip);

    function hideTip() {
      globalTip.style.opacity = '0';
      globalTip.style.visibility = 'hidden';
      globalTip.style.transform = 'translate(-50%, -100%) translateY(2px)';
    }

    wrap.addEventListener('mouseover', function (e) {
      var target = e.target.closest('label, [data-global-tip]');
      if (target) {
        var tipText = target.getAttribute('data-global-tip');
        if (!tipText) {
          var orig = origOf.get(target);
          if (orig) tipText = orig.getAttribute('data-tip');
        }

        if (tipText) {
          globalTip.textContent = tipText;
          var rect = target.getBoundingClientRect();
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

    /* ---------- 5. HSL / LCH 面板按钮交互 ---------- */
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
                var rect = btn.getBoundingClientRect();
                p.style.left = (rect.left + rect.width / 2) + 'px';
                p.style.top = (rect.top - 10) + 'px';
                p.style.transform = 'translate(-50%, -100%)'; 
                
                p.classList.add('show');
                btn.classList.add('active');
                
                // 核心：打开悬浮面板时，强制从原生面板同步一次数值显示
                var origPanel = origOf.get(p);
                if (origPanel) {
                   var origInputs = origPanel.querySelectorAll('input[type="range"]');
                   var cloneInputs = p.querySelectorAll('input[type="range"]');
                   for (var i = 0; i < origInputs.length; i++) {
                     if (cloneInputs[i]) {
                       cloneInputs[i].value = origInputs[i].value;
                       var origOut = origInputs[i].nextElementSibling;
                       var cloneOut = cloneInputs[i].nextElementSibling;
                       if (cloneOut && origOut) cloneOut.textContent = origOut.textContent;
                     }
                   }
                }
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
      // 核心修复：如果点击的是面板内部，不要隐藏面板（原版会误触隐藏）
      if (!wrap.contains(e.target) && !(e.target.closest && e.target.closest('.co-cp-panel'))) {
        cpPanels.forEach(function (p) { p.classList.remove('show'); });
        clone.querySelectorAll('.cp-btn').forEach(function (b) { b.classList.remove('active'); });
      }
    });

    /* ---------- 6. 事件转发（针对悬浮栏内的按钮、滑块等） ---------- */
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

    /* ---------- 7. 悬浮面板内部交互逻辑修复 ---------- */
    var ci = document.getElementById('ci');

    cpPanels.forEach(function(panel) {
      // 1. 滑块输入事件
      panel.addEventListener('input', function(e) {
        if (e.target.type === 'range') {
          var orig = origOf.get(e.target);
          if (orig) {
            orig.value = e.target.value;
            // 触发原生面板的 input 事件（这会触发颜色的重新计算）
            orig.dispatchEvent(new Event('input', { bubbles: true }));
            
            // 核心：从原面板拉取已经格式化好的带单位文本，赋给悬浮面板
            var cloneOut = e.target.nextElementSibling;
            var origOut = orig.nextElementSibling;
            if (cloneOut && origOut) {
              cloneOut.textContent = origOut.textContent;
            }
          }
        }
      });

      // 2. 吸管按钮转发
      var cloneEyedropper = panel.querySelector('.cp-eyedropper');
      if (cloneEyedropper) {
        if (!global.EyeDropper) {
          cloneEyedropper.style.display = 'none';
        } else {
          cloneEyedropper.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            new global.EyeDropper().open().then(res => {
              ci.value = res.sRGBHex.toLowerCase();
              ci.dispatchEvent(new Event('input', { bubbles: true }));
              
              // 取色后自动关闭悬浮面板
              panel.classList.remove('show');
              var btns = wrap.querySelectorAll('.cp-btn');
              btns.forEach(function(b) {
                if (!b.classList.contains('cp-lch-btn')) b.classList.remove('active');
              });
            }).catch(() => {});
          });
        }
      }
    });

    // 3. 全局颜色变化监听（比如主面板选色、吸管取色时，悬浮面板也要动）
    if (ci) {
      var lastCiVal = ci.value;
      setInterval(function() {
        if (ci.value !== lastCiVal) {
          lastCiVal = ci.value;
          cpPanels.forEach(function(panel) {
            if (!panel.classList.contains('show')) return;
            
            var origPanel = origOf.get(panel);
            if (origPanel) {
              var origInputs = origPanel.querySelectorAll('input[type="range"]');
              var cloneInputs = panel.querySelectorAll('input[type="range"]');
              for (var i = 0; i < origInputs.length; i++) {
                if (cloneInputs[i]) {
                  cloneInputs[i].value = origInputs[i].value;
                  var origOut = origInputs[i].nextElementSibling;
                  var cloneOut = cloneInputs[i].nextElementSibling;
                  if (cloneOut && origOut) {
                    cloneOut.textContent = origOut.textContent;
                  }
                }
              }
            }
          });
        }
      }, 100);
    }

    /* ---------- 8. 双向同步 ---------- */
    function syncState() {
      pairs.forEach(function (p) {
        var o = p[0], c = p[1];
        
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

    /* ---------- 9. 滚动显隐 ---------- */
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