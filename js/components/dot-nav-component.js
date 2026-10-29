/*!
 * left-float-nav.js —— 纯血版（JS 绝不碰任何样式）
 */
(function () {
  'use strict';

  var NAV_ITEMS = [
    { href: 'index.html',                       tip: '首页 · 核心工具箱' },
    { href: 'blind-spot-diagnosis.html',        tip: '思维工具 · 思维盲区诊断' },
    { href: 'civilization-level-scorer.html',   tip: '思维工具 · 文明等级评分器' },
    { href: 'the-global-wealth-bible.html',     tip: '财富宝典 · 乱世生存指南' },
    { href: 'life-survival-strategy-letter.html', tip: '家族传承 · 人生战略方案' },
    { href: 'cn-account-dashboard.html',        tip: '量化工具 · 通达信量化系统' },
    { href: 'wjp-rule-of-Law-Index-map.html',   tip: '法制地图 · WJP 法治指数' },
    { href: 'economic-data-diagnostics.html',   tip: '经济检验 · 数据真实性检验' },
    { href: 'hk-account-dashboard.html',        tip: '投资组合 · 全天候组合仪表盘' },
    { href: 'us-account-dashboard.html',        tip: '美国市场 · Schwab 仪表盘' },
    { href: 'color.html',                       tip: '色彩工具 · 图片取色与配色' },
    { href: 'html-encrypt.html',                tip: '加密工具 · HTML 密码锁' }
  ];

  function getCurrentFile() {
    var path = window.location.pathname;
    var file = path.split('/').pop();
    return file || 'index.html';
  }

  function render() {
    if (document.querySelector('.left-float-nav')) return;

    var curFile = decodeURIComponent(getCurrentFile());
    var nav = document.createElement('nav');
    nav.className = 'left-float-nav';

    NAV_ITEMS.forEach(function(item) {
      var isActive = (decodeURIComponent(item.href) === curFile);
      
      var a = document.createElement('a');
      a.className = 'lfn-item' + (isActive ? ' active' : '');
      a.href = item.href;
      
      // 用 data-tip 配合 CSS 的 ::after 生成提示气泡，连 span 都不用建
      a.setAttribute('data-tip', item.tip);

      nav.appendChild(a);
    });

    document.body.appendChild(nav);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();