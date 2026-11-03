/* ============================================================
 * color-export.js —— 三张 PNG 导出（保留 1080P 高清 + 防崩溃版）
 * ============================================================ */
(function (global) {
  'use strict';

  var C = global.CO_Color;
  var U = global.CO_Util;
  var Canvas = global.CO_Canvas;
  var clamp = C.clamp, $ = U.$;

  function t(key, vars) {
    if (global.CO_I18N && typeof global.CO_I18N.t === 'function') {
      var v = global.CO_I18N.t(key, vars);
      if (v != null && v !== key) return v;
    }
    return key;
  }

  function create(cfg) {
    var getState = cfg.getState;
    var getGradient = cfg.getGradient;
    var getColorSet = cfg.getColorSet;
    var toast = cfg.toast || U.toast;

    function downloadBlob(blob, filename) {
      if (!blob) { toast(t('toastExportFail'), 'fail'); return; }
      try {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { 
          try { URL.revokeObjectURL(url); } catch(e) {}
        }, 10000);
      } catch (e) {
        toast(t('toastExportFail'), 'fail');
      }
    }

    function exportGradientPng() {
      // 绝对保留 1080P 高清
      var W = 1920, H = 1080;

      try {
        var cv = document.createElement('canvas');
        cv.width = W; cv.height = H;
        var x = cv.getContext('2d');

        var typeEl = $('g-type'), angleEl = $('g-angle');
        var type = typeEl ? typeEl.value : 'linear';
        var a = angleEl ? (+angleEl.value) * Math.PI / 180 : 0;
        var g;

        if (type === 'radial') {
          g = x.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.sqrt(W * W + H * H) / 2);
        } else if (type === 'conic') {
          // 防崩溃：老版本苹果手机不支持锥形渐变，直接优雅降级为线性，绝不闪退
          if (x.createConicGradient) {
            g = x.createConicGradient(a - Math.PI / 2, W / 2, H / 2);
          } else {
            var lenFallback = Math.abs(W * Math.sin(a)) + Math.abs(H * Math.cos(a));
            var dxFallback = Math.sin(a) * lenFallback / 2, dyFallback = -Math.cos(a) * lenFallback / 2;
            g = x.createLinearGradient(W / 2 - dxFallback, H / 2 - dyFallback, W / 2 + dxFallback, H / 2 + dyFallback);
          }
        } else {
          var len = Math.abs(W * Math.sin(a)) + Math.abs(H * Math.cos(a));
          var dx = Math.sin(a) * len / 2, dy = -Math.cos(a) * len / 2;
          g = x.createLinearGradient(W / 2 - dx, H / 2 - dy, W / 2 + dx, H / 2 + dy);
        }

        getGradient().getExpandedStops().forEach(function (s) {
          g.addColorStop(clamp(s.pos / 100, 0, 1), s.hex);
        });

        x.fillStyle = g;
        x.fillRect(0, 0, W, H);

        // 利用异步推迟，避免主线程瞬间卡死
        requestAnimationFrame(function() {
          cv.toBlob(function (b) {
            if (!b) { toast(t('toastExportFail'), 'fail'); return; }
            downloadBlob(b, 'color-gradient.png');
            toast(t('toastGradDl'), 'ok');
          });
        });
      } catch (err) {
        console.error('Gradient export failed:', err);
        toast(t('toastExportFail'), 'fail');
      }
    }

    function exportWheelPng() {
      var set = getColorSet();
      if (!set || !set.colors.length) return;

      try {
        // 绝对保留 2000x2000 高清
        var size = 2000;
        var cv = document.createElement('canvas');
        cv.width = size; cv.height = size;
        var x = cv.getContext('2d');

        var st = getState();
        if (st.wheelConfig.bg !== 'transparent') {
          x.fillStyle = st.wheelConfig.bg;
          x.fillRect(0, 0, size, size);
        }

        Canvas.drawWheel(x, set.colors.slice(0, 24), st.wheelConfig, { size: size });

        requestAnimationFrame(function() {
          cv.toBlob(function (b) {
            if (!b) { toast(t('toastExportFail'), 'fail'); return; }
            downloadBlob(b, 'ColorWheel.png');
            toast(t('toastWheelDl'), 'ok');
          });
        });
      } catch (err) {
        toast(t('toastExportFail'), 'fail');
      }
    }

    function exportHexPng() {
      var set = getColorSet();
      if (!set || !set.colors.length) return;

      try {
        var size = 2000;
        var cv = document.createElement('canvas');
        cv.width = size; cv.height = size;
        var x = cv.getContext('2d');

        var st = getState();
        if (st.hexConfig.bg !== 'transparent') {
          x.fillStyle = st.hexConfig.bg;
          x.fillRect(0, 0, size, size);
        }

        Canvas.drawHex(x, set.colors, st.hexConfig, { size: size });

        requestAnimationFrame(function() {
          cv.toBlob(function (b) {
            if (!b) { toast(t('toastExportFail'), 'fail'); return; }
            downloadBlob(b, 'Honeycomb.png');
            toast(t('toastHexDl'), 'ok');
          });
        });
      } catch (err) {
        toast(t('toastExportFail'), 'fail');
      }
    }

    return {
      exportGradientPng: exportGradientPng,
      exportWheelPng: exportWheelPng,
      exportHexPng: exportHexPng
    };
  }

  global.CO_Export = { create: create };

})(window);