(function () {
  const clockHTML = `
    <div class="nm-wall-clock">
      <div class="nm-clock-face" id="face">
        <div class="nm-clock-hand hour" id="hourHand"></div>
        <div class="nm-clock-hand minute" id="minuteHand"></div>
        <div class="nm-clock-hand second" id="secondHand"></div>
        <div class="nm-clock-center"></div>
        <div class="nm-clock-logo">YANG'S CLOCK</div> 
        <div class="nm-clock-week" id="weekDisplay">THURSDAY</div>
      </div>
    </div>
  `;

  function initClock(container) {
    const face = container.querySelector('#face');
    const radius = 42;

    const numbers = [
      { text: '12', deg: 0 }, { text: '3', deg: 90 }, { text: '6', deg: 180 }, { text: '9', deg: 270 }
    ];
    numbers.forEach(num => {
      const el = document.createElement('div');
      el.className = 'nm-clock-number';
      el.textContent = num.text;
      const rad = (num.deg - 90) * Math.PI / 180;
      el.style.left = `${50 + radius * Math.cos(rad)}%`;
      el.style.top = `${50 + radius * Math.sin(rad)}%`;
      face.appendChild(el);
    });

    for (let i = 0; i < 60; i++) {
      if (i % 15 === 0) continue;
      const tick = document.createElement('div');
      tick.className = i % 5 === 0 ? 'nm-clock-tick hour' : 'nm-clock-tick';
      const rad = (i * 6 - 90) * Math.PI / 180;
      tick.style.left = `${50 + radius * Math.cos(rad)}%`;
      tick.style.top = `${50 + radius * Math.sin(rad)}%`;
      face.appendChild(tick);
    }

    const hourHand = container.querySelector('#hourHand');
    const minuteHand = container.querySelector('#minuteHand');
    const secondHand = container.querySelector('#secondHand');
    const weekDisplay = container.querySelector('#weekDisplay');

    const updateClock = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();

      const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      if (weekDisplay) weekDisplay.textContent = weekDays[now.getDay()];

      const secAngle = s * 6;
      const minAngle = (m + s / 60) * 6;
      const hourAngle = ((h % 12) + m / 60) * 30;

      secondHand.style.transform = `translateX(-50%) rotate(${secAngle}deg)`;
      minuteHand.style.transform = `translateX(-50%) rotate(${minAngle}deg)`;
      hourHand.style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
    };

    updateClock();
    container.clockInterval = setInterval(updateClock, 1000);
  }

  function autoMountClock() {
    if (document.querySelector('.nm-clock-widget')) return;

    // 👇 JS 里干干净净，只给个类名，不写任何 width、position
    const wrapper = document.createElement('div');
    wrapper.className = 'nm-clock-widget';
    wrapper.innerHTML = clockHTML;
    document.body.appendChild(wrapper);
    
    initClock(wrapper);
  }

  document.addEventListener('DOMContentLoaded', autoMountClock);
})();