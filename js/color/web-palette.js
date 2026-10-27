/* ============================================================
 * web-palette.js —— 网页配色方案
 * 修复货币符号硬编码问题。
 * ============================================================ */
(function (global) {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  /* ---------- 0. 文案兜底 ---------- */
  var FALLBACK = {
    zh: {
      webRoleBg: '背景', webRolePrimary: '主色', webRoleAccent: '强调色',
      webRoleText: '正文', webRoleBorder: '边框',
      wpReq: '要求', wpTag: '标签', wpLogin: '登录', wpCardTitle: '卡片标题',
      wpNavHome: '首页', wpNavProd: '产品', wpNavAbout: '关于',
      wpSandboxTip: '👀 这是一个演示沙箱，用于预览真实组件效果',
      wpHeroTitle: '让配色在真实组件里跑一遍',
      wpHeroDesc: '这上方是取自你 5 色卡生成的渐变背景。下方组件完美还原了网页中的真实占位与交互体验。',
      wpBtnPrimary: '主要操作',
      wpConsole: '控制台', wpDocs: '帮助文档', wpSettings: '设置', wpUserCenter: '用户中心',
      wpVisits: '总访问量', wpConversion: '转化率', wpVsLastWeek: '较上周', wpFlat: '持平',
      wpRecentRecords: '近期数据记录', wpExportData: '导出数据',
      wpOrderNo: '订单号', wpCustomer: '客户', wpStatus: '状态', wpAmount: '金额',
      wpCompleted: '已完成', wpCancelled: '已取消',
      wpDemoNames: '张三|李四|王五|赵六|孙七|周八',
      wpCurrency: '¥', /* 【新增】 */
      contrastTextBg: '正文 / 背景', contrastMutedBg: '次要文字 / 背景',
      contrastAccentBg: '强调色 / 背景', contrastOnPrimary: '主色上的文字',
      contrastBorderBg: '边框 / 背景',
      copyTipPrefix: '点击复制 ',
      gradeLarge: '大字号', gradeFail: '不合格',
      toastCopied: '已复制 {v}', toastCopyFail: '复制失败'
    },
    en: {
      webRoleBg: 'Background', webRolePrimary: 'Primary', webRoleAccent: 'Accent',
      webRoleText: 'Text', webRoleBorder: 'Border',
      wpReq: 'Req.', wpTag: 'Tag', wpLogin: 'Log in', wpCardTitle: 'Card Title',
      wpNavHome: 'Home', wpNavProd: 'Products', wpNavAbout: 'About',
      wpSandboxTip: '👀 This is a demo sandbox to preview real component effects',
      wpHeroTitle: 'Put your palette through real components',
      wpHeroDesc: 'The gradient above is generated from your 5-color palette. The components below simulate real UI interactions.',
      wpBtnPrimary: 'Primary Action',
      wpConsole: 'Console', wpDocs: 'Docs', wpSettings: 'Settings', wpUserCenter: 'User center',
      wpVisits: 'Total visits', wpConversion: 'Conversion', wpVsLastWeek: 'vs last week', wpFlat: 'Flat',
      wpRecentRecords: 'Recent Records', wpExportData: 'Export',
      wpOrderNo: 'Order No.', wpCustomer: 'Customer', wpStatus: 'Status', wpAmount: 'Amount',
      wpCompleted: 'Completed', wpCancelled: 'Cancelled',
      wpDemoNames: 'Zhang San|Li Si|Wang Wu|Zhao Liu|Sun Qi|Zhou Ba',
      wpCurrency: '$', /* 【新增】 */
      contrastTextBg: 'Text / Background', contrastMutedBg: 'Muted / Background',
      contrastAccentBg: 'Accent / Background', contrastOnPrimary: 'Text on Primary',
      contrastBorderBg: 'Border / Background',
      copyTipPrefix: 'Click to copy ',
      gradeLarge: 'Large text', gradeFail: 'Fail',
      toastCopied: 'Copied {v}', toastCopyFail: 'Copy failed'
    }
  };

  function getLang() {
    if (global.CO_I18N && typeof global.CO_I18N.getLang === 'function') {
      return global.CO_I18N.getLang();
    }
    return 'zh';
  }

  function t(key, vars) {
    var val = null;

    if (global.CO_I18N && typeof global.CO_I18N.t === 'function') {
      val = global.CO_I18N.t(key);
    }

    if (val == null || val === key) {
      var pack = FALLBACK[getLang()] || FALLBACK.zh;
      val = (pack && pack[key] != null) ? pack[key] : key;
    }

    if (vars && typeof val === 'string' && val.indexOf('{') !== -1) {
      val = val.replace(/\{(\w+)\}/g, function (m, k) {
        return vars[k] != null ? String(vars[k]) : m;
      });
    }

    return val;
  }

  function toast(msg, type) {
    if (global.App && App.utils && typeof App.utils.toast === 'function') {
      App.utils.toast(msg, type);
    } else if (global.console) {
      console.log('[web-palette]', msg);
    }
  }

  /* ---------- 1. 色彩工具 ---------- */
  var srgbToLinear = function (c) { return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  var linearToSrgb = function (c) { return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; };

  function hexToRgb(hex) {
    var s = String(hex).trim().replace(/^#/, '');
    if (/^[0-9a-f]{3}$/i.test(s)) s = s.split('').map(function (c) { return c + c; }).join('');
    if (!/^[0-9a-f]{6}$/i.test(s)) return { r: 0, g: 0, b: 0 };
    return { r: parseInt(s.slice(0, 2), 16), g: parseInt(s.slice(2, 4), 16), b: parseInt(s.slice(4, 6), 16) };
  }

  function rgbToHex(c) {
    return '#' + [c.r, c.g, c.b].map(function (v) {
      return clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0');
    }).join('').toUpperCase();
  }

  function luminance(c) {
    return 0.2126 * srgbToLinear(c.r / 255)
         + 0.7152 * srgbToLinear(c.g / 255)
         + 0.0722 * srgbToLinear(c.b / 255);
  }

  function contrastRatio(a, b) {
    var la = luminance(a), lb = luminance(b);
    var hi = Math.max(la, lb), lo = Math.min(la, lb);
    return (hi + 0.05) / (lo + 0.05);
  }

  var WHITE = { r: 255, g: 255, b: 255 };
  var BLACK = { r: 17, g: 17, b: 17 };

  function textOn(bg, target) {
    if (global.App && App.utils && typeof App.utils.textOn === 'function') {
      return App.utils.textOn(bg, target);
    }
    target = target == null ? 4.5 : target;
    var cWhite = contrastRatio(WHITE, bg);
    var cBlack = contrastRatio(BLACK, bg);
    if (cWhite >= target && cWhite >= cBlack) return '#FFFFFF';
    if (cBlack >= target && cBlack >= cWhite) return '#111111';
    return cWhite >= cBlack ? '#FFFFFF' : '#111111';
  }

  function rgbToOklab(r, g, b) {
    var lr = srgbToLinear(r / 255), lg = srgbToLinear(g / 255), lb = srgbToLinear(b / 255);
    var l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    var m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    var s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
    return {
      L: 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
      a: 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
      b: 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s
    };
  }

  function oklabToLinearRgb(L, a, b) {
    var l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    var m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    var s_ = L - 0.0894841775 * a - 1.2914855480 * b;
    var l = l_ * l_ * l_, m = m_ * m_ * m_, s = s_ * s_ * s_;
    return {
      r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      b: -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    };
  }

  function inGamut(lin, eps) {
    eps = eps == null ? 1e-4 : eps;
    return lin.r >= -eps && lin.r <= 1 + eps
        && lin.g >= -eps && lin.g <= 1 + eps
        && lin.b >= -eps && lin.b <= 1 + eps;
  }

  function oklchToRgb(o) {
    var L = clamp(o.L, 0, 1), C = Math.max(0, o.C || 0);
    var rad = (o.h || 0) * Math.PI / 180;
    var cosH = Math.cos(rad), sinH = Math.sin(rad);

    var lin = oklabToLinearRgb(L, C * cosH, C * sinH);
    if (!inGamut(lin)) {
      var lo = 0, hi = C;
      for (var i = 0; i < 18; i++) {
        var mid = (lo + hi) / 2;
        if (inGamut(oklabToLinearRgb(L, mid * cosH, mid * sinH))) lo = mid; else hi = mid;
      }
      lin = oklabToLinearRgb(L, lo * cosH, lo * sinH);
    }

    return {
      r: clamp(Math.round(linearToSrgb(clamp(lin.r, 0, 1)) * 255), 0, 255),
      g: clamp(Math.round(linearToSrgb(clamp(lin.g, 0, 1)) * 255), 0, 255),
      b: clamp(Math.round(linearToSrgb(clamp(lin.b, 0, 1)) * 255), 0, 255)
    };
  }

  function rgbToOklch(rgb) {
    var lab = rgbToOklab(rgb.r, rgb.g, rgb.b);
    var C = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
    var h = Math.atan2(lab.b, lab.a) * 180 / Math.PI;
    if (h < 0) h += 360;
    return { L: lab.L, C: C, h: h };
  }

  function mixRgb(a, b, tt) {
    return {
      r: Math.round(a.r + (b.r - a.r) * tt),
      g: Math.round(a.g + (b.g - a.g) * tt),
      b: Math.round(a.b + (b.b - a.b) * tt)
    };
  }

  function shiftL(rgb, dL) {
    var o = rgbToOklch(rgb);
    return oklchToRgb({ L: clamp(o.L + dL, 0, 1), C: o.C, h: o.h });
  }

  function ensureContrast(fg, bg, ratio) {
    if (contrastRatio(fg, bg) >= ratio) return fg;
    var goDark = luminance(bg) > 0.18;
    var o = rgbToOklch(fg);
    var L = o.L;

    for (var i = 0; i < 100; i++) {
      L += goDark ? -0.01 : 0.01;
      if (L <= 0.02 || L >= 0.99) break;
      var test = oklchToRgb({ L: L, C: o.C, h: o.h });
      if (contrastRatio(test, bg) >= ratio) return test;
    }
    return contrastRatio(BLACK, bg) >= contrastRatio(WHITE, bg) ? BLACK : WHITE;
  }

  /* ---------- 2. 五角色派生 ---------- */
  var ROLE_META = [
    { key: 'bg',      varName: '--bg',      labelKey: 'webRoleBg' },
    { key: 'primary', varName: '--primary', labelKey: 'webRolePrimary' },
    { key: 'accent',  varName: '--accent',  labelKey: 'webRoleAccent' },
    { key: 'text',    varName: '--text',    labelKey: 'webRoleText' },
    { key: 'border',  varName: '--border',  labelKey: 'webRoleBorder' }
  ];

  function buildScheme(mainInput) {
    var main = (mainInput && mainInput.r != null) ? mainInput : hexToRgb(mainInput);
    var o = rgbToOklch(main);

    var bg = oklchToRgb({ L: 0.975, C: Math.min(o.C * 0.06, 0.012), h: o.h });
    var primary = ensureContrast(oklchToRgb({ L: o.L, C: o.C * 0.85, h: o.h }), bg, 3.0);

    var accentL = o.L > 0.55 ? o.L - 0.2 : o.L + 0.15;
    var accentC = Math.max(o.C * 1.1, 0.15);

    var accent = oklchToRgb({
      L: clamp(accentL, 0.4, 0.7),
      C: accentC,
      h: o.h
    });
    accent = ensureContrast(accent, bg, 4.5);

    var text = oklchToRgb({ L: 0.22, C: Math.min(o.C * 0.18, 0.03), h: o.h });
    text = ensureContrast(text, bg, 7.0);

    var border = mixRgb(bg, text, 0.16);
    border = ensureContrast(border, bg, 1.3);

    var surface = shiftL(bg, -0.025);
    var textMuted = ensureContrast(mixRgb(text, bg, 0.38), bg, 4.5);
    var onPrimary = hexToRgb(textOn(primary));
    var primaryHover = luminance(primary) > 0.5 ? shiftL(primary, -0.07) : shiftL(primary, 0.07);
    var primarySoft = mixRgb(bg, primary, 0.13);

    var roles = {
      bg:      rgbToHex(bg),
      primary: rgbToHex(primary),
      accent:  rgbToHex(accent),
      text:    rgbToHex(text),
      border:  rgbToHex(border)
    };

    var extra = {
      surface:      rgbToHex(surface),
      textMuted:    rgbToHex(textMuted),
      onPrimary:    rgbToHex(onPrimary),
      primaryHover: rgbToHex(primaryHover),
      primarySoft:  rgbToHex(primarySoft)
    };

    var pairs = [
      { labelKey: 'contrastTextBg',    fg: roles.text,      bg: roles.bg,      need: 7.0 },
      { labelKey: 'contrastMutedBg',   fg: extra.textMuted, bg: roles.bg,      need: 4.5 },
      { labelKey: 'contrastAccentBg',  fg: roles.accent,    bg: roles.bg,      need: 4.5 },
      { labelKey: 'contrastOnPrimary', fg: extra.onPrimary, bg: roles.primary, need: 4.5 },
      { labelKey: 'contrastBorderBg',  fg: roles.border,    bg: roles.bg,      need: 1.3 }
    ];

    var report = pairs.map(function (p) {
      var r = contrastRatio(hexToRgb(p.fg), hexToRgb(p.bg));
      return {
        labelKey: p.labelKey,
        fg: p.fg,
        bg: p.bg,
        ratio: r,
        need: p.need,
        pass: r >= p.need,
        grade: r >= 7 ? 'aaa' : r >= 4.5 ? 'aa' : r >= 3 ? 'large' : 'fail'
      };
    });

    return { roles: roles, extra: extra, report: report };
  }

  /* ---------- 3. 渲染 ---------- */
  function renderRoleGrid(roles, genColors) {
    var el = $('wpRoleGrid');
    if (!el) return;

    var displayColors = (genColors && genColors.length >= 5)
      ? genColors.map(function (rgb) { return rgbToHex(rgb); })
      : [roles.bg, roles.primary, roles.accent, roles.text, roles.border];

    var copyTip = t('copyTipPrefix');

    el.innerHTML = ROLE_META.map(function (m, i) {
      var hex = displayColors[i];
      var textColor = textOn(hexToRgb(hex));

      return '<button type="button" class="co-stripe co-tip" style="--stripe-bg:' + hex + ';--stripe-text:' + textColor + ';" data-copy="' + hex + '" data-tip="' + copyTip + hex + '">' +
        '<span>' + hex + '</span>' +
        '<small>' + t(m.labelKey) + ' (' + m.varName + ')</small>' +
      '</button>';
    }).join('');
  }

  function renderPreview(roles, extra, genColors) {
    var el = $('wpPreview');
    if (!el) return;

    var ex = extra || {};
    var textMuted = ex.textMuted || roles.border;
    var surface = ex.surface || roles.bg;
    var onPrimary = ex.onPrimary || textOn(hexToRgb(roles.primary));

    var bgRgb = hexToRgb(roles.bg);
    var primarySoft = rgbToHex(mixRgb(bgRgb, hexToRgb(roles.primary), 0.08)); 
    var bgPrimary10 = rgbToHex(mixRgb(bgRgb, hexToRgb(roles.primary), 0.12)); 
    var bgAccent10 = rgbToHex(mixRgb(bgRgb, hexToRgb(roles.accent), 0.12));
    var bgText5 = rgbToHex(mixRgb(bgRgb, hexToRgb(roles.text), 0.06));

    var bannerBg = roles.primary;
    var bannerTextColor = textOn(hexToRgb(roles.primary));

    if (genColors && genColors.length >= 3) {
      var c1 = rgbToHex(genColors[0]);
      var c2 = rgbToHex(genColors[1]);
      var c3 = rgbToHex(genColors[2]);
      bannerBg = 'linear-gradient(135deg, ' + c1 + ' 0%, ' + c2 + ' 50%, ' + c3 + ' 100%)';
      bannerTextColor = textOn(hexToRgb(c2));
    }

    var demoNames = String(t('wpDemoNames')).split('|');
    function demoName(i) { return demoNames[i] || ('User ' + (i + 1)); }
    var currency = t('wpCurrency'); /* 【修复】获取货币符号 */

    var html = [
      '<div style="background: ' + roles.bg + '; border-radius: 12px; border: 2px dashed ' + roles.primary + '; overflow: hidden; font-family: var(--nm-font); display: grid; grid-template-columns: 220px 1fr; grid-template-rows: 64px 1fr; height: 600px; box-sizing: border-box; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">',

        /* Logo */
        '<div class="co-tip" data-tip="' + t('wpSandboxTip') + '" style="grid-column: 1; grid-row: 1; border-right: 1px solid ' + roles.border + '; border-bottom: 1px solid ' + roles.border + '; background: ' + surface + '; padding: 0 20px; display: flex; align-items: center; cursor: default;">',
          '<div style="font-size: 18px; font-weight: 800; color: ' + roles.primary + '; letter-spacing: -0.5px; display: flex; align-items: center; gap: 8px;">',
            '<div style="width: 24px; height: 24px; background: ' + roles.primary + '; color: ' + onPrimary + '; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px;">B</div>',
            t('wpBrandName'),
          '</div>',
        '</div>',

        /* 顶栏 */
        '<header style="grid-column: 2; grid-row: 1; border-bottom: 1px solid ' + roles.border + '; background: ' + surface + '; padding: 0 24px; display: flex; align-items: center; justify-content: space-between;">',
          '<div style="display: flex; gap: 24px; font-size: 14px; color: ' + textMuted + ';">',
            '<span style="color: ' + roles.text + '; font-weight: 600;">' + t('wpConsole') + '</span>',
            '<span style="color: ' + roles.accent + ';">' + t('wpDocs') + '</span>',
          '</div>',
          '<div style="display: flex; gap: 16px; align-items: center;">',
            '<button type="button" style="padding: 6px 12px; font-size: 13px; border-radius: 6px; border: 1px solid ' + roles.border + '; background: transparent; color: ' + roles.text + '; cursor: pointer;">' + t('wpLogin') + '</button>',
            '<div class="co-tip" data-tip="' + t('wpUserCenter') + '" style="width: 32px; height: 32px; border-radius: 50%; background: ' + roles.accent + '; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; cursor: pointer;">U</div>',
          '</div>',
        '</header>',

        /* 侧边栏 */
        '<aside style="grid-column: 1; grid-row: 2; border-right: 1px solid ' + roles.border + '; background: ' + surface + '; padding: 20px 16px; display: flex; flex-direction: column;">',
          '<nav style="display: flex; flex-direction: column; gap: 4px; font-size: 14px; font-weight: 500;">',
            '<a href="#" onclick="return false;" style="padding: 10px 12px; border-radius: 8px; background: ' + bgPrimary10 + '; color: ' + roles.primary + '; text-decoration: none; display: flex; align-items: center; gap: 10px;"><span style="opacity:0.7;">⌂</span> ' + t('wpNavHome') + '</a>',
            '<a href="#" onclick="return false;" style="padding: 10px 12px; border-radius: 8px; color: ' + textMuted + '; text-decoration: none; display: flex; align-items: center; gap: 10px;"><span style="opacity:0.7;">📊</span> ' + t('wpNavProd') + '</a>',
            '<a href="#" onclick="return false;" style="padding: 10px 12px; border-radius: 8px; color: ' + textMuted + '; text-decoration: none; display: flex; align-items: center; gap: 10px;"><span style="opacity:0.7;">👥</span> ' + t('wpNavAbout') + '</a>',
            '<a href="#" onclick="return false;" style="padding: 10px 12px; border-radius: 8px; color: ' + textMuted + '; text-decoration: none; display: flex; align-items: center; gap: 10px;"><span style="opacity:0.7;">⚙️</span> ' + t('wpSettings') + '</a>',
          '</nav>',
          '<div style="margin-top: auto; padding-top: 16px; border-top: 1px solid ' + roles.border + '; font-size: 12px; color: ' + textMuted + ';">',
            t('wpCopyright') + '<br>' + t('wpAllRightsReserved'),
          '</div>',
        '</aside>',

        /* 主内容 */
        '<main style="grid-column: 2; grid-row: 2; background: ' + roles.bg + '; overflow-y: auto; min-height: 0; padding: 24px; display: flex; flex-direction: column; gap: 20px;">',

          '<div style="background: ' + bannerBg + '; padding: 24px 28px; border-radius: 12px; position: relative; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">',
            '<h2 style="font-size: 24px; margin: 0 0 8px 0; color: ' + bannerTextColor + '; font-weight: 700;">' + t('wpHeroTitle') + '</h2>',
            '<p style="font-size: 14px; margin: 0 0 16px 0; color: ' + bannerTextColor + '; opacity: 0.85; max-width: 400px; line-height: 1.5;">' + t('wpHeroDesc') + '</p>',
            '<button type="button" style="padding: 8px 20px; border-radius: 6px; font-size: 13px; font-weight: 600; border: none; background: ' + roles.bg + '; color: ' + roles.primary + '; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">' + t('wpBtnPrimary') + '</button>',
          '</div>',

          '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">',
            '<div style="background: ' + surface + '; border: 1px solid ' + roles.border + '; border-radius: 10px; padding: 20px;">',
              '<div style="font-size: 13px; color: ' + textMuted + '; margin-bottom: 8px;">' + t('wpVisits') + '</div>',
              '<div style="font-size: 28px; font-weight: 700; color: ' + roles.text + '; margin-bottom: 8px;">84,254</div>',
              '<div style="font-size: 12px; color: ' + roles.accent + ';">↑ 12.5% ' + t('wpVsLastWeek') + '</div>',
            '</div>',
            '<div style="background: ' + surface + '; border: 1px solid ' + roles.border + '; border-radius: 10px; padding: 20px;">',
              '<div style="font-size: 13px; color: ' + textMuted + '; margin-bottom: 8px;">' + t('wpCardTitle') + '</div>',
              '<div style="font-size: 28px; font-weight: 700; color: ' + roles.text + '; margin-bottom: 8px;">1,204</div>',
              '<div style="font-size: 12px; color: ' + roles.primary + ';">↑ 4.2% ' + t('wpVsLastWeek') + '</div>',
            '</div>',
            '<div style="background: ' + surface + '; border: 1px solid ' + roles.border + '; border-radius: 10px; padding: 20px;">',
              '<div style="font-size: 13px; color: ' + textMuted + '; margin-bottom: 8px;">' + t('wpConversion') + '</div>',
              '<div style="font-size: 28px; font-weight: 700; color: ' + roles.text + '; margin-bottom: 8px;">3.84%</div>',
              '<div style="font-size: 12px; color: ' + textMuted + ';">' + t('wpFlat') + '</div>',
            '</div>',
          '</div>',

          '<div style="background: ' + surface + '; border: 1px solid ' + roles.border + '; border-radius: 10px; overflow: hidden;">',
            '<div style="padding: 16px 20px; border-bottom: 1px solid ' + roles.border + '; display: flex; justify-content: space-between; align-items: center;">',
              '<h3 style="font-size: 15px; font-weight: 600; margin: 0; color: ' + roles.text + ';">' + t('wpRecentRecords') + '</h3>',
              '<button type="button" style="font-size: 12px; padding: 4px 10px; background: ' + bgPrimary10 + '; color: ' + roles.primary + '; border: none; border-radius: 4px; cursor: pointer;">' + t('wpExportData') + '</button>',
            '</div>',
            '<table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">',
              '<thead style="background: ' + bgPrimary10 + '; color: ' + roles.text + '; border-bottom: 1px solid ' + roles.border + ';">',
                '<tr><th style="padding: 12px 20px; font-weight: 500;">' + t('wpOrderNo') + '</th><th style="padding: 12px 20px; font-weight: 500;">' + t('wpCustomer') + '</th><th style="padding: 12px 20px; font-weight: 500;">' + t('wpStatus') + '</th><th style="padding: 12px 20px; font-weight: 500;">' + t('wpAmount') + '</th></tr>',
              '</thead>',
              '<tbody style="color: ' + roles.text + ';">',
                '<tr><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';">#ORD-001</td><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';">' + demoName(0) + '</td><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';"><span style="color: ' + roles.accent + '; background: ' + bgAccent10 + '; padding: 2px 8px; border-radius: 4px;">' + t('wpCompleted') + '</span></td><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';">' + currency + '1,200.00</td></tr>',
                '<tr><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';">#ORD-002</td><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';">' + demoName(1) + '</td><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';"><span style="color: ' + roles.primary + '; background: ' + bgPrimary10 + '; padding: 2px 8px; border-radius: 4px;">' + t('wpTag') + '</span></td><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';">' + currency + '3,450.00</td></tr>',
                '<tr><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';">#ORD-003</td><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';">' + demoName(2) + '</td><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';"><span style="color: ' + textMuted + '; background: ' + bgText5 + '; padding: 2px 8px; border-radius: 4px;">' + t('wpCancelled') + '</span></td><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';">' + currency + '890.00</td></tr>',
                '<tr><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';">#ORD-004</td><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';">' + demoName(3) + '</td><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';"><span style="color: ' + roles.accent + '; background: ' + bgAccent10 + '; padding: 2px 8px; border-radius: 4px;">' + t('wpCompleted') + '</span></td><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';">' + currency + '5,600.00</td></tr>',
                '<tr><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';">#ORD-005</td><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';">' + demoName(4) + '</td><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';"><span style="color: ' + roles.primary + '; background: ' + bgPrimary10 + '; padding: 2px 8px; border-radius: 4px;">' + t('wpTag') + '</span></td><td style="padding: 12px 20px; border-bottom: 1px solid ' + roles.border + ';">' + currency + '2,100.00</td></tr>',
                '<tr><td style="padding: 12px 20px;">#ORD-006</td><td style="padding: 12px 20px;">' + demoName(5) + '</td><td style="padding: 12px 20px;"><span style="color: ' + roles.accent + '; background: ' + bgAccent10 + '; padding: 2px 8px; border-radius: 4px;">' + t('wpCompleted') + '</span></td><td style="padding: 12px 20px;">' + currency + '780.00</td></tr>',
              '</tbody>',
            '</table>',
          '</div>',

        '</main>',
      '</div>'
    ].join('');

    el.innerHTML = html;
  }
  function renderReport(report) {
    var el = $('wpContrastList');
    if (!el) return;

    el.innerHTML = report.map(function (p) {
      var cls = p.pass ? (p.ratio >= 4.5 ? 'ok' : 'warn') : 'fail';
      var gradeLabel = p.grade === 'aaa' ? 'AAA'
                     : p.grade === 'aa' ? 'AA'
                     : p.grade === 'large' ? t('gradeLarge')
                     : t('gradeFail');

      return '<div class="co-data-row">' +
        '<div class="co-data-label">' +
          '<div class="co-data-swatch" style="background:' + p.bg + ';color:' + p.fg + ';' +
               'display:flex;align-items:center;justify-content:center;' +
               'font-size:10px;font-weight:700;border:1px solid rgba(0,0,0,.08);">Aa</div>' +
          '<span class="co-data-name">' + t(p.labelKey) + '</span>' +
        '</div>' +
        '<div class="co-data-values">' +
          '<div class="co-data-item"><span class="co-data-text" style="font-family:var(--nm-mono);">' +
            p.ratio.toFixed(2) + ':1</span></div>' +
          '<div class="co-data-item"><span class="co-data-text"><strong>' + t('wpReq') + '</strong>' +
            p.need.toFixed(1) + ':1</span></div>' +
          '<div class="co-data-item"><span class="co-contrast-badge ' + cls + '">' +
            gradeLabel + '</span></div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function buildCss(roles, extra) {
    return [
      '/* 网页配色方案 · 由主色 ' + roles.primary + ' 派生 */',
      ':root {',
      '',
      '  /* —— 五个界面角色 —— */',
      '  --bg:      ' + roles.bg + ';   /* 背景：页面底色 */',
      '  --primary: ' + roles.primary + ';   /* 主色：主按钮、关键操作 */',
      '  --accent:  ' + roles.accent + ';   /* 强调色：链接、提示 */',
      '  --text:    ' + roles.text + ';   /* 正文：正文与标题 */',
      '  --border:  ' + roles.border + ';   /* 边框：分隔线与输入框 */',
      '',
      '  /* —— 辅助变量（可直接改） —— */',
      '  --surface:       ' + extra.surface + ';   /* 卡片 / 浮层底色 */',
      '  --text-muted:    ' + extra.textMuted + ';   /* 次要文字 */',
      '  --on-primary:    ' + extra.onPrimary + ';   /* 主色上的文字 */',
      '  --primary-hover: ' + extra.primaryHover + ';   /* 主按钮悬停 */',
      '  --primary-soft:  ' + extra.primarySoft + ';   /* 标签 / 浅色底 */',
      '',
      '  /* 想换风格时：改 --primary 一个值，其余按需微调即可 */',
      '}'
    ].join('\n');
  }

  function renderCode(roles, extra) {
    var el = $('wpCode');
    if (!el) return;
    el.value = buildCss(roles, extra);
  }

  /* ---------- 4. 对外接口 ---------- */
  var current = null;

  function renderAll(scheme, genColors) {
    renderRoleGrid(scheme.roles, genColors);
    renderPreview(scheme.roles, scheme.extra, genColors);
    renderReport(scheme.report);
    renderCode(scheme.roles, scheme.extra);
  }

  function update(mainInput, genColors) {
    if (!mainInput) return;
    var scheme = buildScheme(mainInput);
    current = { scheme: scheme, genColors: genColors };
    renderAll(scheme, genColors);
  }

  function refresh() {
    if (!current) return;
    renderAll(current.scheme, current.genColors);
  }

  function copyCss() {
    if (!current) {
      toast(t('toastCopyFail'), 'fail');
      return;
    }
    var text = buildCss(current.scheme.roles, current.scheme.extra);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        toast(t('toastCopied', { v: 'CSS' }), 'ok');
      }).catch(function () {
        toast(t('toastCopyFail'), 'fail');
      });
    } else {
      toast(t('toastCopyFail'), 'fail');
    }
  }

  function bind() {
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-wp-action="copy-css"]')) copyCss();
    });

    document.addEventListener('co:langchange', function () {
      refresh();
    });
  }

  function boot() {
    bind();

    var rootCSS = getComputedStyle(document.documentElement);
    var accent = (rootCSS.getPropertyValue('--nm-accent') || '#2f6f8f').trim();
    update(accent);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  global.WebPalette = {
    update: update,
    refresh: refresh,
    copyCss: copyCss
  };

})(window);