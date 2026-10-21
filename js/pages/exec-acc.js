/* ============================================================
 * exec-acc.js —— 执行规则 · 单开手风琴（多容器版）
 * ------------------------------------------------------------
 * 支持页面存在多个 .exec-acc 容器：
 *   · 每个容器内部互斥（单开）
 *   · 容器之间相互独立（互不影响）
 * 兼容原 #execAcc 单容器页面（行为等价）。
 * ============================================================ */
(function () {
  'use strict';

  var accs = [].slice.call(document.querySelectorAll('.exec-acc'));
  if (!accs.length) return;

  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  accs.forEach(function (acc) {
    var items = [].slice.call(acc.querySelectorAll('.exec-acc__item'));
    if (!items.length) return;

    function panel(it){ return it.querySelector('.exec-acc__a'); }
    function trigger(it){ return it.querySelector('.exec-acc__q'); }

    function collapse(it){
      var p = panel(it); if (!p) return;
      if (it.classList.contains('on') && p.style.maxHeight === 'none'){
        p.style.maxHeight = p.scrollHeight + 'px';
      }
      it.classList.remove('on');
      trigger(it).setAttribute('aria-expanded','false');
      void p.offsetHeight;
      p.style.maxHeight = '0px';
    }
    function expand(it){
      var p = panel(it); if (!p) return;
      it.classList.add('on');
      trigger(it).setAttribute('aria-expanded','true');
      if (reduce){ p.style.maxHeight = 'none'; return; }
      p.style.maxHeight = p.scrollHeight + 'px';
    }

    items.forEach(function(it){
      var q = trigger(it), p = panel(it);
      if (p) p.style.maxHeight = '0px';
      q.addEventListener('click', function(){
        var wasOn = it.classList.contains('on');
        items.forEach(collapse);       // 仅折叠本容器内的项
        if (!wasOn) expand(it);
      });
      if (p) p.addEventListener('transitionend', function(e){
        if (e.propertyName !== 'max-height') return;
        if (it.classList.contains('on')) p.style.maxHeight = 'none';
      });
    });

    /* 每个容器首次展开第一项（沿用原延迟策略） */
    if (items[0]) {
      var firstOpen = function () {
        setTimeout(function () { expand(items[0]); }, 60);
      };
      if (document.readyState === 'complete') firstOpen();
      else window.addEventListener('load', firstOpen, { once: true });
    }

    var rt;
    window.addEventListener('resize', function(){
      clearTimeout(rt);
      rt = setTimeout(function(){
        items.forEach(function(it){
          if (it.classList.contains('on')){
            var p = panel(it); if (p) p.style.maxHeight = 'none';
          }
        });
      }, 150);
    });
  });
})();