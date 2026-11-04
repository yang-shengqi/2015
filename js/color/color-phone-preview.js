/* ============================================================
 * color-phone-preview.js —— 绝对纯净版
 * 无刷新、无按钮、无监听、无删除逻辑。只负责 Canvas 渲染与导出。
 * ============================================================ */
(function (global) {
  'use strict';

  var C = global.CO_Color;

  var L = {
    W: 320, H: 694,
    PAD: 40,
    EXPORT_SCALE: 2,
    CARD_SIZE: 180,
    DRAWER_W: 220,
    DRAWER_H: 46,
    DRAWER_R: 12
  };

  var F_SERIF   = '"Noto Serif SC","Songti SC","SimSun",serif';
  var F_DISPLAY = '"Playfair Display","Noto Serif SC",serif';
  var F_SANS    = '"Inter",-apple-system,sans-serif';

  /* ================= 1. 绘图工具函数 ================= */

  function roundRectPath(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function octPath(ctx, x, y, w, h) {
    var o = 0.293;
    ctx.beginPath();
    ctx.moveTo(x + w * o, y);
    ctx.lineTo(x + w * (1 - o), y);
    ctx.lineTo(x + w, y + h * o);
    ctx.lineTo(x + w, y + h * (1 - o));
    ctx.lineTo(x + w * (1 - o), y + h);
    ctx.lineTo(x + w * o, y + h);
    ctx.lineTo(x, y + h * (1 - o));
    ctx.lineTo(x, y + h * o);
    ctx.closePath();
  }

  function fillRun(ctx, text, x, y, spacing, align) {
    if (!text) return;
    var total = 0, i;
    for (i = 0; i < text.length; i++) total += ctx.measureText(text[i]).width + spacing;
    total -= spacing;
    var cx = x;
    if (align === 'center') cx -= total / 2;
    else if (align === 'right') cx -= total;
    ctx.textAlign = 'left';
    for (i = 0; i < text.length; i++) {
      ctx.fillText(text[i], cx, y);
      cx += ctx.measureText(text[i]).width + spacing;
    }
  }

  function getCardTitleStyle(text) {
    var n = (text || '').length;
    if (n <= 2) return { fs: 30, ls: 6 };
    if (n === 3) return { fs: 26, ls: 4 };
    if (n === 4) return { fs: 22, ls: 3 };
    if (n <= 7) return { fs: 18, ls: 2 };
    if (n <= 10) return { fs: 15, ls: 1 };
    return { fs: 12, ls: 0 };
  }

  function getTitleInfo(text, isEn) {
    var n = text.length;
    if (isEn) {
      if (n <= 14) return { fs: 24, ls: 4 };
      if (n <= 18) return { fs: 20, ls: 3 };
      if (n <= 22) return { fs: 18, ls: 2 };
      return { fs: 16, ls: 1 };
    }
    if (n <= 5) return { fs: 30, ls: 12 };
    if (n === 6) return { fs: 28, ls: 10 };
    if (n === 7) return { fs: 24, ls: 8 };
    return { fs: 22, ls: 6 };
  }

  function getEnSpacing(text) {
    var n = text.length;
    if (n <= 12) return 6;
    if (n <= 16) return 4;
    if (n <= 20) return 3;
    return 2;
  }

  /* ================= 2. 枝影 SVG ================= */
  var BRANCH_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 694" preserveAspectRatio="none">' +
    '<defs>' +
    '<filter id="treeBlur" x="-50%" y="-50%" width="300%" height="300%">' +
    '<feGaussianBlur stdDeviation="8" />' + 
    '</filter>' +
    '</defs>' +
    '<g filter="url(#treeBlur)" fill="rgba(0,0,0,0.28)" transform="translate(-60, 0) rotate(10, 450, 400)">' +
    '<path d="M -30 720 C 80 500 140 300 220 -20 L 260 -20 C 180 300 120 500 10 720 Z" />' +
    '<path d="M 90 450 C 40 380 10 300 -20 200 L 0 190 C 30 290 60 370 110 430 Z" />' +
    '<path d="M 140 300 C 180 250 240 200 280 150 C 220 220 160 270 130 320 Z" />' +
    '<path d="M -20 720 C 80 500 140 300 220 -20 C 120 300 60 500 20 720 Z" />' +
    '<path d="M 210 50 C 240 20 280 -10 320 -30 L 320 -10 C 280 10 240 40 215 70 Z" />' +
    '<path d="M 60 600 C 100 580 150 550 190 520 L 195 535 C 150 565 100 595 65 615 Z" />' +
    '<path d="M -20 -50 C 30 40 60 130 80 200 L 92 198 C 72 130 42 40 -10 -50 Z" transform="translate(0, 100)" />' +    
    '</g></svg>';

  var branchImg = null, branchLoaded = false, branchWaiters = [];

  function ensureBranch(cb) {
    if (branchLoaded) { cb(branchImg); return; }
    branchWaiters.push(cb);
    if (branchImg) return;
    branchImg = new Image();
    branchImg.onload = function () { branchLoaded = true; flushBranch(); };
    branchImg.onerror = function () { branchLoaded = true; branchImg = null; flushBranch(); };
    branchImg.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(BRANCH_SVG);
  }

  function flushBranch() {
    var q = branchWaiters;
    branchWaiters = [];
    for (var i = 0; i < q.length; i++) { try { q[i](branchImg); } catch (e) {} }
  }

  /* ================= 3. 核心绘制组件 ================= */

  function drawStatus(ctx, color, time, island) {
    var W = L.W;
    ctx.fillStyle = color;
    ctx.font = '600 14px ' + F_SANS;
    ctx.textAlign = 'left';
    ctx.fillText(time, 24, 32);

    var sx = W - 64, sy = 28;
    ctx.fillRect(sx, sy - 4, 3, 4);
    ctx.fillRect(sx + 5, sy - 6, 3, 6);
    ctx.fillRect(sx + 10, sy - 8, 3, 8);
    ctx.fillRect(sx + 15, sy - 10, 3, 10);

    var bx = W - 38, by = 18;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.strokeRect(bx, by, 18, 10);
    ctx.fillStyle = color;
    ctx.fillRect(bx + 2, by + 2, 12, 6);
    ctx.fillRect(bx + 18, by + 3, 2, 4);

    if (island) {
      ctx.fillStyle = '#000';
      roundRectPath(ctx, (W - 100) / 2, 12, 100, 28, 14);
      ctx.fill();
    }
  }

  function drawOctagonCard(ctx, x, y, item) {
    var s = L.CARD_SIZE;
    ctx.save();
    octPath(ctx, x, y, s, s);
    ctx.shadowColor = 'rgba(0,0,0,0.15)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = item.bg;
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = item.color === '#111111' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.4)';
    var inset = 14;
    octPath(ctx, x + inset, y + inset, s - inset * 2, s - inset * 2);
    ctx.stroke();

    ctx.fillStyle = item.color;
    ctx.font = '12px ' + F_SERIF;
    fillRun(ctx, item.subtitle, x + s / 2, y + 52, 4, 'center');

    var t = getCardTitleStyle(item.mainTitle);
    ctx.font = '600 ' + t.fs + 'px ' + F_DISPLAY;
    fillRun(ctx, item.mainTitle, x + s / 2, y + 94, t.ls, 'center');

    ctx.font = '12px ' + F_SANS;
    fillRun(ctx, item.info[0] || '', x + s / 2, y + 132, 1, 'center');
    fillRun(ctx, item.info[1] || '', x + s / 2, y + 150, 1, 'center');
    ctx.restore();
  }

  function drawDrawer(ctx, x, y, item) {
    var w = L.DRAWER_W, h = L.DRAWER_H;
    ctx.save();
    roundRectPath(ctx, x, y, w, h, L.DRAWER_R);
    ctx.shadowColor = 'rgba(0,0,0,0.15)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = item.bg;
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.save();
    ctx.clip();
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fillRect(x, y, 6, h);
    ctx.restore();

    ctx.fillStyle = item.color;
    ctx.font = '600 15px ' + F_SERIF;
    ctx.textAlign = 'left';
    ctx.fillText(item.title, x + 14, y + 28);

    ctx.font = '11px ' + F_SANS;
    ctx.textAlign = 'right';
    ctx.fillText(item.hex, x + w - 14, y + 28);
    ctx.restore();
  }

  /* ================= 4. 唯一的绘制入口 ================= */

  function drawPhone(ctx, m, branchImg) {
    var W = L.W, H = L.H;

    ctx.save();
    roundRectPath(ctx, 0, 0, W, H, 40);
    ctx.clip();

    if (m.splitBg) {
      ctx.fillStyle = m.bgLeft;  ctx.fillRect(0, 0, W / 2, H);
      ctx.fillStyle = m.bgRight; ctx.fillRect(W / 2, 0, W / 2, H);
    } else {
      ctx.fillStyle = m.bgLeft;
      ctx.fillRect(0, 0, W, H);
    }

    var isDarkText = m.titleColor === '#111111';
    var shadowCol = isDarkText ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';

    ctx.save();
    ctx.shadowColor = shadowCol; ctx.shadowBlur = 4;
    drawStatus(ctx, m.statusColor, m.time, m.showIsland);
    ctx.restore();

    ctx.save();
    ctx.shadowColor = shadowCol; ctx.shadowBlur = 4;
    ctx.fillStyle = m.titleColor;
    ctx.font = '600 ' + m.title.fs + 'px ' + F_DISPLAY;
    fillRun(ctx, m.title.text, W / 2, 120, m.title.ls, 'center');
    ctx.restore();

    ctx.save();
    ctx.shadowColor = shadowCol; ctx.shadowBlur = 4;
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = m.subColor;
    ctx.font = '12px ' + F_SANS;
    fillRun(ctx, m.sub.text, W / 2, 148, m.sub.ls, 'center');
    ctx.restore();

    m.items.forEach(function (it) {
      ctx.save();
      ctx.shadowColor = it.color === '#111111' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
      ctx.shadowBlur = 3;
      if (it.type === 'octagon') drawOctagonCard(ctx, it.x, it.y, it);
      else drawDrawer(ctx, it.x, it.y, it);
      ctx.restore();
    });

    ctx.save();
    ctx.shadowColor = shadowCol; ctx.shadowBlur = 4;
    ctx.fillStyle = m.footerColor;
    ctx.font = '12px ' + F_SANS;
    fillRun(ctx, m.footerText, W - 20, H - 20, 0, 'right');
    ctx.restore();

    if (branchImg) {
      ctx.drawImage(branchImg, 0, 0, W, H);
    }

    ctx.restore(); 

    ctx.save();
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#111';
    roundRectPath(ctx, -5, -5, W + 10, H + 10, 45);
    ctx.stroke();
    ctx.restore();
  }
  
  /* ================= 5. 构建数据模型 ================= */

  function extractName(html) {
    if (!html) return '无';
    var parts = html.split('<br>');
    if (parts.length > 1) {
      return parts[1].trim().replace(/\s*\([^)]+\)/g, '').split(' - ')[0].trim();
    }
    return '无';
  }

  function rgbStr(c) { return c.r + '/' + c.g + '/' + c.b; }
  function safeColor(c) { return c || { r: 163, g: 196, b: 178 }; }

  function nowTime() {
    var d = new Date();
    return (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' +
           (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  }

  function footerColorOf(textColor) {
    return textColor === '#111111' ? 'rgba(17,17,17,0.7)' : 'rgba(255,255,255,0.7)';
  }

  function buildLeftModel(colors, genNames, texts) {
    var a = safeColor(colors[0]);
    var b = safeColor(colors[2]);
    var tc = C.textOn(a);

    return {
      splitBg: true,
      bgLeft: C.rgbToHex(a),
      bgRight: C.rgbToHex(b),
      statusColor: tc,
      titleColor: tc,
      subColor: tc,
      title: { text: texts.titleLeft, fs: texts.tInfoL.fs, ls: texts.tInfoL.ls },
      sub: { text: texts.pLeft, ls: texts.lsLeft },
      items: [
        { type: 'octagon', x: 70, y: 200, bg: C.rgbToHex(a), color: C.textOn(a), subtitle: texts.subtitle, mainTitle: extractName(genNames[0]), info: ['RGB:' + rgbStr(a), C.rgbToHex(a)] },
        { type: 'octagon', x: 70, y: 410, bg: C.rgbToHex(b), color: C.textOn(b), subtitle: texts.subtitle, mainTitle: extractName(genNames[2]), info: ['RGB:' + rgbStr(b), C.rgbToHex(b)] }
      ],
      footerText: texts.footerText,
      footerColor: footerColorOf(tc),
      showIsland: false,
      time: texts.time
    };
  }

  function buildRightModel(colors, ruleColors, ruleNames, genNames, ruleName, texts) {
    var bg = safeColor(colors[0]);
    var main = safeColor(colors[2]);
    var tc = C.textOn(bg);
    var cards;

    if (ruleColors && ruleColors.length) {
      if (ruleName === 'square') cards = ruleColors.slice(0, 4).map(safeColor);
      else if (ruleName === 'triad' || ruleName === 'split') cards = ruleColors.slice(0, 3).map(safeColor);
      else if (ruleName === 'mono') cards = ruleColors.slice(0, 5).map(safeColor);
      else cards = ruleColors.slice(0, 2).map(safeColor);
    } else {
      cards = [safeColor(colors[0]), safeColor(colors[1])];
    }

    var items = [{
      type: 'octagon', x: 70, y: 200,
      bg: C.rgbToHex(main), color: C.textOn(main),
      subtitle: texts.subtitle, mainTitle: extractName(genNames[2]),
      info: ['RGB:' + rgbStr(main), C.rgbToHex(main)]
    }];

    var startY = 400;
    cards.slice(1).forEach(function (c, idx) {
      items.push({
        type: 'drawer', x: 50, y: startY + idx * (L.DRAWER_H + 15),
        bg: C.rgbToHex(c), color: C.textOn(c),
        title: extractName(ruleNames[idx + 1]), hex: C.rgbToHex(c)
      });
    });

    return {
      splitBg: false,
      bgLeft: C.rgbToHex(bg),
      bgRight: C.rgbToHex(bg),
      statusColor: tc,
      titleColor: tc,
      subColor: tc,
      title: { text: texts.titleRight, fs: texts.tInfoR.fs, ls: texts.tInfoR.ls },
      sub: { text: texts.pRight, ls: texts.lsRight },
      items: items,
      footerText: texts.footerText,
      footerColor: footerColorOf(tc),
      showIsland: true,
      time: texts.time
    };
  }

  /* ================= 6. 预览挂载 & 导出 ================= */

  var models = { 'co-phone-left': null, 'co-phone-right': null };

  function injectStyles() {
    if (document.getElementById('cp-canvas-styles')) return;
    var s = document.createElement('style');
    s.id = 'cp-canvas-styles';
    s.textContent =
      '#co-phone-left,#co-phone-right{position:relative;}' +
      '#co-phone-left>.cp-canvas,#co-phone-right>.cp-canvas{' +
      'display:block;width:100%;height:auto;aspect-ratio:' + L.W + '/' + L.H + ';}';
    document.head.appendChild(s);
  }

  function mountPreview(id, model) {
    var box = document.getElementById(id);
    if (!box) return;

    var canvas = box.querySelector('canvas.cp-canvas');
    if (!canvas) {
      box.innerHTML = '';
      canvas = document.createElement('canvas');
      canvas.className = 'cp-canvas';
      box.appendChild(canvas);
    }

    var dpr = Math.min(global.devicePixelRatio || 1, 3);
    canvas.width  = Math.round(L.W * dpr);
    canvas.height = Math.round(L.H * dpr);

    function paint() {
      var ctx = canvas.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);
      drawPhone(ctx, model, branchImg);
    }

    paint();
    if (!branchLoaded) ensureBranch(paint);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(paint).catch(function () {});
    }
  }

  function render(colors, ruleColors, ruleName, libVal) {
    try {
      injectStyles();

      if (!libVal) {
        var libEl = document.querySelector('input[name="lib"]:checked');
        libVal = libEl ? libEl.value : 'none';
      }
      ruleName = ruleName || 'comp';

      var isEn = global.CO_I18N && global.CO_I18N.getLang() === 'en';
      var state = global.__co_state || {};
      var genNames = state.genNames || [];
      var ruleNames = state.ruleNames || [];

      var libT = isEn ? { morandi: 'Morandi', cn: 'Chinese', jp: 'Japanese', cyber: 'Cyberpunk', none: 'Unlimited' } : { morandi: '莫兰迪', cn: '中式', jp: '日式', cyber: '赛博', none: '无限制' };
      var ruleT = isEn ? { comp: 'Complementary', analog: 'Analogous', triad: 'Triadic', split: 'Split', square: 'Square', mono: 'Mono' } : { comp: '互补', analog: '类似', triad: '三角', split: '分裂互补', square: '四方', mono: '灰度' };
      var subT = isEn ? { morandi: 'Morandi Color', cn: 'Chinese Traditional', jp: 'Japanese Traditional', cyber: 'Cyberpunk', none: 'Misc Colors' } : { morandi: '莫兰迪色', cn: '中式传统色', jp: '日式传统色', cyber: '赛博朋克色', none: '综合配色' };
      var libEn = { morandi: 'MORANDI', cn: 'CHINESE', jp: 'JAPANESE', cyber: 'CYBERPUNK', none: 'UNLIMITED' };
      var ruleEn = { comp: 'COMPLEMENTARY', analog: 'ANALOGOUS', triad: 'TRIADIC', split: 'SPLIT', square: 'SQUARE', mono: 'MONO' };

      var libTitle = libT[libVal] || (isEn ? 'Unlimited' : '无限制');
      var ruleTitle = ruleT[ruleName] || (isEn ? 'Complementary' : '互补');
      var subtitle = subT[libVal] || (isEn ? 'Misc Colors' : '综合配色');

      var titleLeft  = isEn ? (libTitle + ' Palette') : (libTitle + '配色');
      var titleRight = isEn ? (libTitle + ' ' + ruleTitle) : (libTitle + ruleTitle + '色');
      var pLeft  = isEn ? titleLeft.toUpperCase()  : ((libEn[libVal] || 'UNLIMITED') + ' COLOR');
      var pRight = isEn ? titleRight.toUpperCase() : ((libEn[libVal] || 'UNLIMITED') + ' ' + (ruleEn[ruleName] || 'COLOR'));

      var texts = {
        titleLeft: titleLeft,
        titleRight: titleRight,
        pLeft: pLeft,
        pRight: pRight,
        tInfoL: getTitleInfo(titleLeft, isEn),
        tInfoR: getTitleInfo(titleRight, isEn),
        lsLeft: getEnSpacing(pLeft),
        lsRight: getEnSpacing(pRight),
        subtitle: subtitle,
        footerText: isEn ? "Wechat: Jiushu's Vision" : '公众号：九叔的视野',
        time: nowTime()
      };

      models['co-phone-left']  = buildLeftModel(colors, genNames, texts);
      models['co-phone-right'] = buildRightModel(colors, ruleColors, ruleNames, genNames, ruleName, texts);

      mountPreview('co-phone-left',  models['co-phone-left']);
      mountPreview('co-phone-right', models['co-phone-right']);

    } catch (e) {
      console.error('渲染失败:', e);
    }
  }

  function exportPNG(model, filename) {
    var s = L.EXPORT_SCALE, pad = L.PAD;
    var cw = L.W + pad * 2, ch = L.H + pad * 2;
    var canvas = document.createElement('canvas');
    canvas.width  = cw * s;
    canvas.height = ch * s;

    var ctx = canvas.getContext('2d');
    ctx.scale(s, s);
    ctx.fillStyle = '#e0e5ec';
    ctx.fillRect(0, 0, cw, ch);
    ctx.translate(pad, pad);
    
    drawPhone(ctx, model, branchImg);

    var a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = filename;
    a.click();
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.cp-download-btn');
    if (!btn) return;

    var id = btn.getAttribute('data-target');
    var model = models[id];
    if (!model) return;

    var isEn = global.CO_I18N && global.CO_I18N.getLang() === 'en';
    var originalText = (global.CO_I18N && typeof global.CO_I18N.t === 'function') ? global.CO_I18N.t('saveBig') : btn.textContent;

    btn.textContent = isEn ? 'Rendering…' : '生成中...';

    ensureBranch(function () {
      try {
        var name = id === 'co-phone-left' ? (isEn ? 'default-palette.png' : '默认配色.png') : (isEn ? 'generated-palette.png' : '衍生配色.png');
        exportPNG(model, name);
        btn.textContent = originalText;
        if (global.CO_Util && typeof global.CO_Util.toast === 'function') {
          global.CO_Util.toast(isEn ? 'Image saved' : '截图已保存', 'ok');
        }
      } catch (err) {
        console.error('绘制失败:', err);
        btn.textContent = isEn ? 'Failed' : '生成失败';
        setTimeout(function () { btn.textContent = originalText; }, 2000);
      }
    });
  });

  global.CO_PhonePreview = { render: render };

})(window);