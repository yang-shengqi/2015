/* ============================================================
 * color-harmony.js —— 国际标准色相环 + 完美递减灰度
 * ============================================================ */
(function (global) {
  'use strict';
  var C = global.CO_Color;
  var rgbToOklch = C.rgbToOklch, oklchToRgb = C.oklchToRgb, roundRgb = C.roundRgb;

  var RULES = {
    comp: function (b) { return [b, { L: b.L, C: b.C, h: (b.h + 180) % 360 }]; },
    analog: function (b) { return [b, { L: b.L, C: b.C, h: (b.h + 30) % 360 }]; },
    triad:  function (b) { return [b, { L: b.L, C: b.C, h: (b.h + 120) % 360 }, { L: b.L, C: b.C, h: (b.h + 240) % 360 }]; },
    split:  function (b) { return [b, { L: b.L, C: b.C, h: (b.h + 150) % 360 }, { L: b.L, C: b.C, h: (b.h + 210) % 360 }]; },
    square: function (b) { return [b, { L: b.L, C: b.C, h: (b.h + 90) % 360 }, { L: b.L, C: b.C, h: (b.h + 180) % 360 }, { L: b.L, C: b.C, h: (b.h + 270) % 360 }]; },
    
    // 🔥 完美递减的灰度
    mono: function (b) { 
      // 1. 提取主色的明度，但强制限制在 30% ~ 70% 之间，防止极亮/极暗破坏阶梯
      var L3 = Math.max(0.30, Math.min(0.70, b.L)); 
      
      // 2. 基于这个安全明度，向两边平滑展开
      var L1 = 0.98; // 极白
      var L2 = Math.max(0.75, L3 + 0.10); // 浅灰（必定比中间亮）
      var L4 = Math.min(0.30, L3 - 0.10); // 深灰（必定比中间暗）
      var L5 = 0.05; // 极黑

      return [
        { L: L1, C: 0, h: b.h }, // 1. 极浅灰
        { L: L2, C: 0, h: b.h }, // 2. 浅灰
        { L: L3, C: 0, h: b.h }, // 3. 主色灰度
        { L: L4, C: 0, h: b.h }, // 4. 深灰
        { L: L5, C: 0, h: b.h }  // 5. 极深灰
      ];
    }
  };

  function generateColors(baseRgb, ruleName) {
    var base = rgbToOklch(baseRgb);
    var fn = RULES[ruleName] || RULES.comp;
    return fn(base).map(function (o) { 
      return roundRgb(oklchToRgb(o)); 
    });
  }

  global.CO_Harmony = { RULES: RULES, generateColors: generateColors };
})(window);