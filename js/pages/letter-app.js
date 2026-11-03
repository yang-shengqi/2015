/* ============================================================
 * letter-app.js —— 家书页面纯业务逻辑 (第四代极简版)
 * ============================================================ */
(function (App) {
  'use strict';

  App.utils.ready(function () {

    /* 
     * ★ 语言切换逻辑已全部交由系统层接管。
     * 此处彻底删除所有关于 #langBtn、.zh、.en 的代码。
     */

    /* 2. 家书正计时 */
    var targetDate = new Date(2026, 6, 3, 0, 0, 0).getTime();

    function updateCountdown() {
      var now = new Date().getTime();
      var diff = now - targetDate;

      if (diff < 0) {
        ['cdD', 'cdH', 'cdM', 'cdS'].forEach(function (id) {
          var el = App.$('#' + id);
          if (el) el.textContent = '00';
        });
        var pEl = App.$('#cdPercent');
        if (pEl) pEl.textContent = '0.00%';
        var bEl = App.$('#cdBar');
        if (bEl) bEl.style.width = '0%';
        return;
      }

      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      var minutes = Math.floor((diff % 3600000) / 60000);
      var seconds = Math.floor((diff % 60000) / 1000);

      var dEl = App.$('#cdD');
      if (dEl) {
        dEl.textContent = String(days);
        App.$('#cdH').textContent = App.utils.padZero(hours, 2);
        App.$('#cdM').textContent = App.utils.padZero(minutes, 2);
        App.$('#cdS').textContent = App.utils.padZero(seconds, 2);
      }

      var totalTargetDays = 3650;
      var percent = Math.min((days / totalTargetDays) * 100, 100);

      var pEl2 = App.$('#cdPercent');
      if (pEl2) pEl2.textContent = percent.toFixed(2) + '%';
      var bEl2 = App.$('#cdBar');
      if (bEl2) bEl2.style.width = percent + '%';
      
      var clockEl = App.$('#cdClock');
      if (clockEl) {
        var d = new Date();
        clockEl.textContent = App.utils.padZero(d.getHours(), 2) + ':' + 
                              App.utils.padZero(d.getMinutes(), 2) + ':' + 
                              App.utils.padZero(d.getSeconds(), 2);
      }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    /* 3. 复利计算器 */
    function calcDCA() {
      var pmtEl = App.$('#pmt');
      var rateEl = App.$('#rate');
      var yearsEl = App.$('#years');
      if (!pmtEl || !rateEl || !yearsEl) return;

      var pmt = parseFloat(pmtEl.value) || 0;
      var rate = parseFloat(rateEl.value) || 0;
      var years = parseFloat(yearsEl.value) || 0;

      var monthlyRate = rate / 100 / 12;
      var months = years * 12;
      var futureValue;

      if (monthlyRate === 0) {
        futureValue = pmt * months;
      } else {
        futureValue = pmt * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
      }

      var totalInput = pmt * months;
      var totalProfit = futureValue - totalInput;

      App.$('#resultD').innerHTML = App.utils.formatNumber(futureValue) + ' <span class="cur">HKD</span>';
      
      var inputEl = App.$('#totalInput');
      if (inputEl) inputEl.textContent = App.utils.formatNumber(totalInput);
      var profitEl = App.$('#totalProfit');
      if (profitEl) profitEl.textContent = App.utils.formatNumber(totalProfit);
    }

    function calcLumpSum() {
      var pvEl = App.$('#pv');
      var rateSEl = App.$('#rateS');
      var yearsSEl = App.$('#yearsS');
      if (!pvEl || !rateSEl || !yearsSEl) return;

      var pv = parseFloat(pvEl.value) || 0;
      var rate = parseFloat(rateSEl.value) || 0;
      var years = parseFloat(yearsSEl.value) || 0;

      var futureValue = pv * Math.pow(1 + (rate / 100), years);
      var totalProfit = futureValue - pv;

      App.$('#resultS').innerHTML = App.utils.formatNumber(futureValue) + ' <span class="cur">HKD</span>';
      
      var profitSEl = App.$('#totalProfitS');
      if (profitSEl) profitSEl.textContent = App.utils.formatNumber(totalProfit);
    }

    ['pmt', 'rate', 'years'].forEach(function (id) {
      var el = App.$('#' + id);
      if (el) el.addEventListener('input', calcDCA);
    });
    ['pv', 'rateS', 'yearsS'].forEach(function (id) {
      var el = App.$('#' + id);
      if (el) el.addEventListener('input', calcLumpSum);
    });

    calcDCA();
    calcLumpSum();

    // ★ 因为语言切换时，字典会覆盖包含 id="totalInput" 的区域，切换后必须重新计算一次
    document.addEventListener('co:langchange', function() {
      setTimeout(function() {
        calcDCA();
        calcLumpSum();
      }, 100);
    });

  });

})(window.App = window.App || {});