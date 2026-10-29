(function (global) {
  'use strict';

  var C = global.CO_Color;

  function drawWheel(ctx, colors, config, opts) {
    opts = opts || {};
    var width  = opts.size || ctx.canvas.width;
    var height = opts.size || ctx.canvas.height;
    var cx = width / 2, cy = height / 2, r = width * 0.38;

    var pool = colors.slice().sort(function (a, b) { return a.h - b.h; });
    if (!pool.length) return;

    ctx.clearRect(0, 0, width, height);
    pool.forEach(function (c, i) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r,
        i * (Math.PI * 2 / pool.length) - Math.PI / 2,
        (i + 1) * (Math.PI * 2 / pool.length) - Math.PI / 2);
      ctx.fillStyle = c.hex;
      ctx.fill();
    });

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath(); ctx.arc(cx, cy, width * 0.22, 0, Math.PI * 2); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    if (config.stroke) {
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.lineWidth = width * 0.006;
      ctx.strokeStyle = config.strokeColor;
      ctx.stroke();
    }
  }

  function drawHex(ctx, colors, config, opts) {
    opts = opts || {};
    var width  = opts.size || ctx.canvas.width;
    var height = opts.size || ctx.canvas.height;
    ctx.clearRect(0, 0, width, height);

    var cx = width / 2, cy = height / 2, hr = width * 0.06, cells = [];

    for (var q = -4; q <= 4; q++) {
      for (var r = Math.max(-4, -q - 4); r <= Math.min(4, -q + 4); r++) {
        var x = cx + hr * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
        var y = cy + hr * (1.5 * r);
        cells.push({ x: x, y: y, a: Math.atan2(y - cy, x - cx) });
      }
    }
    cells.sort(function (a, b) { return a.a - b.a; });

    var pool = colors.slice(0, 61).sort(function (a, b) { return a.h - b.h; });
    if (!pool.length) return;

    cells.forEach(function (cell, i) {
      var c = pool[i % pool.length];
      ctx.beginPath();
      for (var j = 0; j < 6; j++) {
        var ang = Math.PI / 3 * j + Math.PI / 6;
        var px = cell.x + hr * Math.cos(ang), py = cell.y + hr * Math.sin(ang);
        j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = c.hex;
      ctx.fill();
      if (config.stroke) {
        ctx.lineWidth = width * 0.006;
        ctx.strokeStyle = config.strokeColor;
        ctx.stroke();
      }
    });
  }

  global.CO_Canvas = { drawWheel: drawWheel, drawHex: drawHex };

})(window);