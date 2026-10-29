/* ============================================================
 * color-math.js —— 色彩数学（纯函数，无 DOM、无 state）
 * 依赖：无
 * 导出：window.CO_Color
 * ============================================================ */
(function (global) {
  'use strict';

  var clamp = function (v, min, max) { return Math.min(max, Math.max(min, v)); };
  var roundRgb = function (c) { return { r: Math.round(c.r), g: Math.round(c.g), b: Math.round(c.b) }; };

  var srgbToLinear = function (c) { return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  var linearToSrgb = function (c) { return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; };

  function hexToRgb(hex) {
    var s = String(hex).trim().replace(/^#/, '');
    if (/^[0-9a-f]{3}$/i.test(s)) s = s.split('').map(function (c) { return c + c; }).join('');
    if (!/^[0-9a-f]{6}$/i.test(s)) return { r: 0, g: 0, b: 0 };
    return { r: parseInt(s.slice(0, 2), 16), g: parseInt(s.slice(2, 4), 16), b: parseInt(s.slice(4, 6), 16) };
  }

  function rgbToHex(c) {
    return '#' + [c.r, c.g, c.b].map(function (v) {
      return clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0');
    }).join('').toUpperCase();
  }

  function luminance(c) {
    return 0.2126 * srgbToLinear(c.r / 255)
         + 0.7152 * srgbToLinear(c.g / 255)
         + 0.0722 * srgbToLinear(c.b / 255);
  }

  function contrastRatio(a, b) {
    var la = luminance(a), lb = luminance(b);
    var hi = Math.max(la, lb), lo = Math.min(la, lb);
    return (hi + 0.05) / (lo + 0.05);
  }

  var WHITE = { r: 255, g: 255, b: 255 };
  var BLACK = { r: 17, g: 17, b: 17 };

  function textOn(bg, target) {
    target = target == null ? 4.5 : target;
    var cWhite = contrastRatio(WHITE, bg);
    var cBlack = contrastRatio(BLACK, bg);
    if (cWhite >= target && cWhite >= cBlack) return '#FFFFFF';
    if (cBlack >= target && cBlack >= cWhite) return '#111111';
    return cWhite >= cBlack ? '#FFFFFF' : '#111111';
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b), h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  function rgbToCmyk(r, g, b) {
    var c = 1 - r / 255, m = 1 - g / 255, y = 1 - b / 255;
    var k = Math.min(c, Math.min(m, y));
    if (k !== 1) { c = (c - k) / (1 - k); m = (m - k) / (1 - k); y = (y - k) / (1 - k); }
    else { c = m = y = 0; }
    return { c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) };
  }

  function rgbToOklab(r, g, b) {
    var lr = srgbToLinear(r / 255), lg = srgbToLinear(g / 255), lb = srgbToLinear(b / 255);
    var l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    var m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    var s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
    return {
      L: 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
      a: 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
      b: 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s
    };
  }

  function oklabToLinearRgb(L, a, b) {
    var l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    var m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    var s_ = L - 0.0894841775 * a - 1.2914855480 * b;
    var l = l_ * l_ * l_, m = m_ * m_ * m_, s = s_ * s_ * s_;
    return {
      r:  4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      b: -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    };
  }

  function inGamut(lin, eps) {
    eps = eps == null ? 1e-4 : eps;
    return lin.r >= -eps && lin.r <= 1 + eps
        && lin.g >= -eps && lin.g <= 1 + eps
        && lin.b >= -eps && lin.b <= 1 + eps;
  }

  function rgbToOklch(rgb) {
    var lab = rgbToOklab(rgb.r, rgb.g, rgb.b);
    var C = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
    var h = Math.atan2(lab.b, lab.a) * 180 / Math.PI;
    if (h < 0) h += 360;
    return { L: lab.L, C: C, h: h };
  }

  function oklchToRgb(o) {
    var L = clamp(o.L, 0, 1);
    var C = Math.max(0, o.C || 0);
    var rad = (o.h || 0) * Math.PI / 180;
    var cosH = Math.cos(rad), sinH = Math.sin(rad);

    var lin = oklabToLinearRgb(L, C * cosH, C * sinH);
    if (!inGamut(lin)) {
      var lo = 0, hi = C;
      for (var i = 0; i < 18; i++) {
        var mid = (lo + hi) / 2;
        var test = oklabToLinearRgb(L, mid * cosH, mid * sinH);
        if (inGamut(test)) lo = mid; else hi = mid;
      }
      lin = oklabToLinearRgb(L, lo * cosH, lo * sinH);
    }

    return {
      r: clamp(Math.round(linearToSrgb(clamp(lin.r, 0, 1)) * 255), 0, 255),
      g: clamp(Math.round(linearToSrgb(clamp(lin.g, 0, 1)) * 255), 0, 255),
      b: clamp(Math.round(linearToSrgb(clamp(lin.b, 0, 1)) * 255), 0, 255)
    };
  }

  function mixOklch(c1, c2, t) {
    t = clamp(t, 0, 1);
    var a = rgbToOklch(c1), b = rgbToOklch(c2);

    var hA = a.C > 1e-4 ? a.h : b.h;
    var hB = b.C > 1e-4 ? b.h : a.h;

    var dh = hB - hA;
    if (dh > 180) dh -= 360;
    if (dh < -180) dh += 360;

    return oklchToRgb({
      L: a.L + (b.L - a.L) * t,
      C: a.C + (b.C - a.C) * t,
      h: (hA + dh * t + 360) % 360
    });
  }

  function pushLight(rgb, minL) {
    var o = rgbToOklch(rgb);
    if (o.L >= minL) return rgb;
    return oklchToRgb({ L: minL, C: o.C * 0.4, h: o.h });
  }

  function pushDark(rgb, maxL) {
    var o = rgbToOklch(rgb);
    if (o.L <= maxL) return rgb;
    return oklchToRgb({ L: maxL, C: o.C * 0.6, h: o.h });
  }

  global.CO_Color = {
    clamp: clamp, roundRgb: roundRgb,
    srgbToLinear: srgbToLinear, linearToSrgb: linearToSrgb,
    hexToRgb: hexToRgb, rgbToHex: rgbToHex,
    luminance: luminance, contrastRatio: contrastRatio, textOn: textOn,
    WHITE: WHITE, BLACK: BLACK,
    rgbToHsl: rgbToHsl, rgbToCmyk: rgbToCmyk,
    rgbToOklab: rgbToOklab, oklabToLinearRgb: oklabToLinearRgb, inGamut: inGamut,
    rgbToOklch: rgbToOklch, oklchToRgb: oklchToRgb, mixOklch: mixOklch,
    pushLight: pushLight, pushDark: pushDark
  };

})(window);