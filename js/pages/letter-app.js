/* ============================================================
 * letter-app.js —— 家书页面专属逻辑 (第三代规范化)
 * ============================================================ */
(function (App) {
  'use strict';

  // 确保在 DOM 加载完毕后执行，且所有核心工具已就绪
  App.utils.ready(function () {

    /* 1. 中英双语切换 */
    var langBtn = App.$('#langBtn');
    function applyLang(next) {
      var root = document.documentElement;
      root.setAttribute('data-lang', next);
      root.lang = (next === 'en') ? 'en' : 'zh-CN';
      localStorage.setItem('letter-lang', next);
      
      // 控制按钮点亮（利用原本的 CSS）
      var zhSpan = App.$('#langBtn .zh');
      var enSpan = App.$('#langBtn .en');
      if (zhSpan) zhSpan.setAttribute('data-active', next === 'zh' ? 'true' : 'false');
      if (enSpan) enSpan.setAttribute('data-active', next === 'en' ? 'true' : 'false');

      // ★ 关键核心：强行调用全局翻译引擎，让页面里的字（如果是 data-i18n）变成英文！
      if (window.App && App.i18n) {
        App.i18n.set(next);
      }

      App.events.emit('langchange', next);
    }

    if (langBtn) {
      applyLang(localStorage.getItem('letter-lang') || 'zh');
      langBtn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-lang') || 'zh';
        applyLang(current === 'zh' ? 'en' : 'zh');
      });
    }

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
      
      // 更新右下角实时时钟
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
      var pmt = parseFloat(App.$('#pmt').value) || 0;
      var rate = parseFloat(App.$('#rate').value) || 0;
      var years = parseFloat(App.$('#years').value) || 0;

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
      App.$('#totalInput').textContent = App.utils.formatNumber(totalInput);
      App.$('#totalProfit').textContent = App.utils.formatNumber(totalProfit);

      var inputEn = App.$('#totalInputEn');
      if (inputEn) inputEn.textContent = App.utils.formatNumber(totalInput);
      var profitEn = App.$('#totalProfitEn');
      if (profitEn) profitEn.textContent = App.utils.formatNumber(totalProfit);
    }

    function calcLumpSum() {
      var pv = parseFloat(App.$('#pv').value) || 0;
      var rate = parseFloat(App.$('#rateS').value) || 0;
      var years = parseFloat(App.$('#yearsS').value) || 0;

      var futureValue = pv * Math.pow(1 + (rate / 100), years);
      var totalProfit = futureValue - pv;

      App.$('#resultS').innerHTML = App.utils.formatNumber(futureValue) + ' <span class="cur">HKD</span>';
      App.$('#totalProfitS').textContent = App.utils.formatNumber(totalProfit);

      var profitEn = App.$('#totalProfitSEn');
      if (profitEn) profitEn.textContent = App.utils.formatNumber(totalProfit);
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
  });

})(window.App = window.App || {});