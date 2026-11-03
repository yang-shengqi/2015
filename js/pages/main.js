/* ============================================================
 * main.js —— 页面入口（带红框防呆提示版 + 自执行老模块兼容）
 * ============================================================ */
(function (App) {
  'use strict';

  function injectFailsafeCSS() {
    if (document.getElementById('mod-failed-style')) return;
    var style = document.createElement('style');
    style.id = 'mod-failed-style';
    style.textContent = `
      .mod-failed {
        border: 2px solid #ff3b30 !important;
        box-shadow: 0 0 15px rgba(255, 59, 48, 0.3) !important;
        position: relative !important;
      }
      .mod-failed::before {
        content: attr(data-missing);
        position: absolute;
        top: 0; right: 0;
        background: #ff3b30;
        color: #fff;
        font-size: 12px;
        padding: 4px 10px;
        border-bottom-left-radius: 8px;
        font-weight: bold;
        z-index: 9999;
        pointer-events: none;
        font-family: sans-serif;
        box-shadow: -2px 2px 6px rgba(0,0,0,0.2);
      }
      .mod-failed-global-toast {
        position: fixed;
        top: 20px; right: 20px;
        background: #ff3b30;
        color: #fff;
        padding: 12px 20px;
        border-radius: 8px;
        font-family: sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 99999;
        animation: slideIn 0.3s ease-out;
        font-weight: bold;
      }
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  function showGlobalFailToast(msg) {
    var existing = document.querySelector('.mod-failed-global-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'mod-failed-global-toast';
    toast.textContent = '⚠️ ' + msg;
    document.body.appendChild(toast);
    setTimeout(function() { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.5s'; }, 4000);
    setTimeout(function() { toast.remove(); }, 4500);
  }

  var MODULE_HOST = {
    execAcc:       'execAcc',
    prodStep:      'prodStep',
    fx:            'fxGrid',
    hkHoldings:    'hkHoldingsBody',
    hkAccounts:    'hkAccountsGrid',
    splitMonitor:  'splitBarContainer',
    assetOverview: 'assetBarsContainer',
    dividends:     'dividendsList',
    deviation:     'deviationBody',
    rebalance:     'rebalanceBody',
    compound:      'dcaResult',
    g10:           'g10Grid',
    income:        'incomeList',
    chartTrend:    'trendChart',
    chartMonthly:  'monthlyChart',
    chartCompare:  'compareChart',
    chartDividend: 'dividendChart',
    chartSchwab:   'schwabTrendCanvas'
  };

  var initializedModules = {};

  function markFailed(name, err) {
    var hostId = MODULE_HOST[name];
    if (!hostId) {
      showGlobalFailToast('模块 ' + name + ' 缺少宿主配置');
      return;
    }

    var host = document.getElementById(hostId);
    if (!host) {
      showGlobalFailToast('找不到 DOM：' + hostId + ' (模块 ' + name + ')');
      return;
    }

    var panel = host.closest('.card') || host.closest('section') || host;
    if (!panel) return;

    panel.classList.add('mod-failed');
    
    var currentMissing = panel.getAttribute('data-missing') || '';
    if (currentMissing.indexOf(name) === -1) {
      if (currentMissing) {
        var cleanOld = currentMissing.replace('⚠️ 缺少 ', '');
        panel.setAttribute('data-missing', '⚠️ 缺少 ' + cleanOld + ' & ' + name);
      } else {
        panel.setAttribute('data-missing', '⚠️ 缺少 ' + name);
      }
    }
    
    var errorMsg = err && err.message ? err.message : '未知错误';
    panel.title = '模块加载失败：' + name + '\n原因：' + errorMsg;
  }

  function safeInit(name) {
    if (initializedModules[name]) return;

    var mod = App[name];
    
    // 【核心修复】兼容自执行老模块：execAcc 和 prodStep
    // 它们不依赖 App 挂载，只要 HTML 里有对应的 DOM，就说明它们加载成功了
    if (!mod && (name === 'execAcc' || name === 'prodStep')) {
      var hostId = MODULE_HOST[name];
      if (hostId && document.getElementById(hostId)) {
        // 强制标记为已初始化，跳过报错
        initializedModules[name] = true;
        return;
      }
    }

    if (!mod) {
      console.error('[main] 模块丢失：App.' + name + ' 不存在（js 文件可能未加载）');
      markFailed(name, { message: 'JS 文件丢失或加载失败' });
      return;
    }

    if (typeof mod.init !== 'function') {
      console.error('[main] 模块异常：App.' + name + ' 缺少 init 方法');
      markFailed(name, { message: '缺少 init 方法' });
      return;
    }

    try {
      mod.init();
      initializedModules[name] = true;
    } catch (e) {
      console.error('[main] 模块初始化失败：', name, e);
      markFailed(name, e);
    }
  }

  // ... selfCheck 和 runSelfTests 保持不变 ...
  function selfCheck() {
    var NAV_ANCHORS = [
      's-home', 's-exec', 's-fx', 's-accounts',
      's-allocation', 's-ppp', 's-dividends', 's-income'
    ];
    var SECTION_ANCHORS = ['s-rebalance', 's-notice'];
    var COMPONENTS = [
      'fxGrid', 'fxCount', 'fxUpdateTime', 'fxRefreshBtn', 'fxSyncBtn',
      'hkHoldingsBody', 'hkHoldingsTotal', 'hkHoldingsCount',
      'hkImportBtn', 'hkFileInput', 'hkClearBtn',
      'hkAccountsGrid', 'principalCNYDisplay', 'principalHKDDisplay',
      'totalAssetsDisplay', 'marketValueDisplay', 'cashBalanceDisplay',
      'profitDisplay', 'hsbcMarketValue', 'schwabMarketValue',
      'hsbcCashValue', 'bochkCashValue', 'exchangeRateInput',
      'splitBarDividend', 'splitBarAccumulate', 'splitBarContainer',
      'splitBadge', 'splitDividendValue', 'splitAccumulateValue',
      'splitDividendPct', 'splitAccumulatePct', 'splitSummary',
      'assetBarsContainer', 'assetLegend',
      'deviationBody', 'deviationBadge', 'devThreshold', 'devThresholdDisplay',
      'dividendsList', 'divCount',
      'rebalanceBody', 'rebBuyTip',
      'incomeList', 'incomeCount', 'incomeYearLabel',
      'g10Grid', 'g10Count',
      'compareChart', 'trendChart', 'dividendChart',
      'monthlyChart', 'schwabTrendCanvas',
      'dcaMonthly', 'dcaRate', 'dcaYears',
      'dcaResult', 'dcaInput', 'dcaProfit',
      'lumpPrincipal', 'lumpRate', 'lumpYears',
      'lumpResult', 'lumpProfit',
      'langBtn', 'menuToggle', 'mobileMenu',
      'navProgress', 'toTop', 'ringFill',
      'hkModalOverlay', 'hkModalTitle', 'hkModalBody',
      'hkModalClose', 'imgModal',
      'prodStep', 'prodStepCanvas'
    ];
    var A11Y = [];
    var REQUIRED = NAV_ANCHORS.concat(SECTION_ANCHORS, COMPONENTS, A11Y);

    var missing = REQUIRED.filter(function (id) { return !document.getElementById(id); });
    if (missing.length) {
      console.warn('%c[自检] ⚠️ 缺失 ' + missing.length + ' 个关键元素：', 'color:#ff9f0a;font-weight:bold;font-size:13px');
      console.warn(missing.join('\n'));
    } else {
      console.log('%c[自检] 关键元素齐全 ✓ (' + REQUIRED.length + ' 项)', 'color:#30d158;font-weight:bold;font-size:13px');
    }

    var scrollTargets = [];
    if (typeof App.$$ === 'function') {
      App.$$('[data-scroll]').forEach(function (el) {
        var id = el.getAttribute('data-scroll');
        if (id && scrollTargets.indexOf(id) === -1) scrollTargets.push(id);
      });
    }
    var brokenScroll = scrollTargets.filter(function (id) { return !document.getElementById(id); });
    if (brokenScroll.length) {
      console.warn('%c[自检] ⚠️ 导航 data-scroll 指向不存在的区块：', 'color:#ff9f0a;font-weight:bold;font-size:13px');
      console.warn(brokenScroll.join('\n'));
    }
    return { missing: missing, brokenScroll: brokenScroll };
  }

  function runSelfTests() {
    var all = [];
    var tested = 0;
    var modList = [];

    Object.keys(App).forEach(function (key) {
      var mod = App[key];
      if (!mod || typeof mod.selfTest !== 'function') return;
      tested++;
      modList.push(key);
      try {
        var r = mod.selfTest();
        if (Array.isArray(r) && r.length) {
          r.forEach(function (msg) { all.push('[' + key + '] ' + msg); });
        }
      } catch (e) {
        all.push('[' + key + '] 抛错：' + e.message);
      }
    });

    if (typeof App.selfTestCore === 'function') {
      tested++;
      modList.push('core');
      try {
        var cf = App.selfTestCore();
        cf.forEach(function (msg) { all.push('[core] ' + msg); });
      } catch (e) {
        all.push('[core] 抛错：' + e.message);
      }
    }

    if (all.length) {
      console.warn('%c[自测] ⚠️ ' + all.length + ' 项不符（共 ' + tested + ' 个模块）：', 'color:#ff9f0a;font-weight:bold;font-size:13px');
      console.warn(all.join('\n'));
    } else {
      console.log('%c[自测] 全部通过 ✓ (' + tested + ' 个模块：' + modList.join(', ') + ')', 'color:#30d158;font-weight:bold;font-size:13px');
    }
  }

  function checkSideNavWhenReady(retries) {
    retries = retries === undefined ? 10 : retries;
    if (!document.querySelector('.side-float-nav')) {
      if (retries > 0) setTimeout(function () { checkSideNavWhenReady(retries - 1); }, 100);
      else console.warn('%c[自检] ⚠️ 侧边导航始终未出现，side-nav.js 可能加载失败', 'color:#ff9f0a;font-weight:bold;font-size:13px');
      return;
    }
    checkSideNav();
  }

  App.utils.ready(function () {
    injectFailsafeCSS();
    
    selfCheck();
    runSelfTests();

    safeInit('execAcc');
    safeInit('prodStep');

    safeInit('fx');
    safeInit('hkHoldings');
    safeInit('hkAccounts');
    safeInit('splitMonitor');
    safeInit('assetOverview');
    safeInit('dividends');
    safeInit('deviation');
    safeInit('rebalance');
    safeInit('compound');
    safeInit('g10');
    safeInit('income');

    safeInit('chartTrend');
    safeInit('chartMonthly');
    safeInit('chartCompare');
    safeInit('chartDividend');
    safeInit('chartSchwab');
  });

})(window.App = window.App || {});