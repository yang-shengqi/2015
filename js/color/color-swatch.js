/* ============================================================
 * color-swatch.js —— ACO / ASE 色板导出（企业级无 BUG 修复版）
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

    _getName: function (c) {
      try {
        var n = ChineseColors.name(c.hex);
        return n ? String(n) : 'Color';
      } catch (e) {
        return 'Color';
      }
    },

    createACO: function (colors) {
      var uniq = this._unique(colors);
      var self = this;

      // 预计算所需字节数（防止越界）
      var size = 4 + uniq.length * 10 + 4;
      uniq.forEach(function (c) {
        var name = self._getName(c);
        size += 10 + 4 + (name.length + 1) * 2;
      });

      var buf = new ArrayBuffer(size), view = new DataView(buf), off = 0;

      // 1. 颜色数据块 (Type 1)
      view.setUint16(off, 1, false); off += 2;
      view.setUint16(off, uniq.length, false); off += 2;
      uniq.forEach(function (c) {
        view.setUint16(off, 0, false); off += 2;
        view.setUint16(off, c.r * 257, false); off += 2;
        view.setUint16(off, c.g * 257, false); off += 2;
        view.setUint16(off, c.b * 257, false); off += 2;
        view.setUint16(off, 0, false); off += 2;
      });

      // 2. 颜色名称块 (Type 2)
      view.setUint16(off, 2, false); off += 2;
      view.setUint16(off, uniq.length, false); off += 2;
      uniq.forEach(function (c) {
        view.setUint16(off, 0, false); off += 2;
        view.setUint16(off, c.r * 257, false); off += 2;
        view.setUint16(off, c.g * 257, false); off += 2;
        view.setUint16(off, c.b * 257, false); off += 2;
        view.setUint16(off, 0, false); off += 2;

        var name = self._getName(c);
        view.setUint32(off, name.length + 1, false); off += 4;
        for (var i = 0; i < name.length; i++) {
          view.setUint16(off, name.charCodeAt(i), false); off += 2;
        }
        view.setUint16(off, 0, false); off += 2;
      });

      return new Blob([new Uint8Array(buf)], { type: 'application/x-photoshop-color-swatch' });
    },

    createASE: function (colors) {
      var uniq = this._unique(colors);
      var self = this;

      // 精准计算所需内存，绝不截断
      var totalSize = 12; 
      var blocks = uniq.map(function (c) {
        var name = self._getName(c);
        // 块长度 = 2字节(Name长度) + (名称字符数 + 1个\0)*2 + 4字节(颜色模型) + 12字节(RGB浮点数) + 2字节(颜色类型)
        var nameBytes = 2 + (name.length + 1) * 2;
        var colorBytes = 4 + 12 + 2;
        var blockLen = nameBytes + colorBytes;
        totalSize += 6 + blockLen; // 6 = 2字节块类型 + 4字节块长度
        return { c: c, name: name, blockLen: blockLen };
      });

      var buf = new ArrayBuffer(totalSize), view = new DataView(buf), off = 0;

      // 1. 写入 ASE 文件头
      view.setUint8(off++, 0x41); // A
      view.setUint8(off++, 0x53); // S
      view.setUint8(off++, 0x45); // E
      view.setUint8(off++, 0x46); // F
      view.setUint16(off, 1, false); off += 2; // 主版本号 1
      view.setUint16(off, 0, false); off += 2; // 👈 加上这行：次版本号 0
      view.setUint32(off, blocks.length, false); off += 4; // 色块数量

      // 2. 写入每个色块
      blocks.forEach(function (b) {
        var c = b.c;
        var name = b.name;

        view.setUint16(off, 1, false); off += 2; // 块类型 1 = 颜色块
        view.setUint32(off, b.blockLen, false); off += 4; // 块长度

        // 写入名字
        view.setUint16(off, name.length + 1, false); off += 2;
        for (var i = 0; i < name.length; i++) {
          view.setUint16(off, name.charCodeAt(i), false); off += 2;
        }
        view.setUint16(off, 0, false); off += 2; // \0 结束符

        // 写入颜色模型 (RGB )
        view.setUint8(off++, 0x52); // R
        view.setUint8(off++, 0x47); // G
        view.setUint8(off++, 0x42); // B
        view.setUint8(off++, 0x20); // 空格
        view.setFloat32(off, c.r / 255, false); off += 4;
        view.setFloat32(off, c.g / 255, false); off += 4;
        view.setFloat32(off, c.b / 255, false); off += 4;
        view.setUint16(off, 2, false); off += 2; // 颜色类型 2 = 正常颜色
      });

      return new Blob([new Uint8Array(buf, 0, off)], { type: 'application/octet-stream' });
    }
  };

  global.CO_Swatch = SwatchWriter;

})(window);