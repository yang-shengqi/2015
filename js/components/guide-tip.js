/* ============================================================
 * guide-tip.js —— 执行规则提示卡片
 * ------------------------------------------------------------
 * · 弹出时机：首次访问延迟 600ms
 * · 记忆键：console-guide-tip-date-v5 = "YYYY-M-D"
 * · 勾选 → 写入今日日期 → 当天不再弹，明天照弹
 * · ✕ / 遮罩 / Esc → 只关本次，刷新又弹
 * · 光标感应 → 鼠标在卡片内移动时更新 --mx / --my
 *
 * 本版修改：
 *   ★ 接入 App.a11y.trapFocus —— 打开时焦点入内、Tab 循环、
 *     Esc 关闭、关闭后归还触发源
 *   ★ 旧 key 迁移统一走 App.storage.migrate
 *   ★ Esc 监听统一走 App.a11y.closeOnEsc
 *   ★ 补上滚动锁，防底层页面滚动
 * ============================================================ */
(function (App) {
  "use strict";

  var KEY = "guide-tip-date-v5";

  /* ★ 迁移旧裸 key（若 App.storage 存在） */
  if (App && App.storage && typeof App.storage.migrate === 'function') {
    App.storage.migrate(KEY);
  }

  function storeGet(key, fallback) {
    if (App && App.storage) return App.storage.get(key, fallback);
    try { return localStorage.getItem('console-' + key) || fallback; }
    catch (e) { return fallback; }
  }
  function storeSet(key, val) {
    if (App && App.storage) { App.storage.set(key, val); return; }
    try { localStorage.setItem('console-' + key, val); } catch (e) {}
  }

  var mask = document.getElementById("guideTip");
  var card = document.getElementById("guideTipCard");
  var check = document.getElementById("guideTipCheck");
  if (!mask || !card) return;

  var releaseFocus = null;

  /* ---------- 今日日期字符串 ---------- */
  function today() {
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }

  /* ---------- 首次判断 ---------- */
  var saved = storeGet(KEY, null);

  if (saved !== today()) {
    setTimeout(function () {
      requestAnimationFrame(function () {
        mask.classList.add("on");
        
        /* ★ 补充滚动锁 */
        if (App && App.utils && typeof App.utils.lockScroll === 'function') {
          App.utils.lockScroll();
        }

        /* ★ 焦点陷阱：入内 + Tab 循环 + Esc 关闭 */
        if (App && App.a11y) {
          releaseFocus = App.a11y.trapFocus(card, {
            initialFocus: ".guide-tip__check input, .guide-tip__close",
            onEscape: close
          });
        }
      });
    }, 600);
  }

  /* ---------- 关闭 ---------- */
  function close() {
    mask.classList.remove("on");
    
    if (App && App.utils && typeof App.utils.unlockScroll === 'function') {
      App.utils.unlockScroll();
    }
    
    if (releaseFocus) { releaseFocus(); releaseFocus = null; }
  }

  /* ---------- 勾选 → 写入日期 + 关闭 ---------- */
  if (check) {
    check.addEventListener("change", function () {
      if (check.checked) {
        storeSet(KEY, today());
        setTimeout(close, 180);
      }
    });
  }

  /* ---------- 只关本次的入口 ---------- */
  var btnX = document.getElementById("guideTipX");
  if (btnX) btnX.addEventListener("click", close);

  mask.addEventListener("click", function (e) {
    if (e.target === mask) close();
  });

  /* ★ Esc 统一走 closeOnEsc */
  if (App && App.a11y && typeof App.a11y.closeOnEsc === 'function') {
    App.a11y.closeOnEsc(function () {
      if (mask.classList.contains("on")) close();
    });
  } else {
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mask.classList.contains("on")) close();
    });
  }

  /* ---------- 光标感应 ---------- */
  card.addEventListener("pointermove", function (e) {
    var r = card.getBoundingClientRect();
    var x = ((e.clientX - r.left) / r.width  * 100).toFixed(2) + "%";
    var y = ((e.clientY - r.top ) / r.height * 100).toFixed(2) + "%";
    card.style.setProperty("--mx", x);
    card.style.setProperty("--my", y);
  });
  
})(window.App = window.App || {});