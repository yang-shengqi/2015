/* ============================================================
 * color-phone-preview.js —— 绝对纯净版 · 一致性修复
 * 变更范围（仅此两处）：
 *   1. 八角 / 抽屉 阴影改由 SVG 位图绘制，预览与导出、PC 与移动端完全一致
 *   2. 文字色按 WCAG 2.2 (1.4.3) 计算，覆盖状态栏（时间 / 信号 / 电池）
 * 其余逻辑一字未动。
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

  /* ================= 0. WCAG 2.2 工具 ================= */

  var WHITE = { r: 255, g: 255, b: 255 };
  var BLACK = { r: 0,   g: 0,   b: 0   };
  var SOFT_BLACK = { r: 17, g: 17, b: 17 };

  function hexToRgb(h) {
    if (typeof h !== 'string') return { r: 0, g: 0, b: 0 };
    h = h.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    if (isNaN(n)) return { r: 0, g: 0, b: 0 };
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function srgbLin(v) {
    v /= 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  }

  function relLum(c) {
    return 0.2126 * srgbLin(c.r) + 0.7152 * srgbLin(c.g) + 0.0722 * srgbLin(c.b);
  }

  function contrastRatio(a, b) {
    var la = relLum(a), lb = relLum(b);
    var hi = Math.max(la, lb), lo = Math.min(la, lb);
    return (hi + 0.05) / (lo + 0.05);
  }

  /**
   * 在一组背景色上挑选对比度最优的文字色（WCAG 2.2 SC 1.4.3 阈值 4.5:1）
   * 优先 #111111（视觉柔和）；不达标退 #000000；深色背景走 #FFFFFF。
   * 分裂背景跨中线时取各背景下的最小值比较——这是该布局下能做到的最优解。
   */
  function pickText(bgList) {
    var bgs = [], i;
    for (i = 0; i < bgList.length; i++) bgs.push(hexToRgb(bgList[i]));

    function minRatio(fg) {
      var m = Infinity;
      for (var k = 0; k < bgs.length; k++) {
        var v = contrastRatio(fg, bgs[k]);
        if (v < m) m = v;
      }
      return m;
    }

    if (minRatio(SOFT_BLACK) >= 4.5) return '#111111';
    if (minRatio(BLACK) >= 4.5) return '#000000';
    return minRatio(WHITE) >= minRatio(BLACK) ? '#FFFFFF' : '#000000';
  }

  function isLight(hex) {
    return relLum(hexToRgb(hex)) > 0.35;
  }

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
  
  /* 👇👇👇 柳枝控制台（请在这里调整） 👇👇👇 */
  var WILLOW_X = -80;        // 左右位移：负数往左移，正数往右移 (例如 -20 就是往左移 20px)
  var WILLOW_Y = 0;        // 上下位移：负数往上移，正数往下移 (例如 30 就是往下移 30px)
  var WILLOW_ROTATE = 35;   // 旋转角度：正数顺时针转，负数逆时针转 (例如 15 就是顺时针倾斜 15度)
  var WILLOW_SCALE = 1.8;    // 缩放大小：1 是原始大小，0.8 是缩小，1.2 是放大
  /* 👆👆👆 柳枝控制台（请在这里调整） 👆👆👆 */

  var willowTransform = 'translate(' + WILLOW_X + ', ' + WILLOW_Y + ') rotate(' + WILLOW_ROTATE + ') scale(' + WILLOW_SCALE + ')';
  // 为了以中心点旋转，我们需要知道原先柳枝的基准中心位置，这里大约在 (230, 300)
  var willowCenterTransform = 'translate(230, 300) ' + willowTransform + ' translate(-230, -300)';


  var BRANCH_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="2082" viewBox="0 0 320 694" preserveAspectRatio="none">' +
    '<defs>' +
    '<filter id="bw"><feGaussianBlur stdDeviation="10"/></filter>' +
    '<filter id="bf"><feGaussianBlur stdDeviation="6"/></filter>' +
    '<filter id="bm"><feGaussianBlur stdDeviation="3"/></filter>' +
    '<filter id="bn"><feGaussianBlur stdDeviation="1.6"/></filter>' +
    '</defs>' +
    
    '<g fill="#0a0a0a">' +
      
      /* ==================== 1. 背景窗格光影 ==================== */
      '<g filter="url(#bw)" opacity="0.08">' +
        '<path d="M 0 150 L 320 250 L 320 280 L 0 180 Z" />' +
        '<path d="M 80 0 L 120 0 L 220 694 L 180 694 Z" />' +
      '</g>' +

      /* ==================== 2. 左下角：焦外虚化垂叶 ==================== */
      '<g filter="url(#bf)" opacity="0.15">' +
        '<path d="M 20 450 C 60 500, 80 600, 50 694" stroke="#0a0a0a" stroke-width="6" fill="none"/>' +
        '<g transform="translate(30, 520) rotate(45) scale(1.5)"><path d="M0,0 C15,-8 35,-8 50,0 C35,8 15,8 0,0 Z"/></g>' +
        '<g transform="translate(60, 600) rotate(15) scale(1.8)"><path d="M0,0 C15,-8 35,-8 50,0 C35,8 15,8 0,0 Z"/></g>' +
        '<g transform="translate(10, 640) rotate(70) scale(1.3)"><path d="M0,0 C15,-8 35,-8 50,0 C35,8 15,8 0,0 Z"/></g>' +
        '<g transform="translate(100, 450) rotate(-20) scale(1.6)"><path d="M0,0 C15,-8 35,-8 50,0 C35,8 15,8 0,0 Z"/></g>' +
      '</g>' +

      /* ==================== 3. 中景：穿插的枝叶 ==================== */
      '<g filter="url(#bm)" opacity="0.1">' +
        '<path d="M 300 180 C 200 220, 100 300, -10 400" stroke="#0a0a0a" stroke-width="3" fill="none"/>' +
        '<g transform="translate(180, 260) rotate(-30)"><path d="M0,0 C10,-5 25,-5 35,0 C25,5 10,5 0,0 Z"/></g>' +
        '<g transform="translate(120, 320) rotate(10)"><path d="M0,0 C10,-5 25,-5 35,0 C25,5 10,5 0,0 Z"/></g>' +
        '<g transform="translate(230, 210) rotate(-50)"><path d="M0,0 C10,-5 25,-5 35,0 C25,5 10,5 0,0 Z"/></g>' +
      '</g>' +

      /* ==================== 4. 近景：下垂的柳枝 ==================== */
      /* 👇 这里引入了上方的位移、旋转和缩放参数 */
      '<g filter="url(#bn)" opacity="0.24" transform="' + willowCenterTransform + '">' +
        
        /* 主枝条 1 */
        '<path d="M 260 -20 C 240 100, 180 200, 180 320 C 180 420, 230 500, 220 600" stroke="#0a0a0a" stroke-width="2.5" fill="none" />' +
        /* 主枝条 2 */
        '<path d="M 340 80 C 300 160, 280 240, 280 350 C 280 450, 310 520, 290 600" stroke="#0a0a0a" stroke-width="1.5" fill="none" />' +
        /* 分叉细枝 */
        '<path d="M 210 140 C 190 180, 150 200, 130 250" stroke="#0a0a0a" stroke-width="1.2" fill="none" />' +
        
        /* 柳叶排布 */
        '<g transform="translate(235, 80) rotate(-30)"><path d="M0,0 Q -5,15 0,30 Q 5,15 0,0 Z"/></g>' +
        '<g transform="translate(215, 150) rotate(-40)"><path d="M0,0 Q -5,15 0,30 Q 5,15 0,0 Z"/></g>' +
        '<g transform="translate(195, 220) rotate(-50)"><path d="M0,0 Q -5,15 0,30 Q 5,15 0,0 Z"/></g>' +
        '<g transform="translate(185, 300) rotate(-30)"><path d="M0,0 Q -5,15 0,30 Q 5,15 0,0 Z"/></g>' +
        '<g transform="translate(195, 380) rotate(-10)"><path d="M0,0 Q -5,15 0,30 Q 5,15 0,0 Z"/></g>' +
        '<g transform="translate(225, 460) rotate(20)"><path d="M0,0 Q -5,15 0,30 Q 5,15 0,0 Z"/></g>' +
        '<g transform="translate(245, 120) rotate(10)"><path d="M0,0 Q -5,15 0,30 Q 5,15 0,0 Z"/></g>' +
        '<g transform="translate(215, 180) rotate(20)"><path d="M0,0 Q -5,15 0,30 Q 5,15 0,0 Z"/></g>' +
        '<g transform="translate(190, 260) rotate(30)"><path d="M0,0 Q -5,15 0,30 Q 5,15 0,0 Z"/></g>' +
        '<g transform="translate(190, 340) rotate(40)"><path d="M0,0 Q -5,15 0,30 Q 5,15 0,0 Z"/></g>' +
        '<g transform="translate(205, 420) rotate(50)"><path d="M0,0 Q -5,15 0,30 Q 5,15 0,0 Z"/></g>' +
        '<g transform="translate(310, 150) rotate(-20)"><path d="M0,0 Q -4,12 0,24 Q 4,12 0,0 Z"/></g>' +
        '<g transform="translate(290, 230) rotate(-30)"><path d="M0,0 Q -4,12 0,24 Q 4,12 0,0 Z"/></g>' +
        '<g transform="translate(280, 310) rotate(-20)"><path d="M0,0 Q -4,12 0,24 Q 4,12 0,0 Z"/></g>' +
        '<g transform="translate(290, 390) rotate(-10)"><path d="M0,0 Q -4,12 0,24 Q 4,12 0,0 Z"/></g>' +
        '<g transform="translate(305, 470) rotate(10)"><path d="M0,0 Q -4,12 0,24 Q 4,12 0,0 Z"/></g>' +
        '<g transform="translate(320, 190) rotate(10)"><path d="M0,0 Q -4,12 0,24 Q 4,12 0,0 Z"/></g>' +
        '<g transform="translate(295, 270) rotate(20)"><path d="M0,0 Q -4,12 0,24 Q 4,12 0,0 Z"/></g>' +
        '<g transform="translate(285, 350) rotate(30)"><path d="M0,0 Q -4,12 0,24 Q 4,12 0,0 Z"/></g>' +
        '<g transform="translate(295, 430) rotate(40)"><path d="M0,0 Q -4,12 0,24 Q 4,12 0,0 Z"/></g>' +
        '<g transform="translate(180, 170) rotate(-50)"><path d="M0,0 Q -4,12 0,24 Q 4,12 0,0 Z"/></g>' +
        '<g transform="translate(160, 210) rotate(-40)"><path d="M0,0 Q -4,12 0,24 Q 4,12 0,0 Z"/></g>' +
        '<g transform="translate(140, 240) rotate(-30)"><path d="M0,0 Q -4,12 0,24 Q 4,12 0,0 Z"/></g>' +
        '<g transform="translate(260, 40) rotate(20)"><path d="M0,0 Q -3,10 0,20 Q 3,10 0,0 Z"/></g>' +
        '<g transform="translate(210, 120) rotate(-20)"><path d="M0,0 Q -3,10 0,20 Q 3,10 0,0 Z"/></g>' +
        '<g transform="translate(180, 230) rotate(10)"><path d="M0,0 Q -3,10 0,20 Q 3,10 0,0 Z"/></g>' +
      '</g>' +
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

  /* ================= 2b. 卡片阴影 SVG ================= */
  /*
   * canvas 的 shadowBlur 不受变换矩阵影响，dpr=1/2/3 与导出 scale=2 下
   * 阴影相对尺寸各不相同 —— 这是各端样式不一致的根因。
   * 改成预渲染 SVG 位图后，drawImage 做等比重采样，全平台同一效果。
   */

  // 八角：viewBox 260×260，卡片本体位于 (40,40)-(220,220)，尺寸 180
  var OCT_SHADOW_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="1040" height="1040" viewBox="0 0 260 260">' +
    '<defs>' +
    '<filter id="o1" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3.5"/></filter>' +
    '<filter id="o2" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="11"/></filter>' +
    '</defs>' +
    '<g transform="translate(0,10)">' +
    '<path d="M92.74 40 L167.26 40 L220 92.74 L220 167.26 L167.26 220 L92.74 220 L40 167.26 L40 92.74 Z" fill="rgba(0,0,0,0.10)" filter="url(#o2)"/>' +
    '<path d="M92.74 40 L167.26 40 L220 92.74 L220 167.26 L167.26 220 L92.74 220 L40 167.26 L40 92.74 Z" fill="rgba(0,0,0,0.17)" filter="url(#o1)"/>' +
    '</g></svg>';

  // 抽屉：viewBox 260×110，胶囊位于 (20,20) 尺寸 220×46，圆角 12
  var DRAWER_SHADOW_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="1040" height="440" viewBox="0 0 260 110">' +
    '<defs>' +
    '<filter id="d1" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.5"/></filter>' +
    '<filter id="d2" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="7"/></filter>' +
    '</defs>' +
    '<g transform="translate(0,6)">' +
    '<rect x="20" y="20" width="220" height="46" rx="12" fill="rgba(0,0,0,0.10)" filter="url(#d2)"/>' +
    '<rect x="20" y="20" width="220" height="46" rx="12" fill="rgba(0,0,0,0.16)" filter="url(#d1)"/>' +
    '</g></svg>';

  var shadowCache = { oct: null, drawer: null };

  function ensureShadow(key, svg, cb) {
    var slot = shadowCache[key];
    if (!slot) {
      slot = shadowCache[key] = { img: null, loaded: false, waiters: [] };
      (function (s) {
        var im = new Image();
        im.onload = function () { s.img = im; s.loaded = true; flushShadow(s); };
        im.onerror = function () { s.img = null; s.loaded = true; flushShadow(s); };
        im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
      })(slot);
    }
    if (slot.loaded) { cb(slot.img); return; }
    slot.waiters.push(cb);
  }

  function flushShadow(slot) {
    var q = slot.waiters;
    slot.waiters = [];
    for (var i = 0; i < q.length; i++) { try { q[i](slot.img); } catch (e) {} }
  }

  function getShadow(key) {
    var s = shadowCache[key];
    return s && s.loaded ? s.img : null;
  }

  var assetsReady = false;

  function ensureAssets(cb) {
    if (assetsReady) { cb(); return; }
    var pending = 3;
    function tick() { if (--pending === 0) { assetsReady = true; cb(); } }
    ensureBranch(tick);
    ensureShadow('oct', OCT_SHADOW_SVG, tick);
    ensureShadow('drawer', DRAWER_SHADOW_SVG, tick);
  }

  /* ================= 3. 核心绘制组件 ================= */

  /* 时间用左背景色、信号/电池用右背景色（分裂背景下二者底色不同） */
  function drawStatus(ctx, timeColor, iconColor, time, island) {
    var W = L.W;

    ctx.fillStyle = timeColor;
    ctx.font = '600 14px ' + F_SANS;
    ctx.textAlign = 'left';
    ctx.fillText(time, 24, 32);

    ctx.fillStyle = iconColor;
    var sx = W - 64, sy = 28;
    ctx.fillRect(sx, sy - 4, 3, 4);
    ctx.fillRect(sx + 5, sy - 6, 3, 6);
    ctx.fillRect(sx + 10, sy - 8, 3, 8);
    ctx.fillRect(sx + 15, sy - 10, 3, 10);

    var bx = W - 38, by = 18;
    ctx.strokeStyle = iconColor;
    ctx.lineWidth = 1;
    ctx.strokeRect(bx, by, 18, 10);
    ctx.fillStyle = iconColor;
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

    // ① SVG 阴影（位图，等比缩放，全端一致）
    var sh = getShadow('oct');
    if (sh) {
      var k = s / 180;
      ctx.drawImage(sh, x - 40 * k, y - 40 * k, 260 * k, 260 * k);
    }

    // ② 卡片本体
    ctx.save();
    octPath(ctx, x, y, s, s);
    ctx.fillStyle = item.bg;
    ctx.fill();
    ctx.restore();

    // ③ 内描边
    ctx.save();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = isLight(item.color) ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.15)';
    var inset = 14;
    octPath(ctx, x + inset, y + inset, s - inset * 2, s - inset * 2);
    ctx.stroke();
    ctx.restore();

    // ④ 文字
    ctx.save();
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

    // ① SVG 阴影
    var sh = getShadow('drawer');
    if (sh) ctx.drawImage(sh, x - 20, y - 20, 260, 110);

    // ② 胶囊本体
    ctx.save();
    roundRectPath(ctx, x, y, w, h, L.DRAWER_R);
    ctx.fillStyle = item.bg;
    ctx.fill();
    ctx.clip();

    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fillRect(x, y, 6, h);

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

    drawStatus(ctx, m.statusTimeColor, m.statusIconColor, m.time, m.showIsland);

    ctx.save();
    ctx.fillStyle = m.titleColor;
    ctx.font = '600 ' + m.title.fs + 'px ' + F_DISPLAY;
    fillRun(ctx, m.title.text, W / 2, 120, m.title.ls, 'center');
    ctx.restore();

    ctx.save();
    ctx.fillStyle = m.subColor;
    ctx.font = '12px ' + F_SANS;
    fillRun(ctx, m.sub.text, W / 2, 148, m.sub.ls, 'center');
    ctx.restore();

    m.items.forEach(function (it) {
      if (it.type === 'octagon') drawOctagonCard(ctx, it.x, it.y, it);
      else drawDrawer(ctx, it.x, it.y, it);
    });

    ctx.save();
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

  function buildLeftModel(colors, genNames, texts) {
    var a = safeColor(colors[0]);
    var b = safeColor(colors[2]);
    var hexA = C.rgbToHex(a);
    var hexB = C.rgbToHex(b);

    // 标题 / 副标题居中于中线，跨两种底色 → 取两者中的最差对比度
    var tc = pickText([hexA, hexB]);

    return {
      splitBg: true,
      bgLeft: hexA,
      bgRight: hexB,
      statusTimeColor: pickText([hexA]),   // 时间落在左半
      statusIconColor: pickText([hexB]),   // 信号 / 电池落在右半
      titleColor: tc,
      subColor: tc,
      title: { text: texts.titleLeft, fs: texts.tInfoL.fs, ls: texts.tInfoL.ls },
      sub: { text: texts.pLeft, ls: texts.lsLeft },
      items: [
        {
          type: 'octagon', x: 70, y: 200,
          bg: hexA, color: pickText([hexA]),
          subtitle: texts.subtitle, mainTitle: extractName(genNames[0]),
          info: ['RGB:' + rgbStr(a), hexA]
        },
        {
          type: 'octagon', x: 70, y: 410,
          bg: hexB, color: pickText([hexB]),
          subtitle: texts.subtitle, mainTitle: extractName(genNames[2]),
          info: ['RGB:' + rgbStr(b), hexB]
        }
      ],
      footerText: texts.footerText,
      footerColor: pickText([hexB]),       // 页脚在右下，压右半底色
      showIsland: false,
      time: texts.time
    };
  }

  function buildRightModel(colors, ruleColors, ruleNames, genNames, ruleName, texts) {
    var bg = safeColor(colors[0]);
    var main = safeColor(colors[2]);
    var hexBg = C.rgbToHex(bg);
    var mainHex = C.rgbToHex(main);
    var tc = pickText([hexBg]);
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
      bg: mainHex, color: pickText([mainHex]),
      subtitle: texts.subtitle, mainTitle: extractName(genNames[2]),
      info: ['RGB:' + rgbStr(main), mainHex]
    }];

    var startY = 400;
    cards.slice(1).forEach(function (c, idx) {
      var hex = C.rgbToHex(c);
      items.push({
        type: 'drawer', x: 50, y: startY + idx * (L.DRAWER_H + 15),
        bg: hex, color: pickText([hex]),
        title: extractName(ruleNames[idx + 1]), hex: hex
      });
    });

    return {
      splitBg: false,
      bgLeft: hexBg,
      bgRight: hexBg,
      statusTimeColor: tc,
      statusIconColor: tc,
      titleColor: tc,
      subColor: tc,
      title: { text: texts.titleRight, fs: texts.tInfoR.fs, ls: texts.tInfoR.ls },
      sub: { text: texts.pRight, ls: texts.lsRight },
      items: items,
      footerText: texts.footerText,
      footerColor: tc,
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
    'display:block;width:100%;height:auto;aspect-ratio:' + L.W + '/' + L.H + ';' +
    /* ↓ 新增两行：圆角对齐 + 拟物阴影（引用站点令牌，自动跟随亮/暗主题） */
    'border-radius:' + (40 / L.W * 100) + '% / ' + (40 / L.H * 100) + '%;' +
    'box-shadow: var(--nm-out-lg);' +
    '}';
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
    if (!assetsReady) ensureAssets(paint);
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

    ensureAssets(function () {
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