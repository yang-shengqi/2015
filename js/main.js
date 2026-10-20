/* ============================================================
 * main.js —— 页面入口（必须最后加载）
 * ------------------------------------------------------------
 * 自检 96 项（NAV_ANCHORS 含 s-exec）
 * 本版修改：
 *   ★ 新增 MODULE_HOST 映射 + markFailed()，模块初始化失败时
 *     在对应面板打 .mod-failed 标记，无需开 console 也能看见
 *   ★ 删除第一代遗留的“标题粒子”特效（规范禁止，且使用了废弃变量）
 *   ★ 自检清单清理废弃的 theme / skin / music 元素
 *   ★ 新增侧边悬浮导航检查（checkSideNav / checkSideNavWhenReady）
 *     只校验结构与交互，不依赖具体文案，全站通用
 * ============================================================ */
(function (App) {
  'use strict';

  /* ============================================================
   * 模块 → 宿主容器 映射
   * ============================================================ */
  var MODULE_HOST = {
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

  function markFailed(name, err) {
    var hostId = MODULE_HOST[name];
    if (!hostId) return;

    var host = document.getElementById(hostId);
    if (!host) return;

    var panel = host.closest('.card') || host.closest('section') || host;
    panel.classList.add('mod-failed');
    panel.setAttribute('data-mod-failed', name);
    panel.title = '模块初始化失败：' + name +
                  (err && err.message ? '\n' + err.message : '');
  }

  function safeInit(name) {
    var mod = App[name];
    if (!mod || typeof mod.init !== 'function') {
      console.warn('[main] 模块未就绪：', name);
      markFailed(name, { message: '模块未就绪（App.' + name + ' 不存在或缺少 init）' });
      return;
    }
    try {
      mod.init();
    } catch (e) {
      console.error('[main] 模块初始化失败：', name, e);
      markFailed(name, e);
    }
  }

  function selfCheck() {
    var NAV_ANCHORS = [
      's-home', 's-exec', 's-fx', 's-accounts',
      's-allocation', 's-ppp', 's-dividends', 's-income'
    ];

    var SECTION_ANCHORS = [
      's-rebalance', 's-notice'
    ];

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

    var A11Y = [ 'skipLink' ];

    var REQUIRED = NAV_ANCHORS.concat(SECTION_ANCHORS, COMPONENTS, A11Y);

    var missing = REQUIRED.filter(function (id) {
      return !document.getElementById(id);
    });

    if (missing.length) {
      console.warn(
        '%c[自检] ⚠️ 缺失 ' + missing.length + ' 个关键元素：',
        'color:#ff9f0a;font-weight:bold;font-size:13px'
      );
      console.warn(missing.join('\n'));
      console.warn(
        '%c↑ 上面这些 id 在 HTML 里找不到，' +
        '对应模块会静默失效。请检查 hk-account-dashboard.html。',
        'color:#ff9f0a'
      );
    } else {
      console.log(
        '%c[自检] 关键元素齐全 ✓ (' + REQUIRED.length + ' 项)',
        'color:#30d158;font-weight:bold;font-size:13px'
      );
    }

    var scrollTargets = [];
    App.$$('[data-scroll]').forEach(function (el) {
      var id = el.getAttribute('data-scroll');
      if (id && scrollTargets.indexOf(id) === -1) scrollTargets.push(id);
    });

    var brokenScroll = scrollTargets.filter(function (id) {
      return !document.getElementById(id);
    });
    if (brokenScroll.length) {
      console.warn(
        '%c[自检] ⚠️ 导航 data-scroll 指向不存在的区块：',
        'color:#ff9f0a;font-weight:bold;font-size:13px'
      );
      console.warn(brokenScroll.join('\n'));
    }

    var uncoveredScroll = scrollTargets.filter(function (id) {
      return REQUIRED.indexOf(id) === -1;
    });
    if (uncoveredScroll.length) {
      console.warn(
        '%c[自检] ⚠️ 导航指向的 id 不在自检清单里：',
        'color:#ff9f0a;font-weight:bold;font-size:13px'
      );
      console.warn(uncoveredScroll.join('\n'));
    }

    return {
      missing: missing,
      brokenScroll: brokenScroll,
      uncoveredScroll: uncoveredScroll
    };
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
          r.forEach(function (msg) {
            all.push('[' + key + '] ' + msg);
          });
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
      console.warn(
        '%c[自测] ⚠️ ' + all.length + ' 项不符（共 ' + tested + ' 个模块）：',
        'color:#ff9f0a;font-weight:bold;font-size:13px'
      );
      console.warn(all.join('\n'));
    } else {
      console.log(
        '%c[自测] 全部通过 ✓ (' + tested + ' 个模块：' + modList.join(', ') + ')',
        'color:#30d158;font-weight:bold;font-size:13px'
      );
    }

    return all;
  }

  /* ============================================================
   * 侧边悬浮导航检查
   * ------------------------------------------------------------
   * 只校验结构与交互是否健全，不依赖具体文案：
   *   - 导航是否挂载
   *   - 每项是否具备 data-tip / aria-label / 有效 href
   *   - 是否有重复项
   *   - .active 与 aria-current 是否一致
   *   - 当前页是否恰好高亮一项
   * 导航文案定稿后，可在 side-nav.js 暴露 App.sideNavItems，
   * 这里会自动追加项名核对（缺失即警告）。
   * ============================================================ */
  function checkSideNav() {
    var issues = [];
    var nav = document.querySelector('.side-float-nav');

    if (!nav) {
      issues.push('侧边导航未挂载：.side-float-nav 不存在，检查 side-nav.js 是否已引入且无报错');
      return issues;
    }

    var btns = nav.querySelectorAll('.sfn-btn');
    if (!btns.length) {
      issues.push('导航容器存在但没有任何 .sfn-btn');
      return issues;
    }

    var seen = [];
    Array.prototype.forEach.call(btns, function (btn) {
      var label = btn.getAttribute('aria-label') || '';
      var tip = btn.getAttribute('data-tip') || '';
      var href = btn.getAttribute('href') || '';

      if (!tip) issues.push('按钮缺少 data-tip：' + (label || href || '(无名)'));
      if (!label) issues.push('按钮缺少 aria-label：' + (href || '(无链接)'));
      if (!href || href === '#') issues.push('按钮 href 无效（空或 #）：' + label);

      if (label) {
        if (seen.indexOf(label) !== -1) {
          issues.push('导航项重复：' + label);
        } else {
          seen.push(label);
        }
      }

      var isActive = btn.classList.contains('active');
      var isCurrentAria = btn.getAttribute('aria-current') === 'page';
      if (isActive && !isCurrentAria) {
        issues.push('按钮带 .active 但缺少 aria-current="page"：' + label);
      }

      if (btn.hasAttribute('data-variant') && !label) {
        issues.push('带 data-variant 的按钮缺少 aria-label');
      }
    });

    var activeCount = nav.querySelectorAll('.sfn-btn.active').length;
    if (activeCount === 0) {
      issues.push('当前页面没有任何导航项被高亮，检查 side-nav.js 的 href 与文件名是否对得上');
    } else if (activeCount > 1) {
      issues.push('当前页面有 ' + activeCount + ' 个导航项同时高亮，逻辑异常');
    }

    /* 若导航已暴露项名清单，追加严格的项名核对 */
    var expected = (App && App.sideNavItems) || null;
    if (expected && expected.length) {
      var actual = Array.prototype.map.call(btns, function (b) {
        return b.getAttribute('aria-label');
      });
      expected.forEach(function (name) {
        if (actual.indexOf(name) === -1) {
          issues.push('导航缺少项：' + name);
        }
      });
    }

    if (issues.length) {
      console.warn(
        '%c[自检] ⚠️ 侧边导航 ' + issues.length + ' 项问题：',
        'color:#ff9f0a;font-weight:bold;font-size:13px'
      );
      console.warn(issues.join('\n'));
    } else {
      console.log(
        '%c[自检] 侧边导航正常 ✓ (' + btns.length + ' 项)',
        'color:#30d158;font-weight:bold;font-size:13px'
      );
    }

    return issues;
  }

  /* 等待导航挂载完成再检查，避免 side-nav.js 尚未插入时误报 */
  function checkSideNavWhenReady(retries) {
    retries = retries === undefined ? 10 : retries;

    if (!document.querySelector('.side-float-nav')) {
      if (retries > 0) {
        setTimeout(function () {
          checkSideNavWhenReady(retries - 1);
        }, 100);
      } else {
        console.warn(
          '%c[自检] ⚠️ 侧边导航始终未出现，side-nav.js 可能加载失败或未引入',
          'color:#ff9f0a;font-weight:bold;font-size:13px'
        );
      }
      return;
    }

    checkSideNav();
  }

  App.utils.ready(function () {
    selfCheck();
    runSelfTests();
    checkSideNavWhenReady();

    /* fx 必须最先初始化 */
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