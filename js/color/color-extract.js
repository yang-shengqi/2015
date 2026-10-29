/* ============================================================
 * color-extract.js —— 图片取色（OKLab 聚类）
 * ============================================================ */
(function (global) {
  'use strict';

  var C = global.CO_Color;
  var rgbToOklab = C.rgbToOklab;
  var rgbToHsl = C.rgbToHsl;
  var rgbToHex = C.rgbToHex;

  var EXTRACT_SIZE = 200;
  var EXTRACT_STEP = 4;
  var CLUSTER_THRESHOLD = 0.06;
  var MAX_CLUSTERS = 250;

  function ColorExtractor() {
    this.c = document.createElement('canvas');
    this.ctx = this.c.getContext('2d');
  }

  ColorExtractor.prototype.extract = function (img, num) {
    num = num || 128;
    var w = EXTRACT_SIZE, h = EXTRACT_SIZE;
    this.c.width = w; this.c.height = h;
    this.ctx.clearRect(0, 0, w, h);
    this.ctx.drawImage(img, 0, 0, w, h);

    var d = this.ctx.getImageData(0, 0, w, h).data;
    var pixels = [];

    for (var y = 0; y < h; y += EXTRACT_STEP) {
      for (var x = 0; x < w; x += EXTRACT_STEP) {
        var i = (y * w + x) * 4;
        if (d[i + 3] <= 128) continue;
        pixels.push({ r: d[i], g: d[i + 1], b: d[i + 2] });
      }
    }

    var clusters = this._cluster(pixels);
    clusters.sort(function (a, b) { return b.n - a.n; });

    return {
      colors: clusters.slice(0, num).map(function (c) {
        var hsl = rgbToHsl(c.r, c.g, c.b);
        return {
          r: c.r, g: c.g, b: c.b, count: c.n,
          hex: rgbToHex(c),
          h: hsl.h / 360, s: hsl.s / 100, l: hsl.l / 100
        };
      }),
      total: clusters.reduce(function (s, c) { return s + c.n; }, 0)
    };
  };

  ColorExtractor.prototype._cluster = function (pixels) {
    var clusters = [];
    var th2 = CLUSTER_THRESHOLD * CLUSTER_THRESHOLD;

    for (var p = 0; p < pixels.length; p++) {
      var px = pixels[p];
      var lab = rgbToOklab(px.r, px.g, px.b);

      var best = -1, bestD = th2;
      for (var k = 0; k < clusters.length; k++) {
        var c = clusters[k];
        var dL = lab.L - c.L, da = lab.a - c.a, db = lab.b - c.b;
        var dd = dL * dL + da * da + db * db;
        if (dd < bestD) { bestD = dd; best = k; }
      }

      if (best >= 0) {
        var t = clusters[best];
        var n1 = t.n + 1;
        t.L = (t.L * t.n + lab.L) / n1;
        t.a = (t.a * t.n + lab.a) / n1;
        t.b = (t.b * t.n + lab.b) / n1;
        t.r = (t.r * t.n + px.r) / n1;
        t.g = (t.g * t.n + px.g) / n1;
        t.blue = (t.blue * t.n + px.b) / n1; // 👈 改成 blue
        t.n = n1;
      } else if (clusters.length < MAX_CLUSTERS) {
        clusters.push({
          L: lab.L, a: lab.a, b: lab.b,
          r: px.r, g: px.g, blue: px.b, n: 1 // 👈 改成 blue
        });
      } else {
        var nearest = null, minDist = Infinity;
        for (var k2 = 0; k2 < clusters.length; k2++) {
          var c2 = clusters[k2];
          var d2 = Math.pow(px.r - c2.r, 2) + Math.pow(px.g - c2.g, 2) + Math.pow(px.b - c2.blue, 2); // 👈 改成 blue
          if (d2 < minDist) { minDist = d2; nearest = c2; }
        }
        if (nearest) {
          var n2 = nearest.n + 1;
          nearest.r = (nearest.r * nearest.n + px.r) / n2;
          nearest.g = (nearest.g * nearest.n + px.g) / n2;
          nearest.blue = (nearest.blue * nearest.n + px.b) / n2; // 👈 改成 blue
          nearest.n = n2;
        }
      }
    }

    return clusters.map(function (c) {
      return { r: Math.round(c.r), g: Math.round(c.g), b: Math.round(c.blue), n: c.n }; // 👈 这里输出时换回 b
    });
  };

  global.CO_Extract = {
    ColorExtractor: ColorExtractor,
    EXTRACT_SIZE: EXTRACT_SIZE,
    EXTRACT_STEP: EXTRACT_STEP,
    CLUSTER_THRESHOLD: CLUSTER_THRESHOLD,
    MAX_CLUSTERS: MAX_CLUSTERS
  };

})(window);