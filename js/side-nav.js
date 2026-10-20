/* ============================================================
 * side-nav.js —— 侧边悬浮导航（第三代标准）
 * ============================================================ */
(function (App) {
  'use strict';

  var NAV_ITEMS = [
    {
      href: "index.html",
      tip: "进入首页 · 核心工具箱",
      icon: '<rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />'
    },
    {
      href: "the-global-wealth-bible.html",
      tip: "财富宝典 · 乱世生存与财富自由宝典",
      icon: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /><path d="M12 7v14" />'
    },
    {
      href: "life-survival-strategy-letter.html",
      tip: "家族传承 · 后代们的人生战略方案",
      icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />'
    },
    {
      href: "cn-account-dashboard.html",
      tip: "量化工具 · 通达信量化交易系统",
      icon: '<rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01" /><path d="M6 13h2M10 13h8" />'
    },
    {
      href: "wjp-rule-of-Law-Index-map.html",
      tip: "法制地图 · 世界正义工程（WJP）法治指数地图",
      icon: '<circle cx="12" cy="12" r="10" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="4.5" ry="10" stroke-width="1.5"/><path d="M2 12h20" stroke-width="1.5"/><path d="M4.5 7.5h15" stroke-width="1.5"/><path d="M4.5 16.5h15" stroke-width="1.5"/>'
    },
    {
      href: "economic-data-diagnostics.html",
      tip: "经济检验 · 中国经济趋势真实性检验工具",
      icon: '<rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10l3 2-3 2" /><path d="M13 14h4" />'
    },
    {
      href: "hk-account-dashboard.html",
      tip: "投资组合 · 全球全天候永久投资组合仪表盘",
      icon: '<path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />'
    },
    {
      href: "us-account-dashboard.html",
      tip: "美国市场 · Charles Schwab 仪表盘",
      icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12h6M12 9v6" />'
    }
  ];

  function currentFile() {
    var name = window.location.pathname.split("/").pop();
    return name || "index.html";
  }

  function isCurrent(href) {
    try {
      var target = new URL(href, window.location.href);
      var targetFile = target.pathname.split("/").pop() || "index.html";
      return targetFile === currentFile();
    } catch (e) {
      return href === currentFile();
    }
  }

  function render() {
    var cur = currentFile();
    var html = '<nav class="side-float-nav" aria-label="快捷导航">';
    NAV_ITEMS.forEach(function (item) {
      var on = isCurrent(item.href);
      var safeTip = App.utils.escapeHTML(item.tip);
      html += '<div class="sfn-item">' +
        '<a class="sfn-btn' + (on ? ' active' : '') + '" href="' + item.href + '"' +
        ' data-tip="' + safeTip + '" aria-label="' + safeTip + '"' +
        (on ? ' aria-current="page"' : '') + '>' +
        '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
        item.icon + '</svg></a></div>';
    });
    html += '</nav>';

    var mount = App.$('[data-nav-mount]') || document.body;
    mount.insertAdjacentHTML(mount === document.body ? 'afterbegin' : 'beforeend', html);
  }

  function syncHighlight() {
    var file = currentFile();
    App.$$('.side-float-nav .sfn-btn').forEach(function (link) {
      try {
        var target = new URL(link.getAttribute("href"), window.location.href).pathname.split("/").pop() || "index.html";
        var on = target === file;
        link.classList.toggle("active", on);
        if (on) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      } catch (e) {}
    });
  }

  App.utils.ready(function () {
    render();
    // 仅在 SPA 或 pushState 场景下生效，常规整页跳转自然无需此段，但保留防报错
    window.addEventListener("popstate", syncHighlight);
  });

})(window.App = window.App || {});