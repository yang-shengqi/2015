/**
 * 纯原生 JS 音乐播放器组件（极速无卡顿版 · 纯逻辑版）
 */
(function () {
  'use strict';

  class MiniPlayer extends HTMLElement {
    constructor() {
      super();
      this.audio = new Audio();
      this.tracks = [];
      this.currentIndex = 0;
      this.isPlaying = false;

      const fileNames = [
        "That's Why(You Go Away)", "Love Is Gone", "Señorita", "Heal The World",
        "Friendships(Original Mix)", "Distant Memory", "Beautiful In White",
        "Loves Me Not", "I Knew You Were Trouble.", "My Stupid Heart(Kids Version)",
        "Seasons in the Sun", "Lily"
      ];

      fileNames.forEach((name, index) => {
        let indexStr = (index + 1) < 10 ? `0${index + 1}` : (index + 1);
        this.tracks.push({ source: `music/bgm${indexStr}.mp3`, title: name });
      });

      this.audio.src = this.tracks[0].source;
      this.audio.addEventListener('ended', () => this.next());
    }

    connectedCallback() {
      this.render();
      this.updatePlayIcon();
      this.updateTitles();
    }

    play() {
      if (this.audio.paused) {
        this.audio.play().catch(e => console.log("播放失败:", e));
        this.isPlaying = true;
      } else {
        this.audio.pause();
        this.isPlaying = false;
      }
      this.updatePlayIcon();
    }

    prev() {
      this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.tracks.length - 1;
      this.loadTrack();
    }

    next() {
      this.currentIndex = this.currentIndex < this.tracks.length - 1 ? this.currentIndex + 1 : 0;
      this.loadTrack();
    }

    loadTrack() {
      this.audio.src = this.tracks[this.currentIndex].source;
      this.updateTitles();
      if (this.isPlaying) {
        this.audio.play().catch(e => console.log("自动播放被拦截"));
      }
    }

    updateTitles() {
      let title = this.tracks[this.currentIndex].title;
      const playBtn = this.querySelector('.js-play-btn');
      if (playBtn) {
        playBtn.setAttribute('data-tip', `播放/暂停 (当前: ${title})`);
      }
    }

    updatePlayIcon() {
      const playBtn = this.querySelector('.js-play-btn');
      if (!playBtn) return;
      
      if (this.isPlaying) {
        playBtn.innerHTML = `<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" fill="currentColor" stroke="none"></rect><rect x="14" y="4" width="4" height="16" fill="currentColor" stroke="none"></rect></svg>`;
      } else {
        playBtn.innerHTML = `<svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
      }
    }

    render() {
      this.innerHTML = `
        <div class="nm-bare-btn" data-tip="上一首"><svg viewBox="0 0 24 24"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg></div>
        <div class="nm-bare-btn -play js-play-btn" data-tip="加载中..."></div>
        <div class="nm-bare-btn" data-tip="下一首"><svg viewBox="0 0 24 24"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg></div>
      `;
      const btns = this.querySelectorAll('.nm-bare-btn');
      btns[0].addEventListener('click', () => this.prev());
      btns[1].addEventListener('click', () => this.play());
      btns[2].addEventListener('click', () => this.next());
    }
  }

  if (!customElements.get('music-player')) {
    customElements.define('music-player', MiniPlayer);
  }

  const initAutoInject = () => {
    if (!document.querySelector('music-player')) {
      const player = document.createElement('music-player');
      document.body.appendChild(player);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAutoInject);
  } else {
    initAutoInject();
  }
})();