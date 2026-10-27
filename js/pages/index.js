/* ==========================================
   💡 卡片数据池（共 12 张）
   ========================================== */
const pricingData = [
  {
    name: '乱世生存与财富自由的实战宝典',
    price: '2025 / Year Start',
    badge: 'The Global Wealth Bible',
    description: '跨越宏观与微观，连接防守与进攻，构建个人与家族的全天候投资体系。',
    features: ['Cognition 认知', 'Hedging 避险', 'Execution 执行', 'Allocation 配置', 'Growth 增长', 'Deployment 落地', 'Transcendence 升华', '这是一本完整闭环，投资逻辑链条极其清晰的财富之书。'],
    cta: '查看实战宝典',
    link: 'the-global-wealth-bible.html'
  },
  {
    name: '传承 · 家族后辈们的启蒙家书',
    price: '5-6 / Year Study',
    badge: 'Inheritance Manual',
    description: '拥有自由权和选择权，就是拥有对生活说“不”的权利。',
    features: ['16岁学英文', '大学学金融', '毕业办证去香港', '工作存钱理财', '坚持一个7年', '28岁重启人生'],
    cta: '查看启蒙家书',
    link: 'life-survival-strategy-letter.html'
  },
  {
    name: '全球 · 市场量化工具',
    price: '3600 / days verification +',
    badge: 'Current page',
    description: '基于金融市场特征构建的量化交易终端。',
    features: ['本地化清洗数据源', '多因子量化模型', '图形形态识别', '智能选股算法', '本地私有化存储', '外汇/股票/期货/等智能识别'],
    cta: '查看量化工具',
    link: 'cn-account-dashboard.html'
  }, 
  {
    name: '杨晟琦 · 文明公理系统',
    price: '自洽可验',
    badge: '独立思想锚点',
    description: '一套自洽的可检验的文明底层公理宪法',
    features: ['公理定义出发', '经济诊断模型', '度量工具', '过程监测', '解决方案设计', '操作手册', '验证工具构成完整闭环'],
    cta: '查看文明公理',
    link: 'https://yang-shengqi.github.io/Axiomatic-System-of-Civilization/'
  },
  {
    name: 'WJP · 法治指数地图',
    price: 'WJP / the Rule of Law Index',
    badge: 'Eight-Dimensional Assessment',
    description: '国家或地区法治建设水平的量化评估体系',
    features: ['政府权力约束', '廉洁程度', '政府透明度', '基本权利保障', '秩序与安全', '监管执法', '民事司法', '刑事司法'],
    cta: '查看法制地图',
    link: 'wjp-rule-of-Law-Index-map.html'
  },
  {
    name: '经济数据 · 趋势与真实性检验',
    price: '10 / 年以上官方数据',
    badge: 'Professional Edition',
    description: '当官方 GDP 与实物锚、税收、价格长期背离时，工具会亮灯。',
    features: ['实物锚背离', '克强指数对照', '税收-GDP 弹性', '平减指数一致性', '投资-消费背离', '货币-实体一致性'],
    cta: '查看数据变化',
    link: 'economic-data-diagnostics.html'
  },
  {
    name: '全球 · 全天候永久投资组合',
    price: '法币 / 风险对冲协议',
    badge: 'Look through',
    description: '全球化、分散化、多币种化、去中心化的资产拓扑结构是唯一分摊风险的策略。',
    features: [ '仓位类：', '分红仓位 70% ', '不分红仓位 30% ',  '----------------',  '配置类：','高息债券 60%', '高息股票 30%', '现金 5% ', '对冲 5% '],
    cta: '查看投资组合',
    link: 'hk-account-dashboard.html'
  },
  {
    name: '美国 · Charles Schwab 仪表盘',
    price: 'USD / Reserve Key Currency',
    badge: 'World Dominator',
    description: '美国市场没有中国市场批量造假式的带病上市，没有香港市场的入易出难，更没有中国市场制度缺陷导致的机构单方面大规模的「屠杀」。',
    features: [ '真投资市场', '23小时交易', 'SEC 严格监管', '造假成本极高','交易体系完善',  '全球最深的流动性',   '全球顶级公司聚集地', ],
    cta: '查看仪表盘',
    link: 'us-account-dashboard.html'
  },
  {
    name: '思维 · 人类思维盲区诊断工具',
    price: '诊断 / 思维扫描',
    badge: 'Cognitive Assessment',
    description: '通过 38 个关于“你如何思考”的元认知问题，深度扫描你的思维习惯。采用 6维度 × 3层次 交叉验证矩阵，生成学术级精准度报告。',
    features: [ '元认知问题 ', '深度扫描思维习惯', '交叉验证矩阵', '防忽悠','外部检验',  '觉醒 · 内部追问',   '内化 · 心智更新', ],
    cta: '开始诊断',
    link: 'blind-spot-diagnosis.html'
  },
  {
    name: '加密 · 给网页加一道密码锁',
    price: '加密 / 安全工具',
    badge: 'Security Tool',
    description: '全程在浏览器本地加密，密码不离开你的设备。生成一个带密码提示框的独立 HTML 文件，上传到任何静态托管即可使用。',
    features: [ 'AES-256 CBC', 'PBKDF2 600k', '纯前端加密', '离线可用','无需服务器',  '数据不离开浏览器',   '拟物风模板', ],
    cta: '查看加密工具',
    link: 'html-encrypt.html'
  },
  {
    name: '色彩 · 色彩分析工具',
    price: '设计 / 色彩提取',
    badge: 'Color Analytics',
    description: '基于 OKLCH 现代色彩空间的纯前端分析工具，告别臃肿软件，从精准取色到多格式导出，一站式搞定。',
    features: ['OKLab / OKLCH 科学算法', '全链路配色与转换', '浏览器本地分析', '图片绝不上传', '支持离线可用', '免费即时生成'], 
    cta: '开始取色',
    link: 'color.html'
  },
  {
    name: '诊断 · 文明等级在线评分器',
    price: '诊断 / 文明等级',
    badge: 'Civilization Score',
    description: '你的社会处于文明演化的哪一步？通过三大基石门禁、四大要素 18 个子项打分，以及司法验证的折扣计算，量化生成学术级的文明诊断报告。',
    features: [ '三大基石门禁', '四大要素', '基石否决 · 一票否决', '体感优先 · 拒绝数据粉饰','木桶效应 · 锁死系统上限',  '司法验证',   '量化文明诊断报告', ],
    cta: '开始评分',
    link: 'civilization-level-scorer.html'
  },
];

/* ==========================================
   💡 分类配置
   ========================================== */
const categories = [
  { key: 'all', label: '全部', cards: pricingData },
  { key: 'mind', label: '思维工具', cards: [ pricingData[0], pricingData[1], pricingData[3], pricingData[4] ] },
  { key: 'quant', label: '量化工具', cards: [ pricingData[2], pricingData[6], pricingData[7] ] },
  { key: 'diag', label: '诊断工具', cards: [ pricingData[5], pricingData[8], pricingData[11] ] },
  { key: 'util', label: '实用工具', cards: [ pricingData[10], pricingData[9] ] }
];

/* ==========================================
   💡 状态与变量
   ========================================== */
let activeCat = categories[0].key;
let currentCards = categories[0].cards;
let currentIndex = 0;
let ignoreHover = false;
let isAnimating = false; // 👈 核心防连点锁
const GAP = 20;
let sweepState = 'right';

const track = document.getElementById('track');
const viewport = document.getElementById('viewport');
const dotsWrap = document.getElementById('dots');
const tabsEl = document.getElementById('tabs');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

/* ==========================================
   💡 渲染核心
   ========================================== */
function createCardHTML(plan, idx) {
  const featuresHTML = plan.features.map(f => `
    <li>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${f}</span>
    </li>
  `).join('');

  const badgeHTML = plan.badge ? `<div class="popular-badge">${plan.badge}</div>` : '';
  const targetAttr = plan.link.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : '';

  return `
    <a class="card" href="${plan.link}" ${targetAttr} data-index="${idx}">
      ${badgeHTML}
      <div class="card-inner-relative">
        <h3 class="plan-name">${plan.name}</h3>
        <p class="plan-desc">${plan.description}</p>
        <div style="margin-bottom:1.5rem;">
          <div class="price-row">
            <span class="price">${plan.price.split('/')[0]}</span>
            <span class="period">${plan.price.includes('/') ? '/ ' + plan.price.split('/')[1].trim() : ''}</span>
          </div>
        </div>
        <ul class="features">${featuresHTML}</ul>
        <div class="cta normal">${plan.cta}</div>
      </div>
    </a>
  `;
}

function buildTrack() {
  track.innerHTML = '';
  const len = currentCards.length;
  if (len === 0) return;

  if (len === 1) {
    track.innerHTML = createCardHTML(currentCards[0], 0);
  } else {
    // 前克隆（2张）
    for (let i = Math.max(0, len - 2); i < len; i++) {
      track.innerHTML += createCardHTML(currentCards[i], i);
    }
    // 本体
    currentCards.forEach((plan, idx) => {
      track.innerHTML += createCardHTML(plan, idx);
    });
    // 后克隆（2张）
    for (let i = 0; i < Math.min(2, len); i++) {
      track.innerHTML += createCardHTML(currentCards[i], i);
    }
  }
}

function renderDots() {
  dotsWrap.innerHTML = '';
  currentCards.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = `dot ${idx === currentIndex ? 'active' : ''}`;
    dot.addEventListener('click', (e) => { e.preventDefault(); goTo(idx); });
    dotsWrap.appendChild(dot);
  });
}

function updateControls() {
  const len = currentCards.length;
  if (len <= 1) {
    dotsWrap.style.display = 'none';
    btnPrev.style.display = 'none';
    btnNext.style.display = 'none';
  } else {
    dotsWrap.style.display = 'flex';
    btnPrev.style.display = 'flex';
    btnNext.style.display = 'flex';
  }
}

/* ==========================================
   💡 交互与布局
   ========================================== */
const HoverCtrl = {
  triggerIn(card) {
    if (!card || !card.classList.contains('is-active')) return;
    card.classList.remove('sweep-up', 'sweep-down');
    void card.offsetWidth; 
    card.classList.add('sweep-down');
    sweepState = 'left'; 
  },
  triggerOut(card) {
    if (!card || !card.classList.contains('is-active')) return;
    card.classList.remove('sweep-up', 'sweep-down');
    void card.offsetWidth; 
    card.classList.add('sweep-up');
    sweepState = 'right'; 
  }
};

track.addEventListener('mouseover', (e) => {
  if (ignoreHover) return;
  const card = e.target.closest('.card');
  if (card) HoverCtrl.triggerIn(card);
});

track.addEventListener('mouseout', (e) => {
  if (ignoreHover) return;
  const card = e.target.closest('.card');
  if (card && !card.contains(e.relatedTarget)) {
    HoverCtrl.triggerOut(card);
  }
});

const WheelCtrl = {
  execute(direction) {
    const activeCard = track.querySelector('.card.is-active');
    if (!activeCard) return;

    activeCard.classList.remove('sweep-up', 'sweep-down');
    void activeCard.offsetWidth;

    if (direction === 'down') {
      activeCard.classList.add('sweep-down');
      sweepState = 'left';
    } else if (direction === 'up') {
      activeCard.classList.add('sweep-up');
      sweepState = 'right';
    }
  }
};

function updateLayout(animated = true, forceIndex = null) {
  const cards = track.children;
  if (!cards.length) return;

  if (animated) {
    track.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
    track.classList.remove('no-transition');
  } else {
    track.classList.add('no-transition');
  }

  const vw = viewport.clientWidth;
  const cardWidth = vw < 600 ? vw * 0.85 : Math.min(vw * 0.38, 320);

  Array.from(cards).forEach(card => {
    card.style.width = `${cardWidth}px`;
    card.style.marginRight = `${GAP}px`;
  });

  const isSingle = currentCards.length === 1;
  const domIndex = isSingle ? 0 : (forceIndex !== null ? forceIndex : currentIndex + 2);
  
  const stepWidth = cardWidth + GAP;
  const offset = (vw / 2) - (cardWidth / 2) - (domIndex * stepWidth);

  if (!animated) { void track.offsetWidth; }
  track.style.transform = `translateX(${offset}px)`;

  Array.from(cards).forEach((card, i) => {
    const cta = card.querySelector('.cta');
    const dist = isSingle ? 0 : Math.min(Math.abs(i - domIndex), 3);
    
    if (dist <= 1) {
      card.style.filter = 'none';
    } else {
      card.style.filter = `blur(${(dist - 1) * 3}px)`;
    }

    if (i === domIndex) {
      card.classList.add('is-active');
      if (cta) { cta.classList.remove('normal'); cta.classList.add('highlighted'); }
    } else {
      card.classList.remove('is-active');
      card.classList.remove('sweep-up', 'sweep-down');
      if (cta) { cta.classList.remove('highlighted'); cta.classList.add('normal'); }
    }
  });

  if (!animated) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.classList.remove('no-transition');
      });
    });
  }
}

function goTo(index) {
  const len = currentCards.length;
  if (len <= 1) return;
  if (isAnimating) return; // 👈 关键拦截：如果正在滑动，无视后续点击

  isAnimating = true;

  const targetIndex = index;
  let direction = 'down';
  if (index < currentIndex || (currentIndex === 0 && index === len - 1)) {
    direction = 'up';
  }

  let dotIndex = targetIndex;
  if (targetIndex < 0) dotIndex = len - 1;
  if (targetIndex >= len) dotIndex = 0;

  currentIndex = dotIndex;

  Array.from(dotsWrap.children).forEach((dot, i) => {
    dot.classList.toggle('active', i === dotIndex);
  });

  updateLayout(true, targetIndex + 2);

  ignoreHover = true;
  
  setTimeout(() => {
    WheelCtrl.execute(direction);
  }, 400);

  setTimeout(() => {
    ignoreHover = false;
    isAnimating = false; // 👈 兜底解锁，防止 transitionend 意外丢失导致永久锁死
  }, 450);

  const onTransitionEnd = (e) => {
    if (e.target !== track || e.propertyName !== 'transform') return;
    
    track.removeEventListener('transitionend', onTransitionEnd);
    isAnimating = false; // 👈 动画结束，解除锁定

    if (targetIndex < 0) {
      updateLayout(false, len - 1 + 2);
    } else if (targetIndex >= len) {
      updateLayout(false, 0 + 2);
    }
  };

  track.removeEventListener('transitionend', track._onEnd);
  track._onEnd = onTransitionEnd;
  track.addEventListener('transitionend', onTransitionEnd);
}

function switchCategory(key) {
  if (key === activeCat) return;
  activeCat = key;

  Array.from(tabsEl.children).forEach(btn => {
    const on = btn.dataset.cat === key;
    btn.classList.toggle('active', on);
  });

  currentCards = categories.find(c => c.key === key).cards;
  
  // 切换分类时，默认展示第一张
  currentIndex = 0; 
  
  ignoreHover = true;
  isAnimating = true; // 切换时短暂锁定，防止动画冲突

  buildTrack();
  renderDots();
  updateControls();
  updateLayout(false);

  setTimeout(() => { 
    ignoreHover = false; 
    isAnimating = false; 
  }, 300);
}

/* ==========================================
   💡 事件绑定与初始化
   ========================================== */
track.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;

  if (isAnimating) { e.preventDefault(); return; } // 点击也受限

  if (!card.classList.contains('is-active')) {
    e.preventDefault(); 
    const cards = Array.from(track.children);
    const clickedDomIndex = cards.indexOf(card);
    const currentDomIndex = currentIndex + 2;
    const relativeOffset = clickedDomIndex - currentDomIndex;
    goTo(currentIndex + relativeOffset);
  }
});

btnPrev.addEventListener('click', () => goTo(currentIndex - 1));
btnNext.addEventListener('click', () => goTo(currentIndex + 1));

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => updateLayout(false), 100);
});

let wheelTimer = null;
viewport.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (wheelTimer) return;
  wheelTimer = setTimeout(() => { wheelTimer = null; }, 250);
  
  if (e.deltaY > 0 || e.deltaX > 0) {
    goTo(currentIndex + 1);
  } else if (e.deltaY < 0 || e.deltaX < 0) {
    goTo(currentIndex - 1);
  }
}, { passive: false });

let touchStartX = 0;
viewport.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });
viewport.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 40) {
    if (diff > 0) goTo(currentIndex + 1);
    else goTo(currentIndex - 1);
  }
}, { passive: true });

// 初始化分页标签
categories.forEach((cat, i) => {
  const btn = document.createElement('button');
  btn.className = `tab${i === 0 ? ' active' : ''}`;
  btn.dataset.cat = cat.key;
  btn.textContent = `${cat.label}（${cat.cards.length}）`;
  btn.addEventListener('click', () => switchCategory(cat.key));
  tabsEl.appendChild(btn);
});

// 页面初始化
buildTrack();
renderDots();
updateControls();
requestAnimationFrame(() => updateLayout(false));