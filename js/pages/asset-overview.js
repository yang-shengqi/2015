/* ============================================================
 * asset-overview.js —— 配置占比 (终极完美慢速版)
 * ============================================================ */
(function (App) {
  'use strict';

  var lastGlobalPlayTime = 0;

  function compute() {
    var holdings  = App.hkData.holdings || [];
    var templates = App.hkData.masterTemplates || {};
    var rates = App.hkUtils.rates();

    var abs = { stock: 0, bond: 0, cash: 0, other: 0 };

    holdings.forEach(function (f) {
      var effectiveValue = App.hkUtils.effectiveValue(f);
      if (effectiveValue <= 0) return;
      var tpl = templates[f.template];
      if (!tpl) return;
      var hkdValue = App.hkUtils.toHKD(effectiveValue, f.currency, rates);

      abs.stock += hkdValue * (tpl.stock / 100);
      abs.bond  += hkdValue * (tpl.bond  / 100);
      abs.cash  += hkdValue * (tpl.cash  / 100);
      abs.other += hkdValue * (tpl.other / 100);
    });

    var totalAsset = abs.stock + abs.bond + abs.cash + abs.other;
    var pct = { stock: 0, bond: 0, cash: 0, other: 0 };
    if (totalAsset > 0.0001) {
      pct.stock = abs.stock / totalAsset * 100;
      pct.bond  = abs.bond  / totalAsset * 100;
      pct.cash  = abs.cash  / totalAsset * 100;
      pct.other = abs.other / totalAsset * 100;
    }

    return { pct: pct, abs: abs, total: totalAsset };
  }

  function render() {
    var container = App.$('#assetBarsContainer');
    var legend    = App.$('#assetLegend');
    if (!container) return;

    var r = compute();

    if (r.total === 0) {
      container.innerHTML = '<div class="empty-hint">' + App.i18n.t('asset.empty', '暂无数据，请导入 Excel') + '</div>';
      if (legend) legend.innerHTML = '';
      return;
    }

    var labels = [
      { key: 'stock', name: App.i18n.t('asset.stock', '股票'), color: '--nm-c4' },
      { key: 'bond',  name: App.i18n.t('asset.bond',  '债券'), color: '--nm-c2' },
      { key: 'cash',  name: App.i18n.t('asset.cash',  '现金'), color: '--nm-c3' },
      { key: 'other', name: App.i18n.t('asset.other', '其它'), color: '--nm-fail' }
    ];

    container.innerHTML = labels.map(function (l) {
      var val = r.pct[l.key] || 0;
      var absVal = Math.abs(val);
      var displayWidth = Math.min(absVal, 150);
      var isPos = val >= 0;
      var color = isPos ? ('var(' + l.color + ')') : 'var(--nm-fail)';

      var dirStyle = isPos
        ? 'margin-left:50%; width:' + displayWidth + '%;'
        : 'margin-right:50%; width:' + displayWidth + '%;';

      return '<div class="ao-row" data-key="' + l.key + '">' +
        '<span class="ao-label">' + l.name + '</span>' +
        '<div class="ao-bar" aria-hidden="true">' +
          '<div class="ao-mid"></div>' +
          '<div class="ao-fill" data-is-pos="' + isPos + '" style="' + dirStyle + 'background:' + color + ';"></div>' +
        '</div>' +
        '<span class="ao-val">' + val.toFixed(2) + '%</span>' +
      '</div>';
    }).join('');

    if (legend) {
      legend.innerHTML = labels.map(function (l) {
        return '<span class="legend-item" data-key="' + l.key + '">' +
          '<span class="legend-dot" style="background:var(' + l.color + ');" aria-hidden="true"></span>' +
          l.name + ' ' + (r.pct[l.key] || 0).toFixed(2) + '%</span>';
      }).join('');
    }

    function playGrow(fill, delay, isFromScroll) {
      if (!fill) return;
      var isPos = fill.getAttribute('data-is-pos') === 'true';
      fill.style.transformOrigin = isPos ? 'left center' : 'right center';

      setTimeout(function() {
        if (fill.dataset.animating === 'true') return; 

        if (isFromScroll) {
          var now = Date.now();
          if (now - lastGlobalPlayTime < 1500) return; 
          lastGlobalPlayTime = now;
        }

        fill.dataset.animating = 'true';
        fill.getAnimations().forEach(function(a) { a.cancel(); });
        
        var anim = fill.animate([
          { transform: 'scaleX(0)' },
          { transform: 'scaleX(1)' }
        ], {
          duration: 1500, // ★ 拉长到 1.5 秒
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)', // ★ 极其丝滑的 Ease-out 缓动
          fill: 'forwards' 
        });

        anim.onfinish = function() {
          fill.dataset.animating = 'false';
        };
      }, delay || 0);
    }

    if (!container.dataset.boundAnim) {
      container.dataset.boundAnim = 'true';
      
      container.addEventListener('mouseenter', function(e) {
        var row = e.target.closest('.ao-row');
        if (row) {
          var fill = row.querySelector('.ao-fill');
          if (fill) {
            if (fill.dataset.hovered === 'true') return;
            fill.dataset.hovered = 'true';
            fill.dataset.animating = 'false';
            playGrow(fill, 0, false); 
          }
        }
      }, true);

      container.addEventListener('mouseleave', function(e) {
        var row = e.target.closest('.ao-row');
        if (row) {
          var fill = row.querySelector('.ao-fill');
          if (fill) fill.dataset.hovered = 'false';
        }
      }, true);

      new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          var currentFills = container.querySelectorAll('.ao-fill');
          currentFills.forEach(function(fill, index) {
            // 错峰时间也可以稍微拉长一点，比如 150ms，层次感更好
            playGrow(fill, index * 150, true);
          });
        }
      }, { threshold: 0.1 }).observe(container);
    }
  }

  App.assetOverview = {
    init: function () {
      App.events.on('hkdatachange', render);
      App.events.on('fxchange', render);
      App.events.on('langchange', render);
      render();
    },
    render: render,
    compute: compute
  };

})(window.App = window.App || {});