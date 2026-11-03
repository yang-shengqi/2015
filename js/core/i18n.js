/* ============================================================
 * i18n.js —— 系统层：全站语言统一切换控制器
 * 职责：唯一监听点击，写入 localStorage，强制刷新。
 * ============================================================ */
(function () {
  'use strict';
  var STORE_KEY = 'co-lang';

  // 切换语言
  function toggleLang() {
    var current = localStorage.getItem(STORE_KEY) || 'zh';
    var next = current === 'zh' ? 'en' : 'zh';
    localStorage.setItem(STORE_KEY, next);
    window.location.reload(); // 统一暴力刷新，让各页面词典重新渲染
  }

  // 页面加载时接管按钮
  document.addEventListener('DOMContentLoaded', function () {
    // 1. 先统一 HTML 语言属性（给 CSS 的 :after 提供依据）
    var currentLang = localStorage.getItem(STORE_KEY) || 'zh';
    document.documentElement.lang = currentLang === 'en' ? 'en' : 'zh-CN';
    document.documentElement.setAttribute('data-lang', currentLang);

    // 2. 清理并绑定点击
    var langBtn = document.getElementById('langBtn');
    if (langBtn) {
      // 克隆替换，强行干掉词典里之前绑定的点击事件
      var cleanBtn = langBtn.cloneNode(true);
      langBtn.parentNode.replaceChild(cleanBtn, langBtn);

      // 绑定唯一的统一切换指令
      cleanBtn.addEventListener('click', function (e) {
        e.preventDefault();
        toggleLang();
      });
    }
  });
})();