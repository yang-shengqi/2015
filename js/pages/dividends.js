/* ============================================================
 * dividends.js —— 分红记录（按持有人分卡，年度分块）
 * ------------------------------------------------------------
 * 数据来源：hkData.dividendSummary[holder][year][ccy]
 * 分页：App.pagination.renderYearPager（core.js）—— 样式走 .page-btn
 * 复合主键：编号@持有人
 *
 * 本版修改：
 *   ★ 年份分页统一为系统层 ‹ 2026 2025 2024 2023 2022 ›
 *   ★ 保持外层 ds-grid 闭合正确，防止分页被挤压变形
 * ============================================================ */
(function (App) {
  'use strict';

  var TEN_CURRENCIES = ['USD', 'EUR', 'JPY', 'CHF', 'GBP', 'CAD', 'AUD', 'SGD', 'CNH', 'HKD'];

  var YPER  = 5;    // 每组年份数
  var YEAR  = '';   // 当前选中哪一年
  var YPAGE = 0;    // 当前在第几组

  function getHolderCurrencyValue(holder, ccy, rates) {
    var holdings = App.hkData.holdings;
    var total = 0;

    holdings.forEach(function (f) {
      if ((f.holder || '').toLowerCase() !== holder.toLowerCase()) return;
      if (f.currency !== ccy) return;
      if (App.hkUtils.typeOf(f) !== '分红') return;

      total += App.hkUtils.toHKD(App.hkUtils.effectiveValue(f), f.currency, rates);
    });

    return total;
  }

  function getHolderTotalValue(holder, rates) {
    var holdings = App.hkData.holdings;
    var total = 0;

    holdings.forEach(function (f) {
      if ((f.holder || '').toLowerCase() !== holder.toLowerCase()) return;
      if (App.hkUtils.typeOf(f) !== '分红') return;

      total += App.hkUtils.toHKD(App.hkUtils.effectiveValue(f), f.currency, rates);
    });

    return total;
  }

  function render() {
    var container = App.$('#dividendsList');
    var counter = App.$('#divCount');
    if (!container) return;

    var summary = App.hkData.dividendSummary || {};
    var rates = App.hkUtils.rates();
    var holders = Object.keys(summary);

    /* ---------- 1. 没数据 ---------- */
    if (!holders.length) {
      if (counter) counter.textContent = '0 条';
      container.innerHTML = '<div class="empty-hint">' +
        App.i18n.t('div.empty', '暂无分红记录，请导入 Excel') + '</div>';
      return;
    }

    /* ---------- 2. 收集所有年份（降序） ---------- */
    var allYearsSet = {};
    holders.forEach(function (h) {
      Object.keys(summary[h]).forEach(function (y) { allYearsSet[y] = 1; });
    });
    var allYears = Object.keys(allYearsSet).sort(function (a, b) {
      return Number(b) - Number(a);
    });

    /* ---------- 3. 当前年份兜底：默认最新年 ---------- */
    if (allYears.indexOf(YEAR) === -1) YEAR = allYears[0];

    /* ---------- 4. 计数文案 ---------- */
    if (counter) counter.textContent = YEAR + ' 年';

    /* ---------- 5. 渲染持有人卡 ---------- */
    var html = '<div class="ds-grid">';

    holders.sort().forEach(function (holder) {
      var data = summary[holder] || {};
      var holderYears = Object.keys(data).sort(function (a, b) {
        return Number(b) - Number(a);
      });

      var pageHolderYears = holderYears.filter(function (y) { return y === YEAR; });

      var safeHolderAttr = App.utils.escapeHTML(holder);
      var displayHolder = App.hkUtils.escapeHolder(holder);

      var totalAccHKD = 0;
      holderYears.forEach(function (y) {
        TEN_CURRENCIES.forEach(function (ccy) {
          var amt = data[y][ccy] || 0;
          if (amt > 0) totalAccHKD += App.hkUtils.toHKD(amt, ccy, rates);
        });
      });

      html += '<div class="ds-card">';
      html += '<div class="ds-holder">' +
        '<span class="ds-holder-name">👤 ' + displayHolder + '</span>' +
        '<span class="ds-total-accumulated">' +
          App.i18n.t('div.accumulated', '累积分红') + '：' +
          '<span>' + App.utils.formatNumber(totalAccHKD) + ' HKD</span>' +
        '</span>' +
      '</div>';

      html += '<div class="ds-list">';

      if (pageHolderYears.length === 0) {
        html += '<div class="ds-empty-page">' +
          App.i18n.t('div.emptyPage', '该持有人暂无本年数据') + '</div>';
      } else {
        pageHolderYears.forEach(function (year) {
          var yearData = data[year] || {};

          var yearTotalHKD = 0;
          TEN_CURRENCIES.forEach(function (ccy) {
            var amt = yearData[ccy] || 0;
            if (amt > 0) yearTotalHKD += App.hkUtils.toHKD(amt, ccy, rates);
          });

          var holderValueHKD = getHolderTotalValue(holder, rates);
          var yearYield = holderValueHKD > 0 ? (yearTotalHKD / holderValueHKD * 100) : 0;

          var yearLabel = year + ' ' + App.i18n.t('div.year', '年');

          html += '<div class="ds-year-block">';
          html += '<button class="ds-year-header" type="button" ' +
            'data-year="' + year + '" ' +
            'aria-expanded="true" ' +
            'aria-controls="div-year-body-' + safeHolderAttr + '-' + year + '">' +
            '<span class="ds-year-label">📅 ' + yearLabel + '</span>' +
            '<span class="ds-year-arrow open" aria-hidden="true">▶</span>' +
            '<span class="ds-year-total">' +
              App.i18n.t('div.yearTotal', '年分红') + '：' +
              App.utils.formatNumber(yearTotalHKD) + ' HKD</span>' +
            '<span class="ds-year-yield">' +
              App.i18n.t('div.yearYield', '年收益') + '：' +
              (yearYield > 0 ? yearYield.toFixed(2) + '%' : '—') +
            '</span>' +
          '</button>';

          html += '<div class="ds-year-body open" ' +
            'id="div-year-body-' + safeHolderAttr + '-' + year + '">';
          html += '<div class="ds-header" role="row">' +
            '<span role="columnheader">' + App.i18n.t('div.colYear', '年度') + '</span>' +
            '<span role="columnheader">' + App.i18n.t('div.colCcy', '币种') + '</span>' +
            '<span role="columnheader">' + App.i18n.t('div.colAmount', '分红金额') + '</span>' +
            '<span role="columnheader">' + App.i18n.t('div.colYield', '收益率') + '</span>' +
          '</div>';

          TEN_CURRENCIES.forEach(function (ccy) {
            var amt = yearData[ccy] || 0;
            var currencyValHKD = getHolderCurrencyValue(holder, ccy, rates);
            var yieldPct = (currencyValHKD > 0 && amt > 0)
              ? (App.hkUtils.toHKD(amt, ccy, rates) / currencyValHKD * 100)
              : 0;

            var amtClass = amt === 0 ? 'ds-amount-zero' : 'ds-amount';
            var yieldDisplay = yieldPct > 0 ? yieldPct.toFixed(2) + '%' : '—';
            var yieldClass = yieldPct > 0 ? 'ds-yield' : 'ds-yield na';
            var label = App.hkUtils.ccyLabel(ccy);

            html += '<div class="ds-item" role="row">' +
              '<span class="ds-year-text" role="cell">' + yearLabel + '</span>' +
              '<span class="ds-ccy" role="cell">' + label + '</span>' +
              '<span class="' + amtClass + '" role="cell">' +
                App.utils.formatNumber(amt) + ' ' + ccy + '</span>' +
              '<span class="' + yieldClass + '" role="cell">' + yieldDisplay + '</span>' +
            '</div>';
          });

          html += '</div></div>';
        });
      }

      html += '</div></div>';
    });

    html += '</div>'; /* 关闭 .ds-grid */

    /* ---------- 6. 年份分页（在 ds-grid 外部，不会被拉伸变形） ---------- */
    html += App.pagination.renderYearPager(allYears, YEAR, YPAGE, YPER);

    container.innerHTML = html;

    /* ---------- 7. 年份折叠按钮事件 ---------- */
    App.$$('.ds-year-header', container).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var block = btn.parentElement;
        var body = block.querySelector('.ds-year-body');
        var arrow = btn.querySelector('.ds-year-arrow');
        var isOpen = body && body.classList.contains('open');
        if (body) body.classList.toggle('open');
        if (arrow) arrow.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      });
    });

    /* ---------- 8. 年份分页事件 ---------- */
    App.pagination.bindYearPager(container,
      function (y) {
        YEAR = y;
        YPAGE = Math.floor(allYears.indexOf(y) / YPER);
        render();
      },
      function (dir) {
        var pages = Math.ceil(allYears.length / YPER);
        if (dir === 'p' && YPAGE > 0) YPAGE--;
        if (dir === 'n' && YPAGE < pages - 1) YPAGE++;
        render();
      }
    );
  }

  App.dividends = {
    init: function () {
      App.events.on('hkdatachange', function () {
        YEAR = '';
        YPAGE = 0;
        render();
      });
      App.events.on('fxchange', render);
      App.events.on('langchange', render);
      render();
    },
    render: render,
    resetPage: function () { YEAR = ''; YPAGE = 0; render(); }
  };

})(window.App = window.App || {});