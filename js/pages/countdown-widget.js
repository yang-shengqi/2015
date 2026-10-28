/* ============================================================
 * countdown-widget.js —— 2035 倒计时（Light DOM 版）
 * 样式由系统层 .nm-cd__* 接管
 * ============================================================ */
(function () {
  'use strict';

  if (customElements.get('countdown-2035')) return;

  var STRINGS = {
    zh: {
      badge: '⏳ 2025年12月1日起计时',
      sub: '倒计时只是静态计算，变量会压缩窗口期。',
      days: '天', hours: '时', minutes: '分', seconds: '秒',
      elapsed: '已流逝', live: '实时'
    },
    en: {
      badge: '⏳ Counting from Dec 1, 2025',
      sub: 'The countdown is only a static calculation — variables will compress the window.',
      days: 'Days', hours: 'Hours', minutes: 'Min', seconds: 'Sec',
      elapsed: 'Elapsed', live: 'Live'
    }
  };

  function getLang() {
    var app = window.App;
    if (app && app.i18n && typeof app.i18n.lang === 'function') {
      var l = app.i18n.lang();
      if (l === 'en' || l === 'zh') return l;
    }
    return 'zh';
  }

  function t(lang, key) {
    var pack = STRINGS[lang] || STRINGS.zh;
    return pack[key] != null ? pack[key] : key;
  }

  function dateLine(lang) {
    if (lang === 'en') { return 'Until <span class="gold">Jan 1, 2035</span>'; }
    return '距离 <span class="gold">2035</span> 年 <span class="gold">1</span> 月 <span class="gold">1</span> 日';
  }

  class Countdown2035 extends HTMLElement {
    constructor() {
      super();
      this.target = new Date('2035-01-01T00:00:00+08:00').getTime();
      this.start  = new Date('2025-12-01T00:00:00+08:00').getTime();
      this.total  = this.target - this.start;
      this.timer = null;
      this._offLang = null;
    }

    connectedCallback() {
      this.render();
      this.tick();
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => this.tick(), 1000);
      this._bindLang();
    }

    disconnectedCallback() {
      if (this.timer) { clearInterval(this.timer); this.timer = null; }
      this._unbindLang();
    }

    _bindLang() {
      this._unbindLang();
      var app = window.App;
      if (!app || !app.events || typeof app.events.on !== 'function') return;
      var self = this;
      this._offLang = app.events.on('langchange', function () {
        self.render();
        self.tick();
      });
    }

    _unbindLang() {
      if (typeof this._offLang === 'function') {
        try { this._offLang(); } catch (e) {}
      }
      this._offLang = null;
    }

    _set(el, value) {
      if (!el) return;
      if (el.textContent === value) return;
      el.textContent = value;
    }

    render() {
      var lang = getLang();
      var safeBadge = t(lang, 'badge');
      var safeSub = t(lang, 'sub');

      this.innerHTML = `
        <div class="nm-cd-shell" data-lang="${lang}" role="group" aria-label="2035 倒计时">
          <div class="nm-cd-shell__head">
            <span class="nm-cd-shell__logo">FINAL·<span>DEFENSE</span></span>
            <span class="nm-cd-shell__badge">${safeBadge}</span>
          </div>
          <div class="nm-cd-shell__hero">
            <div class="nm-cd-shell__date">${dateLine(lang)}</div>
            <div class="nm-cd-shell__sub">${safeSub}</div>
          </div>
          
          <div class="nm-cd__grid">
            <div class="nm-cd__item"><div class="nm-cd__num nm-cd__num--accent" data-cd="d">00</div><div class="nm-cd__lbl">${t(lang,'days')}</div></div>
            <div class="nm-cd__item"><div class="nm-cd__num" data-cd="h">00</div><div class="nm-cd__lbl">${t(lang,'hours')}</div></div>
            <div class="nm-cd__item"><div class="nm-cd__num" data-cd="m">00</div><div class="nm-cd__lbl">${t(lang,'minutes')}</div></div>
            <div class="nm-cd__item"><div class="nm-cd__num" data-cd="s">00</div><div class="nm-cd__lbl">${t(lang,'seconds')}</div></div>
          </div>

          <div class="nm-cd-shell__prog">
            <div class="nm-cd__info">
              <span>${t(lang,'elapsed')}</span><span data-cd="pct">0.00%</span>
            </div>
            <div class="nm-cd__track"><div class="nm-cd__bar" data-cd="bar"></div></div>
          </div>

          <div class="nm-cd-shell__foot">
            <span class="nm-cd-shell__live"><span class="nm-cd-shell__dot"></span> ${t(lang,'live')}</span>
            <span data-cd="clock">--:--:--</span>
          </div>
        </div>`;

      this.elD = this.querySelector('[data-cd="d"]');
      this.elH = this.querySelector('[data-cd="h"]');
      this.elM = this.querySelector('[data-cd="m"]');
      this.elS = this.querySelector('[data-cd="s"]');
      this.elBar = this.querySelector('[data-cd="bar"]');
      this.elPct = this.querySelector('[data-cd="pct"]');
      this.elClock = this.querySelector('[data-cd="clock"]');
    }

    tick() {
      if (!this.elD) return; // DOM 未准备好
      
      const now = Date.now();
      const diff = this.target - now;

      if (diff <= 0) {
        this._set(this.elD, '00'); this._set(this.elH, '00');
        this._set(this.elM, '00'); this._set(this.elS, '00');
        if (this.elBar) this.elBar.style.width = '100%';
        if (this.elPct) this.elPct.textContent = '100.00%';
      } else {
        const s = Math.floor(diff / 1000);
        this._set(this.elD, window.App.utils.padZero(Math.floor(s / 86400), 2));
        this._set(this.elH, window.App.utils.padZero(Math.floor((s % 86400) / 3600), 2));
        this._set(this.elM, window.App.utils.padZero(Math.floor((s % 3600) / 60), 2));
        this._set(this.elS, window.App.utils.padZero(s % 60, 2));

        const elapsed = Math.max(0, Math.min(now - this.start, this.total));
        const percent = (elapsed / this.total * 100).toFixed(2);
        if (this.elBar) this.elBar.style.width = percent + '%';
        if (this.elPct) this.elPct.textContent = percent + '%';
      }

      const d = new Date();
      if (this.elClock) {
        this.elClock.textContent = 
          window.App.utils.padZero(d.getHours(), 2) + ':' + 
          window.App.utils.padZero(d.getMinutes(), 2) + ':' + 
          window.App.utils.padZero(d.getSeconds(), 2);
      }
    }
  }

  customElements.define('countdown-2035', Countdown2035);
})();