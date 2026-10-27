/* ============================================================
 * color-swatch.js —— ACO / ASE 色板导出
 * 依赖：color-math.js、color-names.js
 * 导出：window.CO_Swatch
 * ============================================================ */
(function (global) {
  'use strict';

  var C = global.CO_Color;
  var N = global.CO_Names;
  var ChineseColors = N.ChineseColors;

  var SwatchWriter = {
    _unique: function (colors) {
      var seen = Object.create(null), out = [];
      colors.forEach(function (c) {
        if (seen[c.hex]) return;
        seen[c.hex] = true;
        out.push(c);
      });
      return out.slice(0, 256);
    },

    createACO: function (colors) {
      var uniq = this._unique(colors);
      var nameOf = function (c) { return ChineseColors.name(c.hex); };

      var size = 4 + uniq.length * 10 + 4;
      uniq.forEach(function (c) { size += 10 + 4 + (nameOf(c).length + 1) * 2; });

      var buf = new ArrayBuffer(size), view = new DataView(buf), off = 0;

      view.setUint16(off, 1, false); off += 2;
      view.setUint16(off, uniq.length, false); off += 2;
      uniq.forEach(function (c) {
        view.setUint16(off, 0, false); off += 2;
        view.setUint16(off, c.r * 257, false); off += 2;
        view.setUint16(off, c.g * 257, false); off += 2;
        view.setUint16(off, c.b * 257, false); off += 2;
        view.setUint16(off, 0, false); off += 2;
      });

      view.setUint16(off, 2, false); off += 2;
      view.setUint16(off, uniq.length, false); off += 2;
      uniq.forEach(function (c) {
        view.setUint16(off, 0, false); off += 2;
        view.setUint16(off, c.r * 257, false); off += 2;
        view.setUint16(off, c.g * 257, false); off += 2;
        view.setUint16(off, c.b * 257, false); off += 2;
        view.setUint16(off, 0, false); off += 2;

        var name = nameOf(c);
        view.setUint32(off, name.length + 1, false); off += 4;
        for (var i = 0; i < name.length; i++) { view.setUint16(off, name.charCodeAt(i), false); off += 2; }
        view.setUint16(off, 0, false); off += 2;
      });

      return new Blob([new Uint8Array(buf)], { type: 'application/x-photoshop-color-swatch' });
    },

    createASE: function (colors) {
      var uniq = this._unique(colors);
      var nameOf = function (c) { return ChineseColors.name(c.hex); };

      var buf = new ArrayBuffer(1024 * 200), view = new DataView(buf), off = 0;

      view.setUint8(off++, 0x41); view.setUint8(off++, 0x53);
      view.setUint8(off++, 0x45); view.setUint8(off++, 0x46);
      view.setUint16(off, 1, false); off += 2;
      view.setUint32(off, uniq.length, false); off += 4;

      uniq.forEach(function (c) {
        var name = nameOf(c);
        var blockLen = 2 + (name.length * 2 + 2) + 4 + 12 + 2;

        view.setUint16(off, 1, false); off += 2;
        view.setUint32(off, blockLen, false); off += 4;

        view.setUint16(off, name.length + 1, false); off += 2;
        for (var i = 0; i < name.length; i++) { view.setUint16(off, name.charCodeAt(i), false); off += 2; }
        view.setUint16(off, 0, false); off += 2;

        view.setUint8(off++, 0x52); view.setUint8(off++, 0x47);
        view.setUint8(off++, 0x42); view.setUint8(off++, 0x20);
        view.setFloat32(off, c.r / 255, false); off += 4;
        view.setFloat32(off, c.g / 255, false); off += 4;
        view.setFloat32(off, c.b / 255, false); off += 4;
        view.setUint16(off, 2, false); off += 2;
      });

      return new Blob([new Uint8Array(buf, 0, off)], { type: 'application/octet-stream' });
    }
  };

  global.CO_Swatch = SwatchWriter;

})(window);