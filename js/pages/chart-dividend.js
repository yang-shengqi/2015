/* ============================================================
 * chart-dividend.js —— 年度总分红柱状
 * ------------------------------------------------------------
 * 本版修改：
 *   ★ 删除本地 fmtAxisNum，统一走 App.hkUtils.fmtAxisNum
 *   ★ 汇率计算统一走 App.hkUtils（防汇率兜底 1）
 * ============================================================ */
(function (App) {
  'use strict';

  function fmtAxis(v) { return App.hkUtils.fmtAxisNum(v, 1); }

  var lastSnapshot = { years: [], total: 0, latest: 0 };

  function buildDescription() {
    if (!lastSnapshot.years.length) {
      return App.i18n.t('dividend.yearLabel', '年度分红') + '：' + App.i18n.t('asset.empty', '暂无数据');
    }
    return App.i18n.t('dividend.yearLabel', '年度分红') + '，' +
      lastSnapshot.years.length + ' ' + App.i18n.t('div.year', '年') + '，' +
      App.i18n.t('div.accumulated', '累积分红') + '：' +
      App.utils.formatNumber(lastSnapshot.total) + ' HKD，' +
      App.i18n.t('div.yearTotal', '年分红') + '：' +
      App.utils.formatNumber(lastSnapshot.latest) + ' HKD。';
  }

  function render() {
    var canvas = App.$('#dividendChart');
    if (!canvas) return;

    var summary = App.hkData.dividendSummary || {};
    var rates = App.hkUtils.rates();

    var yearMap = {};
    Object.keys(summary).forEach(function (holder) {
      var years = summary[holder];
      Object.keys(years).forEach(function (year) {
        var yd = years[year];
        Object.keys(yd).forEach(function (ccy) {
          var amt = yd[ccy] || 0;
          if (amt > 0) {
            yearMap[year] = (yearMap[year] || 0) + App.hkUtils.toHKD(amt, ccy, rates);
          }
        });
      });
    });

    var years = Object.keys(yearMap).sort();
    var values = years.map(function (y) { return yearMap[y]; });

    lastSnapshot.years = years;
    lastSnapshot.total = values.reduce(function (s, v) { return s + v; }, 0);
    lastSnapshot.latest = values.length ? values[values.length - 1] : 0;

    App.charts.create('dividendChart', canvas, function (t) {
      return {
        type: 'bar',
        data: {
          labels: years.map(function (y) { return y + ''; }),
          datasets: [{
            label: App.i18n.t('dividend.yearLabel', '年度分红'),
            data: values,
            backgroundColor: t['--nm-c3'],
            borderRadius: 4,
            barThickness: 28
          }]
        },
        options: {
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function (ctx) {
                  return ' ' + App.utils.formatNumber(ctx.parsed.y) + ' HKD';
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                display: true,
                color: t['--nm-text-3'],
                font: { size: 11 },
                callback: fmtAxis,
                maxTicksLimit: 6
              },
              afterFit: function (scale) { scale.width = 64; }
            },
            x: { grid: { display: false } }
          }
        }
      };
    }, {
      ariaLabel: App.i18n.t('dividend.yearLabel', '年度分红'),
      description: buildDescription
    });
  }

  App.chartDividend = {
    init: function () {
      App.events.on('hkdatachange', render);
      App.events.on('fxchange', render);
      App.events.on('langchange', render);
      render();
    },
    render: render
  };

})(window.App = window.App || {});