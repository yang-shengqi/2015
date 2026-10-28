/* ============================================================
 * color-harmony.js —— 完美明度阶梯（反向对齐）
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
    
    mono: function (b) { 
      var results = [];
      // 🔥 把原本的 [10%, 30%, 50%, 70%, 90%] 反过来，变成 [90%, 70%, 50%, 30%, 10%]
      // 这样就是左边最亮，右边最暗，完美对齐你底部的色阶条！
      var steps = [0.9, 0.7, 0.5, 0.3, 0.1];
      
      for (var i = 0; i < 5; i++) {
        var pct = steps[i] * 100;
        var L, Cc;
        if (pct <= 50) {
          var t1 = pct / 50;
          L = 0.95 - t1 * (0.95 - b.L);
          Cc = t1 * b.C;
        } else {
          var t2 = (pct - 50) / 50;
          L = b.L - t2 * (b.L - 0.25);
          Cc = b.C - t2 * (b.C * 0.7);
        }
        results.push({ L: L, C: Cc, h: b.h });
      }
      
      // 强制把中间那个（索引2）替换为主色本身，确保绝对精准
      results[2] = b; 
      
      return results;
    }
  };

  function generateColors(baseRgb, ruleName) {
    var base = rgbToOklch(baseRgb);
    if (base.C < 0.02) base.C = 0.02;
    var fn = RULES[ruleName] || RULES.comp;
    return fn(base).map(function (o) { return roundRgb(oklchToRgb(o)); });
  }

  global.CO_Harmony = { RULES: RULES, generateColors: generateColors };
})(window);