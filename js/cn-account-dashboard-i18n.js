(function () {
    'use strict';

    var root = document.documentElement;
    var STORAGE_KEY = 'cn-qw-lang';
    var lang = localStorage.getItem(STORAGE_KEY) || 'zh-CN';

    var I18N = {
        zh: {
            'brand.name': '通达信量化交易终端系统',
            'nav.install': '安装教程',
            'nav.code': '主系统',
            'nav.intraday': '分时系统',
            'nav.screener': '量化选股',
            
            'hero.title': '通达信 - 量化交易终端系统',
            'hero.lede.b': '核心逻辑：',
            'hero.lede.text': '全球化、分散化、多币种化、去中心化的资产拓扑结构，是唯一分摊风险的策略。',
            
            'sec.install': '📊 通达信 - 安装公式教程',
            'install.title1': '📈 安装主系统 / 分时系统',
            'install.sub1': '全局数据 · 下载本地 · 自动量化',
            'install.row1': '安装系统主图 + 副图（合计2个）',
            'install.row2': '安装分时主图 + 副图（合计3个）',
            'install.row3': '安装全局因子（合计1个）',
            'install.row4': '下载全局数据',
            'install.title2': '📈 安装量化选股器',
            'install.sub2': '总共八层 · 层层嵌套 · 禁止跳跃',
            'install.row5': '安装基础选股器',
            'install.row6': '安装小多选股器',
            'install.row7': '安装中多选器',
            'install.row8': '下面有详细步骤',
            
            'sec.selector': '📋 通达信 - 自动选股设置',
            'selector.tip': '✎ 层级关系很重要，务必百分百做到表格里的层级',
            'table.th1': '选股公式',
            'table.th2': '选股范围',
            'table.th3': '间隔',
            'table.th4': '周期',
            'table.th5': '关联板块',
            'table.th6': '原有品种',
            
            'sec.code': '📂 通达信 - 量化主系统',
            'code.main.title': '📘 量化主系统 - 主图.tn6',
            'code.sub.title': '📗 量化主系统 - 副图.tn6',
            'btn.copy': '📋 复制代码',
            
            'sec.factor': '📄 通达信 - 全局因子库',
            'factor.item': '全局因子库 - 因子.tn6',
            
            'sec.intraday': '⚙️ 通达信 - 量化分时系统',
            'intraday.item1': '量化分时系统 - 分时主图',
            'intraday.item2': '量化分时系统 - 资金副图',
            'intraday.item3': '量化分时系统 - 趋势副图',
            
            'sec.screener': '🚀 通达信 - 量化选股器',
            'scr.item1': '量化选股器 - 基础选股器',
            'scr.item2': '量化选股器 - 小多选股器',
            'scr.item3': '量化选股器 - 中多选股器',
            'scr.item4': '量化选股器 - 大多选股器',
            'scr.item5': '量化选股器 - 超多选股器',
            'scr.item6': '量化选股器 - 全多选股器',
            'scr.item7': '量化选股器 - 今全多选股器',
            'scr.item8': '量化选股器 - 股息率>5%选股器',
            'scr.item9': '量化选股器 - 占位无内容',
            
            'footer.title': 'Yang Shengqi All-Weather Permanent Portfolio'
        },
        en: {
            'brand.name': 'Tongdaxin Quant Terminal',
            'nav.install': 'Install',
            'nav.code': 'Main',
            'nav.intraday': 'Intraday',
            'nav.screener': 'Screener',
            
            'hero.title': 'Tongdaxin — Quant Trading Terminal',
            'hero.lede.b': 'Core Logic: ',
            'hero.lede.text': 'A globally distributed, decentralized, multi-currency asset topology is the only viable risk-spreading strategy.',
            
            'sec.install': '📊 Tongdaxin — Installation Guide',
            'install.title1': '📈 Main / Intraday',
            'install.sub1': 'Global data · Local download',
            'install.row1': 'Main + sub charts',
            'install.row2': 'Intraday main + sub',
            'install.row3': 'Global factor',
            'install.row4': 'Download all data',
            'install.title2': '📈 Quant Screener',
            'install.sub2': 'Eight layers · Nested',
            'install.row5': 'Base screener',
            'install.row6': 'Minor-long screener',
            'install.row7': 'Mid-long screener',
            'install.row8': 'Detailed steps below',
            
            'sec.selector': '📋 Tongdaxin — Auto Screener Settings',
            'selector.tip': '✎ Layer order matters',
            'table.th1': 'Formula',
            'table.th2': 'Scope',
            'table.th3': 'Int.',
            'table.th4': 'Period',
            'table.th5': 'Linked Block',
            'table.th6': 'Count',
            
            'sec.code': '📂 Tongdaxin — Quant Main System',
            'code.main.title': '📘 Main Chart.tn6',
            'code.sub.title': '📗 Sub Chart.tn6',
            'btn.copy': '📋 Copy',
            
            'sec.factor': '📄 Tongdaxin — Global Factor Library',
            'factor.item': 'Global Factor Library - Factor.tn6',
            
            'sec.intraday': '⚙️ Tongdaxin — Quant Intraday System',
            'intraday.item1': 'Quant Intraday — Main Chart',
            'intraday.item2': 'Quant Intraday — Capital Sub Chart',
            'intraday.item3': 'Quant Intraday — Trend Sub Chart',
            
            'sec.screener': '🚀 Tongdaxin — Quant Screener',
            'scr.item1': 'Quant Screener — Base Screener',
            'scr.item2': 'Quant Screener — Small Multi Screener',
            'scr.item3': 'Quant Screener — Mid Multi Screener',
            'scr.item4': 'Quant Screener — Large Multi Screener',
            'scr.item5': 'Quant Screener — Super Multi Screener',
            'scr.item6': 'Quant Screener — Full Multi Screener',
            'scr.item7': "Quant Screener — Today's Full Multi Screener",
            'scr.item8': 'Quant Screener — Dividend Yield > 5%',
            'scr.item9': 'Quant Screener — Placeholder (empty)',
            
            'footer.title': 'Yang Shengqi All-Weather Permanent Portfolio'
        }
    };

    /* ================= 1. 语言切换 ================= */
    function applyLang(next) {
        lang = next;
        localStorage.setItem(STORAGE_KEY, lang);
        root.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');

        var d = I18N[lang === 'en' ? 'en' : 'zh'];
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            var val = d[key];
            if (val !== undefined) el.textContent = val;
        });
    }

    var langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', function () {
            applyLang(lang === 'en' ? 'zh-CN' : 'en');
        });
    }

    /* ================= 2. 安全稳健的复制逻辑 ================= */
    function copyText(text, btn) {
        function done() {
            var label = btn.querySelector('.btn-label');
            if (!label) return;
            var original = label.textContent;
            label.textContent = lang === 'en' ? '✅ Copied' : '✅ 已复制';
            clearTimeout(btn._copyTimer);
            btn._copyTimer = setTimeout(function () { label.textContent = original; }, 1800);
        }
        function fail() {
            var label = btn.querySelector('.btn-label');
            if (!label) return;
            var original = label.textContent;
            label.textContent = lang === 'en' ? '❌ Failed' : '❌ 复制失败';
            clearTimeout(btn._copyTimer);
            btn._copyTimer = setTimeout(function () { label.textContent = original; }, 1800);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done).catch(function () { legacyCopy(text, done, fail); });
        } else {
            legacyCopy(text, done, fail);
        }
    }

    function legacyCopy(text, done, fail) {
        try {
            var ta = document.createElement('textarea');
            ta.value = text; 
            ta.style.position = 'fixed'; ta.style.left = '-9999px';
            document.body.appendChild(ta); 
            ta.select(); 
            document.execCommand('copy');
            document.body.removeChild(ta); 
            done();
        } catch (e) { fail(); }
    }

    document.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-target]');
        if (btn) {
            var ta = document.getElementById(btn.getAttribute('data-target'));
            if (ta) copyText(ta.value, btn);
        }
    });

    /* ================= 3. 数据填充 ================= */
    function fillTextareas() {
        var map = [
            ['code-left', 'code-main-chart'], 
            ['code-right', 'code-main-sub'],
            ['ta-factor', 'code-factor'],
            ['ta-intraday-main', 'code-intraday-main'],
            ['ta-intraday-capital', 'code-intraday-capital'],
            ['ta-intraday-trend', 'code-intraday-trend'],
            ['ta-scr-1', 'code-scr-1'],
            ['ta-scr-2', 'code-scr-2'],
            ['ta-scr-3', 'code-scr-3'],
            ['ta-scr-4', 'code-scr-4'],
            ['ta-scr-5', 'code-scr-5'],
            ['ta-scr-6', 'code-scr-6'],
            ['ta-scr-7', 'code-scr-7'],
            ['ta-scr-8', 'code-scr-8'],
            ['ta-scr-9', 'code-scr-9']
        ];
        map.forEach(function (pair) {
            var ta = document.getElementById(pair[0]);
            var source = document.getElementById(pair[1]);
            if (ta && source) {
                ta.value = source.textContent.replace(/^\s*\n/, '').replace(/\n\s*$/, '');
            }
        });
    }

    fillTextareas();
    applyLang(lang);
})();