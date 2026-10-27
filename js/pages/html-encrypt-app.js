/* ============================================================
 * html-encrypt-app.js —— 静态网页加密工具入口
 * 单文件融合：运行时引擎加载 + 模板渲染 + 表单 + 下载
 * 离线可用，无任何网络请求
 * 依赖：系统层 core.js（App.utils.toast）
 * ============================================================ */
(function () {
  'use strict';

  /* ============================================================
   * 0. 工具：读 text/plain 块
   * ============================================================ */
  function readPlain(id) {
    var el = document.getElementById(id);
    if (!el) return '';
    return el.tagName === 'TEXTAREA' ? el.value : el.textContent;
  }

  /* ============================================================
   * 1. 加载运行时引擎
   * ============================================================ */
  var ENGINE_SOURCE = readPlain('engine-src');
  if (!ENGINE_SOURCE) {
    console.error('[html-encrypt] 缺少 #engine-src 文本块，无法启动');
    return;
  }
  try {
    (new Function(ENGINE_SOURCE))();
  } catch (err) {
    console.error('[html-encrypt] 引擎加载失败', err);
    return;
  }
  var Engine = window.StatiCryptEngine;
  if (!Engine) {
    console.error('[html-encrypt] StatiCryptEngine 未挂载');
    return;
  }

  /* ============================================================
   * 2. 占位符渲染
   * ============================================================ */
  function renderTemplate(tpl, data) {
    return tpl.replace(/\/\*\[\|\s*(\w+)\s*\|]\*\/\s*0/g, function (_, key) {
      if (!data || data[key] === undefined) return key;
      if (typeof data[key] === 'object') return JSON.stringify(data[key]);
      return String(data[key]);
    });
  }

  /* ============================================================
   * 3. i18n
   * ============================================================ */
  var DICT = {
    zh: {
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
      'brandName': '核心工具箱',
      'hero.title': 'StatiCrypt',
      'hero.h1': '给静态 HTML 加一道密码锁',
      'hero.h1A': '给静态 HTML 加一道',
      'hero.h1B': '密码锁',
      'chip.1': 'AES-256 军规级加密',
      'chip.2': '纯本地 / 零上传',
      'chip.3': '无服务器 / 离线可用',
      'chip.4': '开源 / 支持命令行',
      'hero.lede': '全程在浏览器本地加密，密码不离开你的设备。生成一个带密码提示框的独立 HTML 文件，上传到任何静态托管即可使用。',
      'nav.encrypt': '加密',
      'nav.result': '结果',
      'nav.menu': '导航',
      'sec1.title': '加密表单',
      'sec1.hint': '密码 + HTML 内容，本地生成加密串',
      'sec2.title': '加密结果',
      'sec2.hint': '下载后即为独立可用页面',
      'form.password': '密码',
      'form.passwordPh': '选一个长密码（建议 16 位以上）',
      'form.html': '待加密的 HTML / 字符串',
      'form.htmlPh': '<html><head>...',
      'form.remember': '添加「记住我」复选框（URL 后加 #staticrypt_logout 可退出）',
      'form.more': '+ 更多选项',
      'form.submit': '生成受密码保护的 HTML',
      'opt.title': '页面标题',
      'opt.titlePh': '默认：Economic Data Diagnostics',
      'opt.instructions': '显示给用户的提示语',
      'opt.instructionsPh': '默认：请输入密码以继续访问',
      'opt.placeholder': '密码框占位文字',
      'opt.placeholderPh': '默认：Password',
      'opt.remember': '「记住我」标签文字',
      'opt.rememberPh': '默认：记住我',
      'opt.days': '「记住我」过期天数',
      'opt.daysHint': '留空或填 0 表示不过期。',
      'opt.button': '解密按钮文字',
      'opt.buttonPh': '默认：解 锁',
      'opt.colorPrimary': '主色（按钮、图标等）',
      'opt.colorSecondary': '辅色（背景）',
      'result.download': '下载带密码提示的 HTML 文件',
      'result.placeholder': '加密后的字符串会显示在这里',
      'footer.sub': '纯前端加密 · 数据不离开浏览器',
      'toast.required': '❌ 密码和 HTML 内容都不能为空',
      'toast.ok': '✅ 加密 HTML 已生成',
      'toast.fail': '❌ 加密失败',
      'toast.noTpl': '❌ 找不到页面模板，无法生成',
      'toast.noBoot': '❌ 缺少生成页启动脚本',
      'err.wrong': '密码错误，请重试',
      'toggle.show': '显示密码',
      'toggle.hide': '隐藏密码'
    },
    en: {
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
      'brandName': 'Core Toolbox',
      'hero.title': 'StatiCrypt',
      'hero.h1': 'Password protect a static HTML page',
      'hero.h1A': 'Password protect your ',
      'hero.h1B': 'static HTML',
      'chip.1': 'AES-256 WebCrypto',
      'chip.2': '100% Client-side',
      'chip.3': 'Serverless / Offline',
      'chip.4': 'CLI & Open Source',
      'hero.lede': 'Everything is encrypted locally in your browser. Download a standalone HTML file with a password prompt and host it anywhere.',
      'nav.encrypt': 'Encrypt',
      'nav.result': 'Result',
      'nav.menu': 'Navigation',
      'sec1.title': 'Encrypt form',
      'sec1.hint': 'Password + HTML, generated locally',
      'sec2.title': 'Encrypted HTML',
      'sec2.hint': 'Download and use as a standalone page',
      'form.password': 'Password',
      'form.passwordPh': 'Choose a long password (16+ chars)',
      'form.html': 'HTML/string to encrypt',
      'form.htmlPh': '<html><head>...',
      'form.remember': 'Add "Remember me" checkbox (append #staticrypt_logout to URL to logout)',
      'form.more': '+ More options',
      'form.submit': 'Generate password protected HTML',
      'opt.title': 'Page title',
      'opt.titlePh': 'Default: Economic Data Diagnostics',
      'opt.instructions': 'Instructions to display the user',
      'opt.instructionsPh': 'Default: Enter the password to continue',
      'opt.placeholder': 'Password input placeholder',
      'opt.placeholderPh': 'Default: Password',
      'opt.remember': '"Remember me" checkbox label',
      'opt.rememberPh': 'Default: Remember me',
      'opt.days': '"Remember me" expiration in days',
      'opt.daysHint': 'Leave empty or set to 0 for no expiration.',
      'opt.button': 'Decrypt button label',
      'opt.buttonPh': 'Default: DECRYPT',
      'opt.colorPrimary': 'Primary color',
      'opt.colorSecondary': 'Secondary color',
      'result.download': 'Download html file with password prompt',
      'result.placeholder': 'Your encrypted string',
      'footer.sub': 'Client-side only · data never leaves your browser',
      'toast.required': '❌ Password and HTML are required',
      'toast.ok': '✅ Encrypted HTML generated',
      'toast.fail': '❌ Encryption failed',
      'toast.noTpl': '❌ Template not found, cannot generate',
      'toast.noBoot': '❌ Boot script missing',
      'err.wrong': 'Wrong password, please try again',
      'toggle.show': 'Show password',
      'toggle.hide': 'Hide password'
    }
  };

  var lang = (document.documentElement.lang || 'zh').toLowerCase().indexOf('en') === 0 ? 'en' : 'zh';

  function t(key) {
    return (DICT[lang] && DICT[lang][key]) || key;
  }

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = next === 'en' ? 'en' : 'zh-CN';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var text = DICT[next] && DICT[next][el.getAttribute('data-i18n')];
      if (text != null) el.textContent = text;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var text = DICT[next] && DICT[next][el.getAttribute('data-i18n-placeholder')];
      if (text != null) el.setAttribute('placeholder', text);
    });
    var zhEl = document.querySelector('#langBtn .zh');
    var enEl = document.querySelector('#langBtn .en');
    if (zhEl && enEl) {
      zhEl.classList.toggle('active', next === 'zh');
      enEl.classList.toggle('active', next === 'en');
    }
  }

  /* ============================================================
   * 4. 防呆：非工具页直接退出
   * ============================================================ */
  var form = document.getElementById('encrypt_form');
  if (!form) return;

  /* ============================================================
   * 5. 「更多选项」折叠 + 初始滚动复位
   * ============================================================ */
  var moreToggle = document.getElementById('toggle-extra-option');
  if (moreToggle) {
    moreToggle.addEventListener('click', function (e) {
      e.preventDefault();
      var opts = document.getElementById('extra-options');
      if (opts) opts.classList.toggle('is-hidden');
    });
  }

  var htmlInput = document.getElementById('unencrypted_html');
  if (htmlInput) {
    htmlInput.scrollTop = 0;
  }

  /* ============================================================
   * 6. 表单提交：加密 → 渲染模板 → 下载
   * ============================================================ */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var unencrypted = htmlInput ? htmlInput.value : '';
    var passwordEl = document.getElementById('password');
    var password = passwordEl ? passwordEl.value : '';

    if (!password || !unencrypted) {
      if (window.App && App.utils && App.utils.toast) {
        App.utils.toast(t('toast.required'), 'fail');
      }
      return;
    }

    var templateSrc = readPlain('tpl-staticrypt');
    if (!templateSrc) {
      if (window.App && App.utils && App.utils.toast) {
        App.utils.toast(t('toast.noTpl'), 'fail');
      }
      return;
    }

    var bootSrc = readPlain('boot-src');
    if (!bootSrc) {
      if (window.App && App.utils && App.utils.toast) {
        App.utils.toast(t('toast.noBoot'), 'fail');
      }
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    var oldBtnText = btn ? btn.textContent : '';
    if (btn) {
      btn.textContent = lang === 'en' ? 'Generating...' : '生成中...';
      btn.disabled = true;
    }

    var title = (document.getElementById('template_title').value.trim()) || 'Economic Data Diagnostics';
    var instructions = (document.getElementById('template_instructions').value.trim()) ||
      (lang === 'en' ? 'Enter the password to continue' : '请输入密码以继续访问');
    var placeholder = (document.getElementById('template_placeholder').value.trim()) || 'Password';
    var rememberTxt = (document.getElementById('template_remember').value.trim()) ||
      (lang === 'en' ? 'Remember me' : '记住我');
    var days = parseInt(document.getElementById('remember_in_days').value, 10) || 0;
    var buttonTxt = (document.getElementById('template_button').value.trim()) ||
      (lang === 'en' ? 'DECRYPT' : '解 锁');
    var colorPrimary = (document.getElementById('template_color_primary').value.trim()) || '#6d5dfc';
    var colorSecondary = (document.getElementById('template_color_secondary').value.trim()) || '#e0e5ec';
    var isRemember = document.getElementById('remember').checked;

    var salt = Engine.generateRandomSalt();

    Engine.encode(unencrypted, password, salt)
      .then(function (payload) {
        var config = {
          payload: payload,
          salt: salt,
          remember: isRemember,
          rememberDays: days,
          error: lang === 'en' ? 'Wrong password, please try again' : '密码错误，请重试',
          toggleShow: lang === 'en' ? 'Show password' : '显示密码',
          toggleHide: lang === 'en' ? 'Hide password' : '隐藏密码'
        };

        var data = {
          template_title: title,
          template_instructions: instructions,
          template_placeholder: placeholder,
          template_remember: rememberTxt,
          template_button: buttonTxt,
          template_color_primary: colorPrimary,
          template_color_secondary: colorSecondary,
          template_toggle_show: config.toggleShow,
          template_toggle_hide: config.toggleHide,
          js_staticrypt_config: 'window.STATICRYPT_CONFIG = ' + JSON.stringify(config) + ';',
          js_crypto_engine: ENGINE_SOURCE,
          js_staticrypt_boot: bootSrc
        };

        var finalHtml = renderTemplate(templateSrc, data);

        var displayEl = document.getElementById('encrypted_html_display');
        if (displayEl) displayEl.textContent = payload;

        var blob = new Blob([finalHtml], { type: 'text/html;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var link = document.getElementById('download-link');
        if (link) {
          if (link.dataset.blobUrl) URL.revokeObjectURL(link.dataset.blobUrl);
          link.href = url;
          link.dataset.blobUrl = url;
          link.classList.remove('is-hidden');
        }

        if (window.App && App.utils && App.utils.toast) {
          App.utils.toast(t('toast.ok'), 'ok');
        }
      })
      .catch(function (err) {
        console.error('[html-encrypt] 生成失败', err);
        if (window.App && App.utils && App.utils.toast) {
          App.utils.toast(t('toast.fail'), 'fail');
        }
      })
      .then(function () {
        if (btn) {
          btn.textContent = oldBtnText;
          btn.disabled = false;
        }
      });
  });

  /* ============================================================
   * 7. 语言切换
   * ============================================================ */
  var langBtn = document.getElementById('langBtn');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      applyLang(lang === 'zh' ? 'en' : 'zh');
    });
  }
  applyLang(lang);
})();