/* ============================================================
 * color-filter.js —— 色库滤镜与智能取名（相似度透明版）
 * ============================================================ */
(function (global) {
  'use strict';
  var C = global.CO_Color;
  var rgbToOklab = C.rgbToOklab;

  function toHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  function matchColorInPalette(rgb, palette, usedSet) {
        // 👇 如果没传 palette（无限制模式），自动把 4 大色库全部合并！全库找名字！
    if (!palette) {
        palette = [];
        if (global.CO_Names.CN_PALETTE) palette = palette.concat(global.CO_Names.CN_PALETTE);
        if (global.CO_Names.JP_PALETTE) palette = palette.concat(global.CO_Names.JP_PALETTE);
        if (global.CO_Names.MORANDI_PALETTE) palette = palette.concat(global.CO_Names.MORANDI_PALETTE);
        if (global.CO_Names.CYBER_PALETTE) palette = palette.concat(global.CO_Names.CYBER_PALETTE);
    }
    var NO_STD_NAME = (global.CO_I18N && typeof global.CO_I18N.t === 'function') ? global.CO_I18N.t('noStandardName') : "无标准名称";

    if (!rgb || !palette.length) return { rgb: rgb, name: NO_STD_NAME, similarity: '0%', isDuplicate: false };

    var lab = rgbToOklab(rgb.r, rgb.g, rgb.b);
    var srcHsl = toHsl(rgb.r, rgb.g, rgb.b);
    var SRC_COLOR_THRESHOLD = 8; 

    var match = findBest(lab, srcHsl, palette, 35, SRC_COLOR_THRESHOLD, 0.35);
    if (!match) match = findBest(lab, srcHsl, palette, 55, SRC_COLOR_THRESHOLD, 0.45);

    if (!match) return { rgb: rgb, name: NO_STD_NAME, similarity: '0%', isDuplicate: false };

    var finalName = match.name;
    var distance = Math.sqrt(match.dist);
    // 换算为 0~100% 的相似度
    var similarity = Math.max(0, 100 - distance * 100); 
    
    // 保留一位小数
    var simStr = similarity.toFixed(1) + '%';

    if (usedSet && usedSet.has(finalName)) {
      // 如果相似度 >= 80%，允许同名，并给出数值
      if (similarity >= 80) {
        return { rgb: match.rgb, name: finalName, similarity: simStr, isDuplicate: true };
      } else {
        return { rgb: rgb, name: "无标准名称" };
      }
    }

    return { rgb: match.rgb, name: finalName, similarity: simStr, isDuplicate: (similarity < 100) };
  }

  function findBest(lab, srcHsl, palette, maxDiff, colorThreshold, maxLDiff) {
    var bestMatch = null;
    var minDist = Infinity;
    var isGray = srcHsl.s <= colorThreshold;

    for (var i = 0; i < palette.length; i++) {
      var p = palette[i];
      var cHsl = toHsl(p.rgb.r, p.rgb.g, p.rgb.b);

      var lDiff = Math.abs(lab.L - p.lab.L);
      if (lDiff > maxLDiff) continue;

      if (!isGray) {
        if (cHsl.s < 8) continue;
        var hueDiff = Math.abs(srcHsl.h - cHsl.h);
        if (hueDiff > 180) hueDiff = 360 - hueDiff;
        if (hueDiff > maxDiff) continue; 
      } else {
        if (cHsl.s > 15) continue;
      }

      var dL = lab.L - p.lab.L;
      var da = lab.a - p.lab.a;
      var db = lab.b - p.lab.b;
      var dist = dL * dL + da * da + db * db;

      if (dist < minDist) {
        minDist = dist;
        bestMatch = { name: p.name, rgb: p.rgb, dist: dist };
      }
    }
    return bestMatch;
  }

  global.CO_Filter = { matchColorInPalette: matchColorInPalette };
})(window);