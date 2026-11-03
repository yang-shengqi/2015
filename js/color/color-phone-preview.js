/* ============================================================
 * color-phone-preview.js —— 纯逻辑渲染版 (中英双语完美版)
 * ============================================================ */
(function (global) {
  'use strict';

  var C = global.CO_Color;
  var N = global.CO_Names;

  var isBound = false;
  function bindEvents() {
    if (isBound) return;
    var btnLeft = document.getElementById('cp-btn-left-random');
    var btnRight = document.getElementById('cp-btn-random');
    var rand = document.getElementById('rand');

    if (rand) {
      if (btnLeft) btnLeft.addEventListener('click', function() { rand.click(); });
      if (btnRight) btnRight.addEventListener('click', function() { rand.click(); });
      isBound = true;
    }
  }

  function render(colors, ruleColors, ruleName, libVal) {
    try {
      var boxL = document.getElementById('co-phone-left');
      var boxR = document.getElementById('co-phone-right');
      if (!boxL || !boxR) return; 

      bindEvents();

      if (!libVal) {
        var libEl = document.querySelector('input[name="lib"]:checked');
        libVal = libEl ? libEl.value : 'none';
      }
      ruleName = ruleName || 'comp';

      // 👇 获取当前语言并同步手机外部的标签文字
      var isEn = global.CO_I18N && global.CO_I18N.getLang() === 'en';
      var labelL = document.querySelectorAll('.co-phone-label')[0];
      if (labelL) labelL.textContent = isEn ? 'Default Palette' : '默认配色';
      var labelR = document.querySelectorAll('.co-phone-label')[1];
      if (labelR) labelR.textContent = isEn ? 'Generated Palette' : '衍生配色';

      function safeColor(c) { return c || { r: 163, g: 196, b: 178 }; }
      function getName(rgb) {
        if (!N || !N.lookup) return 'Color';
        var m = N.lookup(rgb, 'cn');
        return m ? m.name : 'Color';
      }
      function getRgbStr(c) { return c.r + '/' + c.g + '/' + c.b; }

      // 👇 多语言字典映射
      var libTitleMap = isEn 
        ? { 'morandi': 'Morandi', 'cn': 'Chinese', 'jp': 'Japanese', 'cyber': 'Cyberpunk', 'none': 'Unlimited' }
        : { 'morandi': '莫兰迪', 'cn': '中式', 'jp': '日式', 'cyber': '赛博', 'none': '无限制' };
      
      var ruleTitleMap = isEn
        ? { 'comp': 'Complementary', 'analog': 'Analogous', 'triad': 'Triadic', 'split': 'Split', 'square': 'Square', 'mono': 'Mono' }
        : { 'comp': '互补', 'analog': '类似', 'triad': '三角', 'split': '分裂互补', 'square': '四方', 'mono': '灰度' };
      
      var subtitleMap = isEn
        ? { 'morandi': 'Morandi Color', 'cn': 'Chinese Traditional', 'jp': 'Japanese Traditional', 'cyber': 'Cyberpunk', 'none': 'Misc Colors' }
        : { 'morandi': '莫兰迪色', 'cn': '中式传统色', 'jp': '日式传统色', 'cyber': '赛博朋克色', 'none': '综合配色' };

      var libTitle = libTitleMap[libVal] || (isEn ? 'Unlimited' : '无限制');
      var ruleTitle = ruleTitleMap[ruleName] || (isEn ? 'Complementary' : '互补');
      var subtitleText = subtitleMap[libVal] || (isEn ? 'Misc Colors' : '综合配色');

      // 👇 动态拼接中英文标题
      var titleLeft = isEn ? (libTitle + ' Palette') : (libTitle + '配色');
      var titleRight = isEn ? (libTitle + ' ' + ruleTitle) : (libTitle + ruleTitle + '色');
      
      var libEnMap = { 'morandi': 'MORANDI', 'cn': 'CHINESE', 'jp': 'JAPANESE', 'cyber': 'CYBERPUNK', 'none': 'UNLIMITED' };
      var ruleEnMap = { 'comp': 'COMPLEMENTARY', 'analog': 'ANALOGOUS', 'triad': 'TRIADIC', 'split': 'SPLIT', 'square': 'SQUARE', 'mono': 'MONO' };
      
      var pLeft = isEn ? titleLeft.toUpperCase() : ((libEnMap[libVal] || 'UNLIMITED') + ' COLOR');
      var pRight = isEn ? titleRight.toUpperCase() : ((libEnMap[libVal] || 'UNLIMITED') + ' ' + (ruleEnMap[ruleName] || 'COLOR'));

      // 👇 中英文分别自适应字号与间距（英文单词太长，必须缩小）
      function getTitleInfo(text, isEn) {
        var len = text.length;
        if (isEn) {
          if (len <= 14) return { fs: 24, ls: 4 };
          if (len <= 18) return { fs: 20, ls: 3 };
          if (len <= 22) return { fs: 18, ls: 2 };
          return { fs: 16, ls: 1 };
        }
        if (len <= 5) return { fs: 30, ls: 12 };
        if (len === 6) return { fs: 28, ls: 10 };
        if (len === 7) return { fs: 24, ls: 8 };
        return { fs: 22, ls: 6 };
      }
      
      var tInfoL = getTitleInfo(titleLeft, isEn);
      var tInfoR = getTitleInfo(titleRight, isEn);

      function getEnLetterSpacing(text) {
        var len = text.length;
        if (len <= 12) return '6px';
        if (len <= 16) return '4px';
        if (len <= 20) return '3px';
        return '2px';
      }
      var lsLeft = getEnLetterSpacing(pLeft);
      var lsRight = getEnLetterSpacing(pRight);

      var now = new Date();
      var timeStr = (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());

      var footerText = isEn ? 'WeChat: Jiushu\'s Vision' : '公众号：九叔的视野';

      var svgShadow = `
        <svg class="cp-branch-svg" viewBox="0 0 250 932" preserveAspectRatio="xMinYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadowBlur"><feGaussianBlur stdDeviation="3" /></filter>
            <linearGradient id="fadeOut" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="rgba(0,0,0,0.3)" />
              <stop offset="70%" stop-color="rgba(0,0,0,0.1)" />
              <stop offset="100%" stop-color="rgba(0,0,0,0)" />
            </linearGradient>
          </defs>
          <g filter="url(#shadowBlur)" fill="url(#fadeOut)" transform="translate(130, 940) rotate(-15) scale(1.6)">
            <path d="M 0 0 C 20 -80 10 -160 30 -240 C 40 -320 10 -400 30 -480 C 40 -520 20 -560 30 -600 L 25 -600 C 15 -560 35 -520 25 -480 C 5 -400 35 -320 25 -240 C 5 -160 15 -80 -5 0 Z" />
            <path d="M 15 -180 C -10 -200 -30 -230 -40 -260 L -35 -262 C -25 -230 -5 -200 18 -185 Z" />
            <path d="M 20 -320 C -10 -340 -30 -360 -50 -390 L -45 -393 C -25 -360 -5 -340 23 -325 Z" />
            <path d="M 25 -220 C 70 -240 120 -260 170 -300 L 175 -295 C 125 -255 70 -235 28 -215 Z" />
            <path d="M 25 -400 C 80 -420 140 -440 200 -480 L 205 -475 C 145 -435 80 -415 28 -395 Z" />
            <path d="M 30 -520 C 90 -540 150 -560 210 -590 L 215 -585 C 155 -555 90 -535 32 -515 Z" />
            <path d="M 28 -580 C 70 -590 110 -600 140 -620 L 145 -615 C 110 -595 70 -585 30 -575 Z" />
            <path d="M 80 -380 C 100 -400 130 -420 160 -450 L 164 -446 C 134 -416 104 -396 84 -376 Z" />
            <path d="M 70 -260 C 100 -280 130 -290 160 -310 L 163 -306 C 133 -286 103 -276 74 -256 Z" />
          </g>
        </svg>
      `;

      // --- 左侧 ---
      var lA = safeColor(colors[0]);
      var lB = safeColor(colors[1]);
      var isLA_Light = C.luminance(lA) > 0.6;
      var isLB_Light = C.luminance(lB) > 0.6;
      
      var themeClassL = (isLA_Light && isLB_Light) ? 'cp-theme-light' : 'cp-theme-dark';

      boxL.innerHTML = `
        <div class="cp-bg">
          <div class="left" style="background:${C.rgbToHex(lA)};"></div>
          <div class="right" style="background:${C.rgbToHex(lB)};"></div>
        </div>
        ${svgShadow}
        <div class="cp-status ${themeClassL}">
          <div>${timeStr}</div>
          <div style="display:flex; align-items:center;">
             <div class="cp-sig"><i></i><i></i><i></i><i></i></div>
             <div class="cp-batt"><div class="cp-batt-lv"></div></div>
          </div>
        </div>
        <div class="cp-island"></div>
        <div class="cp-title ${themeClassL}">
          <h1 style="font-size: ${tInfoL.fs}px; letter-spacing: ${tInfoL.ls}px; margin-left: ${tInfoL.ls}px;">${titleLeft}</h1>
          <p style="letter-spacing: ${lsLeft};">${pLeft}</p>
        </div>
        <div class="cp-cards cp-grid-2">
          <div class="card-wrapper"><div class="cp-card" style="background:${C.rgbToHex(lA)}; color:${C.textOn(lA)};"><div class="subtitle">${subtitleText}</div><div class="main-title">${getName(lA)}</div><div class="info">RGB:${getRgbStr(lA)}<br>${C.rgbToHex(lA)}</div></div></div>
          <div class="card-wrapper"><div class="cp-card" style="background:${C.rgbToHex(lB)}; color:${C.textOn(lB)};"><div class="subtitle">${subtitleText}</div><div class="main-title">${getName(lB)}</div><div class="info">RGB:${getRgbStr(lB)}<br>${C.rgbToHex(lB)}</div></div></div>
        </div>
        <div class="cp-footer ${themeClassL}"><span>${footerText}</span></div>
      `;

      // --- 右侧 ---
      var rMain = safeColor(colors[0]);
      var hexMain = C.rgbToHex(rMain);
      var rCards = [];
      
      if (ruleColors && ruleColors.length > 0) {
        if (ruleName === 'square') rCards = ruleColors.slice(0, 4).map(safeColor);
        else if (ruleName === 'triad' || ruleName === 'split') rCards = ruleColors.slice(0, 3).map(safeColor);
        else if (ruleName === 'mono') rCards = ruleColors.slice(0, 5).map(safeColor);
        else rCards = [safeColor(ruleColors[0]), safeColor(ruleColors[1] || ruleColors[0])];
      } else {
        rCards = [safeColor(colors[0]), safeColor(colors[1])];
      }
      
      var gridClass = 'cp-grid-' + rCards.length;
      var textR = C.textOn(rMain);
      var themeClassR = (textR === '#111111') ? 'cp-theme-light' : 'cp-theme-dark';

      var cardsRightHtml = rCards.map(function(c) {
        var hex = C.rgbToHex(c);
        return `<div class="card-wrapper"><div class="cp-card" style="background:${hex}; color:${C.textOn(c)};"><div class="subtitle">${subtitleText}</div><div class="main-title">${getName(c)}</div><div class="info">RGB:${getRgbStr(c)}<br>${hex}</div></div></div>`;
      }).join('');

      boxR.innerHTML = `
        <div class="cp-bg">
          <div class="left" style="background:${hexMain}; width: 100%;"></div>
        </div>
        ${svgShadow}
        <div class="cp-status ${themeClassR}">
          <div>${timeStr}</div>
          <div style="display:flex; align-items:center;">
             <div class="cp-sig"><i></i><i></i><i></i><i></i></div>
             <div class="cp-batt"><div class="cp-batt-lv"></div></div>
          </div>
        </div>
        <div class="cp-island"></div>
        <div class="cp-title ${themeClassR}">
          <h1 style="font-size: ${tInfoR.fs}px; letter-spacing: ${tInfoR.ls}px; margin-left: ${tInfoR.ls}px;">${titleRight}</h1>
          <p style="letter-spacing: ${lsRight};">${pRight}</p>
        </div>
        <div class="cp-cards ${gridClass}">
          ${cardsRightHtml}
        </div>
        <div class="cp-footer ${themeClassR}"><span>${footerText}</span></div>
      `;

    } catch (e) {
      console.error('双手机渲染失败:', e);
    }
  }

  // ==========================================
  // 纯原生 Canvas 绘制（最终完美版：完美复刻字体与间距）
  // ==========================================
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.cp-download-btn');
    if (!btn) return;

    var targetId = btn.getAttribute('data-target');
    var targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    var originalText = (global.CO_I18N && typeof global.CO_I18N.t === 'function') ? global.CO_I18N.t('saveBig') : btn.textContent;
    btn.textContent = '生成中...';

    setTimeout(function () {
      try {
        // 1. 提取数据与计算动态字号
        var isDark = targetEl.querySelector('.cp-title').classList.contains('cp-theme-dark');
        var bgLeft = targetEl.querySelector('.cp-bg .left').style.backgroundColor || '#6D5DFC';
        var bgRightEl = targetEl.querySelector('.cp-bg .right');
        var bgRight = bgRightEl ? bgRightEl.style.backgroundColor : bgLeft;
        
        var h1El = targetEl.querySelector('.cp-title h1');
        var titleH1 = h1El.textContent;
        var titleP = targetEl.querySelector('.cp-title p').textContent;
        var footer = targetEl.querySelector('.cp-footer span').textContent;
        var time = targetEl.querySelector('.cp-status div').textContent;
        
        // 提取标题的动态内联样式
        var h1Style = window.getComputedStyle(h1El);
        var titleSize = parseFloat(h1Style.fontSize) || 26;
        var titleSpacing = parseFloat(h1Style.letterSpacing) || 6;
        var titleMarginLeft = parseFloat(h1Style.marginLeft) || 6;

        var pEl = targetEl.querySelector('.cp-title p');
        var pStyle = window.getComputedStyle(pEl);
        var pSpacing = parseFloat(pStyle.letterSpacing) || 2;

        var cards = Array.from(targetEl.querySelectorAll('.cp-card')).map(function (card) {
          return {
            bg: card.style.backgroundColor,
            color: card.style.color,
            subtitle: card.querySelector('.subtitle').textContent,
            mainTitle: card.querySelector('.main-title').textContent,
            info: card.querySelector('.info').innerText.replace(/<br\s*\/?>/gi, '\n')
          };
        });

        // 2. 提取树枝 SVG
        var svgNode = targetEl.querySelector('.cp-branch-svg');
        var svgStr = svgNode ? new XMLSerializer().serializeToString(svgNode) : '';
        var svgDataUrl = svgStr ? 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr) : null;

        var phoneW = 320;
        var phoneH = 694;
        var padding = 40;
        var scale = 2;

        var branchImg = new Image();
        branchImg.onload = function() { renderFinalCanvas(branchImg); };
        branchImg.onerror = function() { renderFinalCanvas(null); };

        if (svgDataUrl) {
          branchImg.src = svgDataUrl;
        } else {
          renderFinalCanvas(null);
        }

        // 3. 核心绘图函数
        function renderFinalCanvas(branchImg) {
          var canvas = document.createElement('canvas');
          canvas.width = (phoneW + padding * 2) * scale;
          canvas.height = (phoneH + padding * 2) * scale;
          var ctx = canvas.getContext('2d');
          
          // 👇 关键：辅助函数，手动实现字间距 (letter-spacing)
          function fillTextWithSpacing(ctx, text, x, y, spacing, align) {
            ctx.textAlign = 'left';
            var totalWidth = 0;
            var widths = [];
            for (var i = 0; i < text.length; i++) {
              var w = ctx.measureText(text[i]).width;
              widths.push(w);
              totalWidth += w + spacing;
            }
            totalWidth -= spacing; // 减去最后一个多余间距
            
            var currentX = x;
            if (align === 'center') currentX -= totalWidth / 2;
            else if (align === 'right') currentX -= totalWidth;

            for (var i = 0; i < text.length; i++) {
              ctx.fillText(text[i], currentX, y);
              currentX += widths[i] + spacing;
            }
          }

          ctx.scale(scale, scale);
          ctx.fillStyle = '#e0e5ec'; 
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.translate(padding, padding);

          // 裁剪圆角
          ctx.save();
          var radius = 40;
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(0, 0, phoneW, phoneH, radius);
          } else {
            ctx.moveTo(radius, 0); ctx.lineTo(phoneW - radius, 0); ctx.quadraticCurveTo(phoneW, 0, phoneW, radius);
            ctx.lineTo(phoneW, phoneH - radius); ctx.quadraticCurveTo(phoneW, phoneH, phoneW - radius, phoneH);
            ctx.lineTo(radius, phoneH); ctx.quadraticCurveTo(0, phoneH, 0, phoneH - radius);
            ctx.lineTo(0, radius); ctx.quadraticCurveTo(0, 0, radius, 0);
          }
          ctx.closePath();
          ctx.clip();

          // 画背景与树枝
          ctx.fillStyle = bgLeft;
          ctx.fillRect(0, 0, phoneW / 2, phoneH);
          ctx.fillStyle = bgRight;
          ctx.fillRect(phoneW / 2, 0, phoneW / 2, phoneH);
          if (branchImg) ctx.drawImage(branchImg, 0, 0, phoneW * 0.6, phoneH);

          // 状态栏 (无间距，正常画)
          ctx.fillStyle = isDark ? '#FFF' : '#111';
          ctx.font = '600 14px "Inter", -apple-system, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(time, 24, 32);
          
          // 信号与电池 (修复了信号对齐)
          var sigX = phoneW - 64;
          var sigY = 28; 
          ctx.fillStyle = isDark ? '#FFF' : '#111';
          ctx.fillRect(sigX, sigY - 4, 3, 4);
          ctx.fillRect(sigX + 5, sigY - 6, 3, 6);
          ctx.fillRect(sigX + 10, sigY - 8, 3, 8);
          ctx.fillRect(sigX + 15, sigY - 10, 3, 10);

          var batX = phoneW - 38;
          var batY = 18;
          ctx.strokeStyle = isDark ? '#FFF' : '#111';
          ctx.lineWidth = 1;
          ctx.strokeRect(batX, batY, 18, 10);
          ctx.fillStyle = isDark ? '#FFF' : '#111';
          ctx.fillRect(batX + 2, batY + 2, 12, 6);
          ctx.fillRect(batX + 18, batY + 3, 2, 4);

          // 灵动岛
          ctx.fillStyle = '#000';
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect((phoneW - 100) / 2, 12, 100, 28, 14);
          else ctx.rect((phoneW - 100) / 2, 12, 100, 28);
          ctx.fill();

          // 标题 (完美复刻字体和间距)
          ctx.fillStyle = isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)';
          ctx.font = '600 ' + titleSize + 'px "Noto Serif SC", "Songti SC", "SimSun", serif';
          fillTextWithSpacing(ctx, titleH1, phoneW / 2 + titleMarginLeft, 120, titleSpacing, 'center');
          
          ctx.fillStyle = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
          ctx.font = '12px "Inter", -apple-system, sans-serif';
          fillTextWithSpacing(ctx, titleP, phoneW / 2, 148, pSpacing, 'center');

          // 卡片 (👇 关键修复：尺寸由 160 放大至 180，坐标和间距同步精确适配)
          var cardY = 200;      // 网页上卡片顶部距离约 160+40 = 200
          var cardW = 180;      // 网页上的宽度是 180px
          var cardH = 180;      // 网页上的高度是 180px
          var gap = cards.length > 2 ? 20 : 40;

          cards.forEach(function (c) {
            var cx = (phoneW - cardW) / 2;
            ctx.save();
            
            // 八角形路径 (基于 180x180 计算)
            function drawOctagon(x, y, w, h) {
              var oct = 0.293;
              ctx.beginPath();
              ctx.moveTo(x + w * oct, y);
              ctx.lineTo(x + w * (1 - oct), y);
              ctx.lineTo(x + w, y + h * oct);
              ctx.lineTo(x + w, y + h * (1 - oct));
              ctx.lineTo(x + w * (1 - oct), y + h);
              ctx.lineTo(x + w * oct, y + h);
              ctx.lineTo(x, y + h * (1 - oct));
              ctx.lineTo(x, y + h * oct);
              ctx.closePath();
            }

            drawOctagon(cx, cardY, cardW, cardH);
            ctx.shadowColor = 'rgba(0,0,0,0.15)'; 
            ctx.shadowBlur = 20; 
            ctx.shadowOffsetY = 10; 
            ctx.fillStyle = c.bg;
            ctx.fill();
            
            // 内圈白线 (内缩 14px)
            ctx.shadowColor = 'transparent';
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = c.color === '#111111' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.4)';
            var inset = 14;
            drawOctagon(cx + inset, cardY + inset, cardW - inset * 2, cardH - inset * 2);
            ctx.stroke();
            
            // 卡片文字 (基于 180 高精准居中对齐)
            ctx.fillStyle = c.color;
            
            ctx.font = '12px "Noto Serif SC", serif';
            fillTextWithSpacing(ctx, c.subtitle, phoneW / 2, cardY + 52, 4, 'center');
            
            ctx.font = '600 24px "Playfair Display", "Noto Serif SC", serif';
            fillTextWithSpacing(ctx, c.mainTitle, phoneW / 2, cardY + 94, 6, 'center');
            
            ctx.font = '11px "Inter", -apple-system, sans-serif';
            var lines = c.info.split('\n');
            fillTextWithSpacing(ctx, lines[0] || '', phoneW / 2, cardY + 132, 1, 'center');
            fillTextWithSpacing(ctx, lines[1] || '', phoneW / 2, cardY + 150, 1, 'center');

            ctx.restore();
            cardY += cardH + gap;
          });

          // 底部文字
          ctx.fillStyle = isDark ? '#FFF' : '#111';
          ctx.font = '12px "Inter", -apple-system, sans-serif';
          fillTextWithSpacing(ctx, footer, phoneW - 20, phoneH - 20, 0, 'right');

          ctx.restore(); // 结束裁剪

          // 画外圈黑边
          ctx.lineWidth = 10;
          ctx.strokeStyle = '#111';
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(-5, -5, phoneW + 10, phoneH + 10, 45);
          else ctx.rect(-5, -5, phoneW + 10, phoneH + 10);
          ctx.stroke();

          // 触发下载
          var a = document.createElement('a');
          a.href = canvas.toDataURL('image/png');
          a.download = targetId === 'co-phone-left' ? '默认配色.png' : '衍生配色.png';
          a.click();
          
          btn.textContent = originalText;
          
          // 弹出操作成功提示
          if (global.CO_Util && typeof global.CO_Util.toast === 'function') {
            var isEn = global.CO_I18N && global.CO_I18N.getLang() === 'en';
            global.CO_Util.toast(isEn ? 'Image saved' : '截图已保存', 'ok');
          }
        }
      } catch (err) {
        console.error('绘制失败:', err);
        alert('绘制失败: ' + err.message);
        btn.textContent = '生成失败';
        setTimeout(function () { btn.textContent = originalText; }, 2000);
      }
    }, 20);
  });

  global.CO_PhonePreview = { render: render };
})(window);