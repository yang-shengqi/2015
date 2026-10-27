/* ============================================================
 * side-nav.js —— 侧边悬浮导航（第三代标准 · 分页增强版）
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
      href: "blind-spot-diagnosis.html",
      tip: "思维工具 · 人类思维盲区在线诊断工具",
      icon: '<polygon points="12 3 19.8 7.5 19.8 16.5 12 21 4.2 16.5 4.2 7.5" /><circle cx="12" cy="12" r="4.5" stroke-dasharray="2 2" /><path d="M12 12 L19.8 7.5" /><circle cx="19.8" cy="7.5" r="2" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />'
    },
    {
      href: "civilization-level-scorer.html",
      tip: "思维工具 · 文明等级评分器",
      icon: '<circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" stroke-dasharray="2 2" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" />'
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
    },
    {
      href: "color.html",
      tip: "色彩工具 · 图片取色与配色生成",
      icon: '<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/><circle cx="7.5" cy="10.5" r="1.5"/><circle cx="12" cy="7.5" r="1.5"/><circle cx="16.5" cy="10.5" r="1.5"/>'
    },
    {
      href: "html-encrypt.html",
      tip: "加密工具 · 给静态 HTML 加一道密码锁",
      // ★ 换上了刚画的锁图标
      icon: '<rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" /><path d="M12 16.5v2" />'
    }
  ];

  var PAGE_SIZE = 6; // 每组最多显示 6 个图标
  var currentPage = 0;

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

  function initPage() {
    for (var i = 0; i < NAV_ITEMS.length; i++) {
      if (isCurrent(NAV_ITEMS[i].href)) {
        currentPage = Math.floor(i / PAGE_SIZE);
        break;
      }
    }
  }

  function updatePagination() {
    var totalPages = Math.ceil(NAV_ITEMS.length / PAGE_SIZE);
    var start = currentPage * PAGE_SIZE;
    var end = Math.min(start + PAGE_SIZE, NAV_ITEMS.length);

    // 控制导航项显示
    App.$$('.side-float-nav .nav-item').forEach(function (el) {
      var i = parseInt(el.getAttribute('data-index'), 10);
      var visible = (i >= start && i < end);
      el.classList.toggle('is-hidden', !visible);
    });

    var prevBtn = App.$('.side-float-nav [data-action="nav-prev"]');
    var nextBtn = App.$('.side-float-nav [data-action="nav-next"]');

    // 控制翻页按钮显示
    if (prevBtn) prevBtn.classList.toggle('is-hidden', currentPage === 0);
    if (nextBtn) nextBtn.classList.toggle('is-hidden', currentPage >= totalPages - 1);
  }

  function render() {
    initPage();
    var cur = currentFile();
    
    var html = '<nav class="side-float-nav" aria-label="快捷导航">' +
      '<div class="sfn-item nav-control is-hidden" data-action="nav-prev">' +
        '<button type="button" class="sfn-btn" data-tip="上一组" aria-label="上一组">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>' +
        '</button>' +
      '</div>';

    // 渲染所有项，通过 is-hidden 控制显隐，保证 DOM 不重绘
    NAV_ITEMS.forEach(function (item, index) {
      var on = isCurrent(item.href);
      var safeTip = App.utils.escapeHTML(item.tip);
      html += '<div class="sfn-item nav-item" data-index="' + index + '">' +
        '<a class="sfn-btn' + (on ? ' active' : '') + '" href="' + item.href + '"' +
        ' data-tip="' + safeTip + '" aria-label="' + safeTip + '"' +
        (on ? ' aria-current="page"' : '') + '>' +
        '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
        item.icon + '</svg></a></div>';
    });

    html += '<div class="sfn-item nav-control is-hidden" data-action="nav-next">' +
        '<button type="button" class="sfn-btn" data-tip="下一组" aria-label="下一组">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>' +
        '</button>' +
      '</div>' +
    '</nav>';

    var mount = App.$('[data-nav-mount]') || document.body;
    mount.insertAdjacentHTML('beforeend', html);

    updatePagination();
    
    // 绑定翻页事件
    var nav = App.$('.side-float-nav');
    if (nav) {
      nav.addEventListener('click', function(e) {
        var prev = e.target.closest('[data-action="nav-prev"]');
        if (prev) { currentPage--; updatePagination(); return; }
        var next = e.target.closest('[data-action="nav-next"]');
        if (next) { currentPage++; updatePagination(); return; }
      });
    }
  }

  function syncHighlight() {
    var file = currentFile();
    App.$$('.side-float-nav .sfn-btn').forEach(function (link) {
      if (link.closest('[data-action]')) return; // 忽略翻页按钮
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
    window.addEventListener("popstate", syncHighlight);
  });

})(window.App = window.App || {});