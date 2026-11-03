(function (global) {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  function toast(msg, type) {
    if (window.App && App.utils && typeof App.utils.toast === 'function') {
      App.utils.toast(msg, type);
    } else {
      console.log('[color]', msg);
    }
  }

  function copyText(text, t) {
    if (!text) return;
    var okMsg = t ? t('toastCopied', { v: text }) : ('已复制 ' + text);
    var failMsg = t ? t('toastCopyFail') : '复制失败';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(function () { toast(okMsg, 'ok'); })
        .catch(function () { toast(failMsg, 'fail'); });
    } else {
      toast(failMsg, 'fail');
    }
  }

  function downloadBlob(blob, filename) {
    if (!blob) { toast('导出失败', 'fail'); return; }
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  global.CO_Util = { $: $, toast: toast, copyText: copyText, downloadBlob: downloadBlob };

})(window);