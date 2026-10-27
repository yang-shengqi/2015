/* ============================================================
 * color-harmony.js —— 色彩调和算法 (修复单色过暗)
 * ============================================================ */
(function (global) {
  'use strict';
  var C = global.CO_Color;
  var clamp = C.clamp, rgbToOklch = C.rgbToOklch, oklchToRgb = C.oklchToRgb, roundRgb = C.roundRgb;

  var rot = function (o, d) { return { L: o.L, C: o.C, h: (o.h + d + 360) % 360 }; };
  var sh = function (o, dL, cMul) {
    return { L: clamp(o.L + dL, 0.12, 0.97), C: o.C * (cMul == null ? 1 : cMul), h: o.h };
  };

  var RULES = {
    comp:   function (b) { var c = rot(b, 180); return [c, sh(b, -0.16), b, sh(b, 0.2, 0.45), sh(c, 0.14, 0.7)]; },
    analog: function (b) { return [rot(b, 20), sh(rot(b, -40), -0.06), rot(b, -20), b, sh(rot(b, 40), 0.06)]; },
    triad:  function (b) { return [rot(b, 120), b, rot(b, 240), sh(b, 0.22, 0.25), sh(b, -0.26, 0.6)]; },
    split:  function (b) { return [rot(b, 150), b, rot(b, 210), sh(b, 0.22, 0.3), sh(b, -0.26, 0.7)]; },
    square: function (b) { return [rot(b, 90), b, rot(b, 180), rot(b, 270), sh(b, 0.26, 0.15)]; },
    // 👇 修复单色死黑：把下调幅度改小，保留色彩
    mono:   function (b) { return [sh(b, -0.18, 0.8), sh(b, -0.08, 0.95), b, sh(b, 0.1, 0.7), sh(b, 0.2, 0.4)]; }
  };

  function generateColors(baseRgb, ruleName) {
    var base = rgbToOklch(baseRgb);
    if (base.C < 0.02) base.C = 0.02;
    var fn = RULES[ruleName] || RULES.comp;
    return fn(base).map(function (o) { return roundRgb(oklchToRgb(o)); });
  }

  global.CO_Harmony = { rot: rot, sh: sh, RULES: RULES, generateColors: generateColors };
})(window);