/* ============================================================
 * chart-schwab.js —— Schwab 月度市值趋势
 * ------------------------------------------------------------
 * 本版修改：
 *   ★ 删除本地 fmtAxisNum，统一走 App.hkUtils.fmtAxisNum
 * ============================================================ */
(function (App) {
  'use strict';

  function fmtAxis(v) { return App.hkUtils.fmtAxisNum(v, 1); }

  var lastSnapshot = { months: 0, last: null };

  function buildDescription() {
    if (!lastSnapshot.months) {
      return App.i18n.t('schwab.title', 'Schwab 月度市值趋势') + '：' + App.i18n.t('asset.empty', '暂无数据');
    }
    return App.i18n.t('schwab.title', 'Schwab 月度市值趋势') + '，' +
      lastSnapshot.months + ' ' + App.i18n.t('g10.unit', '个') + '，' +
      App.i18n.t('dev.th.value', '当下市值') + '：' +
      App.utils.formatNumber(lastSnapshot.last) + ' HKD。';
  }

  function render() {
    var canvas = App.$('#schwabTrendCanvas');
    if (!canvas) return;

    var data = App.hkData.schwabTrendData || {};
    var usdRate = App.utils.usdToHkd();

    var months = Object.keys(data).sort();
    var values = months.map(function (m) {
      var raw = data[m];
      if (raw === undefined || raw === null || raw === '') return null;
      var v = Number(raw);
      if (isNaN(v)) return null;
      return v * usdRate;
    });

    lastSnapshot.months = months.length;
    lastSnapshot.last = (function () {
      for (var i = values.length - 1; i >= 0; i--) if (values[i] != null) return values[i];
      return 0;
    })();

    App.charts.create('schwabTrendChart', canvas, function (t) {
      return {
        type: 'bar',
        data: {
          labels: months,
          datasets: [{
            label: 'Schwab',
            data: values,
            backgroundColor: t['--nm-c1'],
            borderRadius: 3,
            barPercentage: 0.4,
            categoryPercentage: 0.7
          }]
        },
        options: {
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function (ctx) {
                  if (ctx.parsed.y == null) return null;
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
                callback: fmtAxis
              },
              afterFit: function (scale) { scale.width = 64; }
            },
            x: {
              ticks: {
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 12,
                callback: function (v, i) {
                  var label = this.getLabelForValue(v);
                  if (!label) return '';
                  var parts = label.split('-');
                  if (parts[1] === '01' || i === 0) return parts[0];
                  return '';
                }
              }
            }
          }
        }
      };
    }, {
      ariaLabel: App.i18n.t('schwab.title', 'Schwab 月度市值趋势'),
      description: buildDescription
    });
  }

  App.chartSchwab = {
    init: function () {
      App.events.on('hkdatachange', render);
      App.events.on('fxchange', render);
      App.events.on('langchange', render);
      render();
    },
    render: render
  };

})(window.App = window.App || {});