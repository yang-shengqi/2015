(function () {
    'use strict';

    var root = document.documentElement;
    var STORAGE_KEY = 'co-lang';
    var lang = localStorage.getItem(STORAGE_KEY) || 'zh'; // 注意：这里改成 'zh'，和判断逻辑对齐

    var I18N = {
        zh: {
            'brandName': '核心工具箱',
            'navHome': '首页',
            'navThinking': '思维类',
            'navThinking1': '乱世 · 生存与财富自由的实战宝典',
            'navThinking2': '传承 · 家族后辈们的启蒙家书',
            'navQuant': '量化类',
            'navQuant1': '全球 · 市场量化工具工作台',
            'navQuant2': '全球 · 全天候永久投资组合',
            'navQuant3': '美国 · Charles Schwab 仪表盘',
            'navDiagnose': '诊断类',
            'navDiagnose1': 'WJP · 法治指数地图',
            'navDiagnose2': '经济数据 · 趋势与真实性检验',
            'navDiagnose3': '思维 · 人类思维盲区诊断工具',
            'navDiagnose4': '诊断 · 文明等级在线评分器',
            'navUtility': '实用类',
            'navUtility1': '色彩 · 色彩分析工具',
            'navUtility2': '加密 · 网页军功级加密工具',

            'hero.titleA': '通达信',
            'hero.titleB': '量化交易终端系统',
            'hero.ledeA': '本地化清洗数据源 · 多因子量化模型。',
            'hero.ledeB': '基于金融市场特征构建的量化交易终端。支持图形形态识别、智能选股算法以及本地私有化存储，全面覆盖',
            'hero.hl': '外汇 / 股票 / 期货',
            'hero.ledeC': '等交易品种的智能识别。',
            'hero.chip1': '本地化数据源',
            'hero.chip2': '多因子量化模型',
            'hero.chip3': '图形形态识别',
            'hero.chip4': '智能选股算法',
            'hero.chip5': '本地私有化存储',
            'hero.chip6': '多品种智能识别',

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
            'brandName': 'Core Toolbox',
            'navHome': 'Home',
            'navThinking': 'Thinking',
            'navThinking1': 'Survival & Wealth Bible',
            'navThinking2': 'Legacy Letters',
            'navQuant': 'Quant',
            'navQuant1': 'Global Market Dashboard',
            'navQuant2': 'All-Weather Portfolio',
            'navQuant3': 'Charles Schwab Dashboard',
            'navDiagnose': 'Diagnostics',
            'navDiagnose1': 'WJP Rule of Law Map',
            'navDiagnose2': 'Economic Data Diagnostics',
            'navDiagnose3': 'Cognitive Blind Spots',
            'navDiagnose4': 'Civilization Scorer',
            'navUtility': 'Utilities',
            'navUtility1': 'Color Analysis',
            'navUtility2': 'HTML Encrypter',

            'hero.titleA': 'Tongdaxin',
            'hero.titleB': 'Quant Trading Terminal',
            'hero.ledeA': 'Localized data cleaning · Multi-factor quant models.',
            'hero.ledeB': 'A quant trading terminal built on financial market features. Supports pattern recognition, smart stock-picking algorithms, and local private storage, fully covering ',
            'hero.hl': 'Forex / Stocks / Futures',
            'hero.ledeC': 'intelligent identification across multiple trading varieties.',
            'hero.chip1': 'Local Data',
            'hero.chip2': 'Multi-factor',
            'hero.chip3': 'Pattern Recognition',
            'hero.chip4': 'Smart Stock Picking',
            'hero.chip5': 'Local Storage',
            'hero.chip6': 'Multi-variety',

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

    function applyLang(next) {
        lang = next;
        localStorage.setItem(STORAGE_KEY, lang);
        root.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');

        var d = I18N[lang === 'en' ? 'en' : 'zh'];
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            var val = d[key];
            if (val !== undefined) {
                if (el.children.length > 0) {
                    for (var i = 0; i < el.childNodes.length; i++) {
                        if (el.childNodes[i].nodeType === 3 && el.childNodes[i].nodeValue.trim()) {
                            el.childNodes[i].nodeValue = val;
                            break;
                        }
                    }
                } else {
                    el.textContent = val;
                }
            }
        });

        // 点亮按钮
        var z = document.querySelector('#langBtn .zh');
        var e = document.querySelector('#langBtn .en');
        if (z && e) {
            z.classList.toggle('active', lang === 'zh');
            e.classList.toggle('active', lang === 'en');
        }
    }

    // ============================================================
    // 系统层接管：监听核心层广播
    // ============================================================
    document.addEventListener('DOMContentLoaded', function () {
        applyLang(lang);
        
        document.addEventListener('co:langchange', function (e) {
            applyLang(e.detail.lang);
        });
    });

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
    applyLang(lang); // 初始化
})();