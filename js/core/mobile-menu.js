/* ============================================================
 * mobile-menu.js —— 移动端抽屉菜单（只含导航锚点）
 * ------------------------------------------------------------
 * 依赖：core.js（App.$ / App.$$ / App.a11y）
 * 只在 ≤1024px 生效（三点按钮由 CSS 控制显隐）
 *
 * 本版修改：
 *   ★ 接入 App.a11y.trapFocus —— 打开时焦点入内、Tab 循环、
 *     Esc 关闭、关闭后归还三点按钮
 *   ★ 删除手写平滑滚动，改用原生 scrollIntoView（依赖 CSS scroll-margin-top）
 *   ★ Esc 兜底统一走 App.a11y.closeOnEsc
 * ============================================================ */
(function (App) {
  'use strict';

  var releaseFocus = null;

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  ready(function () {
    var menu   = document.getElementById('mobileMenu');
    var toggle = document.getElementById('menuToggle');
    if (!menu || !toggle) {
      console.warn('[mobile-menu] 找不到 #mobileMenu 或 #menuToggle');
      return;
    }

    function open() {
      menu.classList.add('on');
      menu.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('mm-locked');

      var panel = menu.querySelector('.mobile-menu__panel');
      if (releaseFocus) releaseFocus();
      releaseFocus = App.a11y.trapFocus(panel || menu, {
        initialFocus: '.mobile-menu__nav button',
        returnFocus: toggle,
        onEscape: close
      });
    }

    function close() {
      menu.classList.remove('on');
      menu.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('mm-locked');
      if (releaseFocus) { releaseFocus(); releaseFocus = null; }
    }

    function isOpen() { return menu.classList.contains('on'); }

    /* 三点按钮：开关 */
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      isOpen() ? close() : open();
    });

    /* 遮罩 & 关闭按钮 */
    App.$$('[data-mm-close]', menu).forEach(function (el) {
      el.addEventListener('click', close);
    });

    /* Esc 兜底 */
    App.a11y.closeOnEsc(function () {
      if (isOpen()) close();
    });

    /* 导航锚点：滚动 + 关闭抽屉 */
    App.$$('.mobile-menu__nav [data-scroll]', menu).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-scroll');
        var el = document.getElementById(id);
        if (!el) return;

        /* 直接使用原生平滑滚动（依靠 CSS 的 scroll-margin-top 处理偏移） */
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });

        App.$$('.mobile-menu__nav [data-scroll]', menu).forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');

        close();
      });
    });
  });

})(window.App = window.App || {});