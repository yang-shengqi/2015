(function () {
    'use strict';

    var root = document.documentElement;
    var STORAGE_KEY = 'co-lang';
    var lang = localStorage.getItem(STORAGE_KEY) || 'zh';

    var I18N = {
        zh: {
            // 导航栏
            'brandName': '杨晟琦 · 独立思想锚点',
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
            'navDiagnose2': '经济 · 数据趋势与真实性检验',
            'navDiagnose3': '思维 · 人类思维盲区诊断工具',
            'navDiagnose4': '诊断 · 文明等级在线评分器',
            'navUtility': '实用类',
            'navUtility1': '色彩 · 色彩分析工具',
            'navUtility2': '加密 · 网页军功级加密工具',
            'navUtilityMarkdown': '文字 · Markdown 编辑器',

            // Hero 区
            'hero.tag': '本地离线极速解析 · 纯前端实现',
            'hero.titleA': '极简 Markdown ',
            'hero.titleB': '专业级编辑器',
            'hero.lede': '随时记录你的灵感与代码。',
            'hero.desc': '原生支持 KaTeX 数学公式与 Mermaid 图表，数据纯本地离线存储，绝不离开浏览器。无网络依赖，毫秒级极速渲染，完美导出独立 HTML 与高清 PDF。',
            'hero.chip1': '🔒 本地隐私保护',
            'hero.chip2': '⚡ 极速实时解析',
            'hero.chip3': '📄 一键导出 PDF',
            'hero.chip4': '🛡️ 自用 loose 导入他人 MD 改 strict',
            'btnExportHtml': '导出 HTML',
            'btnReset': '恢复默认',
            'btnClear': '清空',

            // 编辑器与操作区
            'panelSrc': '源码',
            'panelPrev': '实时预览',
            'btnOpen': '打开 MD',
            'btnSave': '另存为',
            'btnPrint': '导出 PDF',
            'statusReady': '实时渲染已就绪',

            // 视图模式切换
            'modeEdit': '编辑',
            'modeSplit': '分屏',
            'modePreview': '预览'
        },
        en: {
            // 导航栏
            'brandName': 'Yang Shengqi · The Intellectual Anchor',
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
            'btnReset': 'Reset',
            'navUtilityMarkdown': 'Text · Markdown Editor',

            // Hero 区
            'hero.tag': 'Local Offline Parsing · Pure Frontend',
            'hero.titleA': 'Minimalist Markdown ',
            'hero.titleB': 'Professional Editor',
            'hero.lede': 'Capture your inspiration and code anytime.',
            'hero.desc': 'Supports syntax highlighting, KaTeX math, Mermaid diagrams, and tables. Data is stored locally in your browser with millisecond real-time rendering, ready to export to PDF at any time.',
            'hero.chip1': '🔒 Local Privacy',
            'hero.chip2': '⚡ Instant Parsing',
            'hero.chip3': '📄 Export to PDF',
            'hero.chip4': '🛡️ loose for self strict for external MD',
            'btnExportHtml': 'Export HTML',
            'btnClear': 'Clear',

            // 编辑器与操作区
            'panelSrc': 'Source',
            'panelPrev': 'Preview',
            'btnOpen': 'Open MD',
            'btnSave': 'Save As',
            'btnPrint': 'Export PDF',
            'statusReady': 'Ready',

            // 视图模式切换
            'modeEdit': 'Edit',
            'modeSplit': 'Split',
            'modePreview': 'Preview'
        }
    };

    function applyLang(next) {
        lang = next;
        root.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');
        root.setAttribute('data-lang', lang === 'en' ? 'en' : 'zh');

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
    }

    // ============================================================
    // 和全站其他页面完全一致的初始化模式
    // ============================================================
    document.addEventListener('DOMContentLoaded', function () {
        applyLang(lang);

        // 监听系统层语言切换广播
        document.addEventListener('co:langchange', function (e) {
            applyLang(e.detail.lang);
        });
    });

    // 兜底：如果 DOMContentLoaded 已经错过（脚本在 defer 之后执行等情况）
    if (document.readyState !== 'loading') {
        applyLang(lang);
        document.addEventListener('co:langchange', function (e) {
            applyLang(e.detail.lang);
        });
    }
})();