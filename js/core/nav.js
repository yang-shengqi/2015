/* ============================================================
 * nav.js —— 顶栏进度条 + 返回顶部 + 导航下拉交互
 * 第三代：接管全站逻辑，纯手写缓动动画防环境拦截
 * ============================================================ */
(function (App) {
  'use strict';

  // ===== 1. 滚动进度条与返回顶部 =====
  function initScroll() {
    var navProgress = document.getElementById('navProgress');
    var toTop = document.getElementById('toTop');
    var ringFill = document.getElementById('ringFill');

    var r = 21;
    if (ringFill) {
      var rAttr = parseFloat(ringFill.getAttribute('r'));
      if (!isNaN(rAttr)) r = rAttr;
    }
    var CIRC = 2 * Math.PI * r;

    if (ringFill) {
      ringFill.setAttribute('stroke-dasharray', CIRC.toFixed(2));
      ringFill.setAttribute('stroke-dashoffset', CIRC.toFixed(2));
    }

    var ticking = false;

    function update() {
      ticking = false;
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var top = doc.scrollTop;
      var p = max > 0 ? Math.min(1, Math.max(0, top / max)) : 0;

      if (ringFill) {
        ringFill.setAttribute('stroke-dashoffset', (CIRC * (1 - p)).toFixed(2));
      }
      if (navProgress) {
        navProgress.style.width = (p * 100).toFixed(2) + '%';
      }
      if (toTop) {
        toTop.classList.toggle('on', top > 300);
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    if (toTop) {
      toTop.addEventListener('click', function (e) {
        e.preventDefault();
        
        var startY = window.pageYOffset || document.documentElement.scrollTop;
        if (startY === 0) return;

        var startTime = null;
        var duration = 500;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var easeOut = 1 - Math.pow(1 - progress, 3);
          
          window.scrollTo(0, startY * (1 - easeOut));

          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        }
        window.requestAnimationFrame(step);
      });
    }

    update();
  }

  // ===== 2. 导航下拉菜单（互斥展开 + 点击外部关闭） =====
  function initDropdowns() {
    var toggles = document.querySelectorAll('.nav-dropdown-toggle');
    var dropdowns = document.querySelectorAll('.nav-dropdown');
    if (!toggles.length) return;

    // 点击按钮，切换自己的展开状态，并关闭其它的
    toggles.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation(); // 阻止冒泡到 document
        var wrap = this.closest('.nav-dropdown');
        var isOpen = wrap.classList.contains('open');
        
        // 先关闭所有
        dropdowns.forEach(function (d) {
          d.classList.remove('open');
        });
        
        // 如果刚才没开，现在就打开它
        if (!isOpen) {
          wrap.classList.add('open');
        }
      });
    });

    // 点击页面其它空白地方，关闭所有下拉
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-dropdown')) {
        dropdowns.forEach(function (d) {
          d.classList.remove('open');
        });
      }
    });

    // 点击下拉面板里的超链接后，自动关闭面板
    document.querySelectorAll('.nm-select-option').forEach(function (link) {
      link.addEventListener('click', function () {
        dropdowns.forEach(function (d) {
          d.classList.remove('open');
        });
      });
    });
  }

  // 初始化
  App.utils.ready(function () {
    initScroll();
    initDropdowns();
  });

})(window.App = window.App || {});