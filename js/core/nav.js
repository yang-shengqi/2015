/* ============================================================
 * nav.js —— 顶栏进度条 + 返回顶部
 * 第三代：接管全站所有返回顶部逻辑，纯手写缓动动画防环境拦截
 * ============================================================ */
(function (App) {
  'use strict';

  function initScroll() {
    var navProgress = document.getElementById('navProgress');
    var toTop = document.getElementById('toTop');
    var ringFill = document.getElementById('ringFill');

    // 动态读取半径，不写死
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

    // ---------------------------------------------------------
    // 核心修复：纯手工动画，绕过一切系统级限制
    // ---------------------------------------------------------
    if (toTop) {
      toTop.addEventListener('click', function (e) {
        e.preventDefault();
        
        var startY = window.pageYOffset || document.documentElement.scrollTop;
        if (startY === 0) return;

        var startTime = null;
        var duration = 500; // 动画时长 500 毫秒

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          
          // 使用 easeOutCubic 缓动算法，视觉上像平滑滚动
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

  App.utils.ready(function () {
    initScroll();
  });

})(window.App = window.App || {});