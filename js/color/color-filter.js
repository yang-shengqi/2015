/* ============================================================
 * color-filter.js —— 色库滤镜与智能取名（终极稳定版）
 * 职责：绝对按色相区间、明度区间进行刚性匹配，彻底封杀跨色系乱跳。
 * ============================================================ */
(function (global) {
  'use strict';
  var C = global.CO_Color;
  var rgbToOklab = C.rgbToOklab;

  // 内置 HSL 计算
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
    if (!palette) palette = global.CO_Names.CN_PALETTE;
    if (!rgb || !palette.length) return { rgb: rgb, name: "未知" };

    var lab = rgbToOklab(rgb.r, rgb.g, rgb.b);
    var srcHsl = toHsl(rgb.r, rgb.g, rgb.b);
    
    // 饱和度门槛：大于 8 认为它是有彩色的，不能去匹配灰白
    var SRC_COLOR_THRESHOLD = 8; 

    // 第一阶段：最严格的限制（35度色相差，不许明度过大跨度）
    var match = findBest(lab, srcHsl, palette, usedSet, 35, SRC_COLOR_THRESHOLD, 0.35);
    
    // 第二阶段：如果没找到，或者找到了但名字重复了，放宽到 55 度
    if (!match || (usedSet && usedSet.has(match.name))) {
      var matchLoose = findBest(lab, srcHsl, palette, usedSet, 55, SRC_COLOR_THRESHOLD, 0.45);
      if (matchLoose) match = matchLoose;
    }

    // 第三阶段兜底：如果因为防重名导致一个都没选出来，退回放宽色相，但依然防重名
    if (!match) {
      for (var i = 0; i < palette.length; i++) {
        var p = palette[i];
        var cHsl = toHsl(p.rgb.r, p.rgb.g, p.rgb.b);
        var hDiff = Math.abs(srcHsl.h - cHsl.h);
        if (hDiff > 180) hDiff = 360 - hDiff;
        if (hDiff <= 60 && (!usedSet || !usedSet.has(p.name))) {
           match = p;
           break;
        }
      }
    }

    // 最后兜底：如果连第三阶段都没选出来，允许重名
    if (!match) {
      for (var j = 0; j < palette.length; j++) {
        var p2 = palette[j];
        var cHsl2 = toHsl(p2.rgb.r, p2.rgb.g, p2.rgb.b);
        var hDiff2 = Math.abs(srcHsl.h - cHsl2.h);
        if (hDiff2 > 180) hDiff2 = 360 - hDiff2;
        if (hDiff2 <= 60) {
           match = p2;
           break;
        }
      }
    }

    return { 
      rgb: match ? match.rgb : rgb, 
      name: match ? match.name : "未知" 
    };
  }

  function findBest(lab, srcHsl, palette, usedSet, maxDiff, colorThreshold, maxLDiff) {
    var bestMatch = null;
    var minDist = Infinity;
    var isGray = srcHsl.s <= colorThreshold;

    for (var i = 0; i < palette.length; i++) {
      var p = palette[i];
      var cHsl = toHsl(p.rgb.r, p.rgb.g, p.rgb.b);

      // 1. 明度（L值）绝对鸿沟隔离：一明一暗绝不可匹配
      var lDiff = Math.abs(lab.L - p.lab.L);
      if (lDiff > maxLDiff) continue;

      // 2. 饱和度与色相限制
      if (!isGray) {
        // 目标是彩色，绝不匹配灰白
        if (cHsl.s < 8) continue;

        // 色相跨度限制
        var hueDiff = Math.abs(srcHsl.h - cHsl.h);
        if (hueDiff > 180) hueDiff = 360 - hueDiff;
        if (hueDiff > maxDiff) continue; 
      } else {
        // 目标是灰白，不匹配鲜艳颜色
        if (cHsl.s > 15) continue;
      }

      // 3. 计算 OKLab 距离
      var dL = lab.L - p.lab.L;
      var da = lab.a - p.lab.a;
      var db = lab.b - p.lab.b;
      var dist = dL * dL + da * da + db * db;

      // 4. 防重名惩罚：如果已被使用，加 10.0 的天文数字惩罚
      if (usedSet && usedSet.has(p.name)) {
        dist += 10.0; 
      }

      if (dist < minDist) {
        minDist = dist;
        bestMatch = p;
      }
    }
    return bestMatch;
  }

  global.CO_Filter = { matchColorInPalette: matchColorInPalette };
})(window);