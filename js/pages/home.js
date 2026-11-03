/**
 * SoftFlow Landing Page Interaction Script
 * 仅负责交互动作，不再包含任何硬编码或内容渲染
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ================= 功能选项卡切换 ================= */
  const tabBtns = document.querySelectorAll('#featureTabs .tab-btn');
  const featurePanels = document.querySelectorAll('#featureDisplay .feature-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. 移除所有 Tab 的 active
      tabBtns.forEach(t => t.classList.remove('active'));
      // 2. 移除所有面板的 active
      featurePanels.forEach(p => p.classList.remove('active'));

      // 3. 激活当前点击的 Tab
      btn.classList.add('active');
      
      // 4. 根据 data-index 找到对应的面板并激活
      const index = btn.dataset.index;
      const targetPanel = document.querySelector(`.feature-panel[data-index="${index}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  /* ================= 定价切换 ================= */
  const pricingSection = document.getElementById('pricing');
  const billingToggle = document.getElementById('billingToggle');

  if (pricingSection && billingToggle) {
    billingToggle.addEventListener('click', () => {
      // 获取当前状态，切换为相反的
      const currentCycle = pricingSection.dataset.billing;
      const nextCycle = currentCycle === 'monthly' ? 'yearly' : 'monthly';

      // 更新容器的 data-billing，CSS 会自动处理价格显示与隐藏
      pricingSection.dataset.billing = nextCycle;
      
      // 更新无障碍属性
      billingToggle.setAttribute('aria-checked', nextCycle === 'yearly' ? 'true' : 'false');
    });
  }

  /* 说明：用户评价区已在 HTML 中移除，相关的 JS 渲染逻辑也已全部清理，避免报错 */
});