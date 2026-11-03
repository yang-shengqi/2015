/* ============================================================
   Markdown 编辑器 · 满血版（最终完整修复版）
============================================================ */

/* ---------- 0. 第三方初始化 ---------- */
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
});
marked.setOptions({ breaks: true, gfm: true });

/* ---------- 1. 工具函数 ---------- */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderMath(formula, displayMode) {
  try {
    return katex.renderToString(formula, {
      displayMode,
      throwOnError: false,
      strict: false,
    });
  } catch (e) {
    return `<code>${escapeHtml(formula)}</code>`;
  }
}

function downloadFile(content, filename, mime) {
  const blob = new Blob([content], { type: mime + ';charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ============================================================
   2. 主逻辑
============================================================ */
(function () {
  'use strict';

  /* ---------- 2.1 语言 ---------- */
  let overrideLang = null;

  function getLang() {
    if (overrideLang) return overrideLang;
    try { return localStorage.getItem('co-lang') || 'zh'; } catch (e) { return 'zh'; }
  }
  function isEn() { return getLang() === 'en'; }

  const T_ZH = {
    lines: '行数', chars: '字数', ready: '实时渲染已就绪 · ',
    copy: '复制', copied: '已复制', copyFail: '复制失败',
    exportHtml: '导出 HTML', exportHtmlTip: '导出独立 HTML 文件',
    storageFull: '⚠ 本地存储已满，内容未保存',
    loaded: '已加载', readFail: '读取失败',
    imgTooBig: '⚠ 图片过大（>2MB），未插入',
    parseError: '解析出错，请检查语法。',
    cleared: '已清空',
    clearConfirm: '确定清空全部内容吗？此操作不可撤销，本地缓存也会一并清除。',
    resetConfirm: '确定要恢复初始示例吗？当前未保存的内容将丢失。',
  };
  const T_EN = {
    lines: 'Lines', chars: 'Chars', ready: 'Rendered at · ',
    copy: 'Copy', copied: 'Copied', copyFail: 'Copy failed',
    exportHtml: 'Export HTML', exportHtmlTip: 'Export standalone HTML',
    storageFull: '⚠ Local storage full, content not saved',
    loaded: 'Loaded', readFail: 'Read failed',
    imgTooBig: '⚠ Image too large (>2MB), not inserted',
    parseError: 'Parse error, please check syntax.',
    cleared: 'Cleared',
    clearConfirm: 'Clear all content? This cannot be undone. Local cache will be removed too.',
    resetConfirm: 'Restore default example? Unsaved changes will be lost.',
  };
  function getT() { return isEn() ? T_EN : T_ZH; }

  const STORAGE_TEXT = 'md_editor_content_full';
  const STORAGE_MODE = 'md_view_mode';
  const BIG_DOC = 80000;

  const defaultText = `# 欢迎使用 Markdown Pro

所有兼容性问题已修正。支持代码高亮、数学公式、Mermaid 图表。

### 1. 代码高亮（支持 c++、c# 等语言名）
\`\`\`cpp
#include <iostream>
int main() {
    std::cout << "Hello" << std::endl;
    return 0;
}
\`\`\`

### 2. 数学公式
行内公式 $E=mc^2$，块级公式：

$$
\\int_{a}^{b} x^2 dx = \\frac{b^3 - a^3}{3}
$$

行内代码里的 \$ 不会被当成公式：\`$not math$\`；转义的 \\$100 也正常。

### 3. 流程图
\`\`\`mermaid
graph TD
    A[开始] --> B{判断}
    B -- 是 --> C[执行操作]
    B -- 否 --> D[结束]
\`\`\`

### 4. 表格
| 功能 | 状态 |
| --- | --- |
| 代码高亮 | ✅ |
| 公式渲染 | ✅ |
| Mermaid | ✅ |
`;

  /* ---------- 2.2 DOM ---------- */
  const editor = document.getElementById('editor');
  const preview = document.getElementById('preview');
  if (!editor || !preview) return;

  const layout = document.getElementById('mdLayout');
  const lineNumbers = document.getElementById('lineNumbers');
  const statusSource = document.getElementById('statusSource');
  const statusPreview = document.getElementById('statusPreview');
  const toolBtns = document.querySelectorAll('.md-pane-toolbar .btn[data-type]');
  const openBtn = document.getElementById('openBtn');
  const saveBtn = document.getElementById('saveBtn');
  const printBtn = document.getElementById('printBtn');
  const fileInput = document.getElementById('fileInput');

  if (statusPreview) statusPreview.removeAttribute('data-i18n');

  let currentFileName = '';
  let syncEnabled = true;
  let lastLineCount = -1;

  if (lineNumbers) {
    editor.setAttribute('wrap', 'off');
    editor.style.whiteSpace = 'pre';
    editor.style.overflowWrap = 'normal';
    editor.style.overflowX = 'auto';
  }

  function setPreviewStatus(msg) {
    if (statusPreview) statusPreview.textContent = msg;
  }

  function updateStatus() {
    const text = editor.value;
    const lines = text.split('\n').length;
    const t = getT();

    if (statusSource) {
      const name = currentFileName ? ` | ${currentFileName}` : '';
      statusSource.textContent = `${t.lines}: ${lines} | ${t.chars}: ${text.length}${name}`;
    }

    if (lineNumbers && lines !== lastLineCount) {
      lastLineCount = lines;
      const arr = new Array(lines);
      for (let i = 0; i < lines; i++) arr[i] = i + 1;
      lineNumbers.textContent = arr.join('\n');
    }
    if (lineNumbers) lineNumbers.scrollTop = editor.scrollTop;
  }

  /* ---------- 2.6 渲染核心 ---------- */
  function isPreviewVisible() {
    if (!layout) return true;
    return layout.dataset.mode !== 'edit';
  }

  function buildTokenHTML(token) {
    switch (token.type) {
      case 'code': {
        if (token.lang === 'mermaid') {
          return `<div class="mermaid">${escapeHtml(token.code)}</div>`;
        }
        const validLang =
          token.lang && window.hljs && hljs.getLanguage(token.lang) ? token.lang : 'plaintext';
        let highlighted = escapeHtml(token.code);
        try {
          if (window.hljs) {
            const res = hljs.highlight(token.code, { language: validLang });
            highlighted = typeof res === 'string' ? res : res.value;
          }
        } catch (e) {}
        return `<pre><code class="hljs language-${validLang}">${highlighted}</code></pre>`;
      }
      case 'math_block': return renderMath(token.formula, true);
      case 'math_inline': return renderMath(token.formula, false);
      case 'inline_code': return `<code>${escapeHtml(token.code)}</code>`;
      case 'dollar': return '$';
      default: return '';
    }
  }

  function buildHTML(src) {
    const tokens = [];
    const PH = (i) => `\u0000TOKEN_${i}\u0000`;
    let md = src;

    md = md.replace(/^(?:```|~~~)([\w+.#-]*)[^\n]*\n([\s\S]*?)^(?:```|~~~)\s*$/gm, (m, lang, code) => {
      tokens.push({ type: 'code', lang: (lang || '').toLowerCase(), code });
      return `\n\n${PH(tokens.length - 1)}\n\n`;
    });

    md = md.replace(/^\$\$\s*([\s\S]+?)\s*\$\$\s*$/gm, (m, formula) => {
      tokens.push({ type: 'math_block', formula });
      return `\n\n${PH(tokens.length - 1)}\n\n`;
    });

    md = md.replace(/`([^`\n]+)`/g, (m, code) => {
      tokens.push({ type: 'inline_code', code });
      return PH(tokens.length - 1);
    });

    md = md.replace(/\\\$/g, () => {
      tokens.push({ type: 'dollar' });
      return PH(tokens.length - 1);
    });

    md = md.replace(/\$([^\$\n]+?)\$/g, (m, formula) => {
      tokens.push({ type: 'math_inline', formula });
      return PH(tokens.length - 1);
    });

    let html = marked.parse(md);

    html = html.replace(/<p>\s*(\u0000TOKEN_(\d+)\u0000)\s*<\/p>/g, (m, ph, idx) => {
      const t = tokens[Number(idx)];
      return t && (t.type === 'code' || t.type === 'math_block') ? ph : m;
    });

    tokens.forEach((token, i) => {
      html = html.split(PH(i)).join(buildTokenHTML(token));
    });

    if (window.DOMPurify) {
      html = DOMPurify.sanitize(html, {
        USE_PROFILES: { html: true, mathMl: true },
        ADD_ATTR: ['encoding', 'display'],
      });
    }

    return html;
  }

  function enhancePreview() {
    const t = getT();

    preview.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (/^(https?:|mailto:|\/\/)/i.test(href)) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
    });

    preview.querySelectorAll('pre').forEach((pre) => {
      if (pre.closest('.mermaid')) return;
      if (pre.querySelector('.md-copy-btn')) return;
      pre.style.position = 'relative';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'md-copy-btn';
      btn.textContent = t.copy;
      btn.style.cssText =
        'position:absolute;top:6px;right:6px;padding:2px 8px;font-size:12px;' +
        'line-height:1.6;border-radius:6px;border:1px solid rgba(0,0,0,.15);' +
        'background:rgba(255,255,255,.9);color:#555;cursor:pointer;opacity:.6;' +
        'transition:opacity .2s;';
      btn.addEventListener('mouseenter', () => (btn.style.opacity = '1'));
      btn.addEventListener('mouseleave', () => (btn.style.opacity = '.6'));
      btn.addEventListener('click', async () => {
        const code = pre.querySelector('code');
        const text = code ? code.textContent : pre.textContent;
        const cur = getT();
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = cur.copied;
          setTimeout(() => (btn.textContent = getT().copy), 1200);
        } catch (e) {
          setPreviewStatus(cur.copyFail);
        }
      });
      pre.appendChild(btn);
    });

    buildTOC();
  }

  function buildTOC() {
    const toc = document.getElementById('mdToc');
    if (!toc) return;
    const heads = preview.querySelectorAll('h1, h2, h3, h4');
    toc.innerHTML = '';
    if (!heads.length) return;

    const frag = document.createDocumentFragment();
    heads.forEach((h, i) => {
      if (!h.id) h.id = 'md-heading-' + i;
      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      a.style.cssText =
        'display:block;text-decoration:none;color:inherit;padding:2px 0;' +
        `padding-left:${(Number(h.tagName[1]) - 1) * 12}px;` +
        'font-size:13px;opacity:.8;cursor:pointer;';
      a.addEventListener('click', (e) => {
        e.preventDefault();
        h.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      frag.appendChild(a);
    });
    toc.appendChild(frag);
  }

  function render() {
    if (!editor.value.trim()) {
      preview.innerHTML = '';
      setPreviewStatus(getT().ready + new Date().toLocaleTimeString());
      updateStatus();
      saveLocalDebounced();
      return;
    }

    const prevScrollTop = preview.scrollTop;
    const t0 = performance.now();

    try {
      const html = buildHTML(editor.value);
      preview.innerHTML = html;
      preview.scrollTop = prevScrollTop;

      enhancePreview();
      if (isPreviewVisible()) scheduleMermaid();

      const ms = (performance.now() - t0).toFixed(0);
      setPreviewStatus(`${getT().ready}${new Date().toLocaleTimeString()} · ${ms}ms`);
    } catch (err) {
      preview.innerHTML = `<p style="color:red">${getT().parseError}</p>` +
        `<pre style="color:var(--nm-text-3);font-size:12px">${escapeHtml(String(err && err.message ? err.message : err))}</pre>`;
    }

    updateStatus();
    saveLocalDebounced();
  }

  let renderTimer = null;
  function scheduleRender() {
    clearTimeout(renderTimer);
    const delay = editor.value.length > BIG_DOC ? 500 : 150;
    renderTimer = setTimeout(render, delay);
  }

  let mermaidTimer = null;
  function scheduleMermaid() {
    clearTimeout(mermaidTimer);
    mermaidTimer = setTimeout(() => {
      try {
        const nodes = preview.querySelectorAll('.mermaid:not([data-processed="true"])');
        if (!nodes.length || typeof mermaid === 'undefined') return;
        if (typeof mermaid.run === 'function') {
          const p = mermaid.run({ nodes });
          if (p && p.catch) p.catch((e) => console.warn('Mermaid render failed:', e));
        } else {
          mermaid.init(undefined, nodes);
        }
      } catch (err) {}
    }, 300);
  }

  let saveTimer = null;
  function saveLocalDebounced() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { localStorage.setItem(STORAGE_TEXT, editor.value); } catch (e) { setPreviewStatus(getT().storageFull); }
    }, 500);
  }

  /* ---------- 2.10 双向滚动同步 ---------- */
  let syncSource = null;
  let syncUnlock = null;
  let syncRaf = 0;

  function syncScroll(src, target) {
    if (!syncEnabled || !target) return;
    if (syncSource && syncSource !== src) return;

    syncSource = src;
    clearTimeout(syncUnlock);
    syncUnlock = setTimeout(() => (syncSource = null), 100);

    cancelAnimationFrame(syncRaf);
    syncRaf = requestAnimationFrame(() => {
      const max = src.scrollHeight - src.clientHeight;
      const ratio = max > 0 ? src.scrollTop / max : 0;
      const tMax = target.scrollHeight - target.clientHeight;
      if (tMax > 0) target.scrollTop = ratio * tMax;
    });
  }

  editor.addEventListener('scroll', () => {
    if (lineNumbers) lineNumbers.scrollTop = editor.scrollTop;
    if (isPreviewVisible()) syncScroll(editor, preview);
  }, { passive: true });

  preview.addEventListener('scroll', () => {
    if (!isPreviewVisible()) return;
    syncScroll(preview, editor);
  }, { passive: true });

  /* ---------- 2.11 插入格式 ---------- */
  function insertFormat(type) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const text = editor.value;
    const selected = text.substring(start, end);

    const isBlock = ['h1', 'h2', 'h3', 'quote', 'codeblock', 'ul', 'ol'].includes(type);
    const lineStart = text.lastIndexOf('\n', start - 1) + 1;
    const prefix = isBlock && lineStart !== start ? '\n' : '';
    const p = prefix.length;

    let replacement = '';
    let caret = -1;
    let selLen = 0;

    switch (type) {
      case 'bold': replacement = `**${selected || '粗体'}**`; if (!selected) caret = start + 2; break;
      case 'italic': replacement = `*${selected || '斜体'}*`; if (!selected) caret = start + 1; break;
      case 'del': replacement = `~~${selected || '删除'}~~`; if (!selected) caret = start + 2; break;
      case 'h1': replacement = `${prefix}# ${selected || '一级标题'}`; if (!selected) caret = start + p + 2; break;
      case 'h2': replacement = `${prefix}## ${selected || '二级标题'}`; if (!selected) caret = start + p + 3; break;
      case 'h3': replacement = `${prefix}### ${selected || '三级标题'}`; if (!selected) caret = start + p + 4; break;
      case 'quote': replacement = `${prefix}> ${selected || '引用内容'}`; if (!selected) caret = start + p + 2; break;
      case 'code': replacement = `\`${selected || 'code'}\``; if (!selected) caret = start + 1; break;
      case 'codeblock': {
        const code = selected || '// 代码';
        const head = '```javascript\n';
        replacement = `${prefix}${head}${code}\n\`\`\``;
        caret = start + p + head.length;
        break;
      }
      case 'ul': replacement = `${prefix}- ${selected || '列表项'}`; if (!selected) caret = start + p + 2; break;
      case 'ol': replacement = `${prefix}1. ${selected || '列表项'}`; if (!selected) caret = start + p + 3; break;
      case 'link': {
        const label = selected || '链接文字';
        replacement = `[${label}](https://)`;
        if (selected) {
          caret = start + label.length + 3;
          selLen = 8;
        } else {
          caret = start + 1;
          selLen = label.length;
        }
        break;
      }
      case 'hr': replacement = `\n---\n`; caret = start + replacement.length; break;
      default: return;
    }

    editor.setRangeText(replacement, start, end, 'end');
    editor.focus();

    if (caret >= 0) {
      editor.setSelectionRange(caret, caret + selLen);
    } else if (selected) {
      const pos = start + replacement.length;
      editor.setSelectionRange(pos, pos);
    }

    render();
  }

  function indentBlock(outdent) {
    const text = editor.value;
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const lineStart = text.lastIndexOf('\n', start - 1) + 1;
    let lineEnd = text.indexOf('\n', end);
    if (lineEnd === -1) lineEnd = text.length;

    const lines = text.slice(lineStart, lineEnd).split('\n');
    const lastIdx = lines.length - 1;

    const deltas = lines.map((l) => {
      if (outdent) {
        const m = l.match(/^ {1,2}/);
        return m ? -m[0].length : 0;
      }
      return 2;
    });

    const nextLines = lines.map((l) => outdent ? l.replace(/^ {1,2}/, '') : '  ' + l);
    const nextBlock = nextLines.join('\n');

    const startInLine = start - lineStart;
    const lastLineStartAbs = lineEnd - lines[lastIdx].length;
    const endInLine = end - lastLineStartAbs;

    editor.setRangeText(nextBlock, lineStart, lineEnd, 'preserve');

    const newStart = lineStart + Math.max(0, startInLine + deltas[0]);
    const newLastLineStart = lineStart + nextBlock.length - nextLines[lastIdx].length;
    const newEnd = newLastLineStart + Math.max(0, endInLine + deltas[lastIdx]);

    editor.setSelectionRange(newStart, Math.max(newStart, newEnd));
    editor.focus();
  }

  toolBtns.forEach((btn) => {
    btn.addEventListener('mousedown', (e) => e.preventDefault());
    btn.addEventListener('click', () => insertFormat(btn.dataset.type));
  });

  async function loadFile(file) {
    try {
      const text = await file.text();
      editor.value = text;
      currentFileName = file.name;
      render();
      document.title = file.name + ' · Markdown';
      setPreviewStatus(`${getT().loaded}: ${file.name}`);
    } catch (err) {
      setPreviewStatus(`${getT().readFail}: ${err.message}`);
    }
  }

  if (openBtn) {
    openBtn.addEventListener('click', async () => {
      if (window.location.protocol !== 'file:' && 'showOpenFilePicker' in window) {
        try {
          const [handle] = await window.showOpenFilePicker({
            types: [{ description: 'Markdown', accept: { 'text/markdown': ['.md', '.markdown'] } }],
          });
          const file = await handle.getFile();
          await loadFile(file);
          return;
        } catch (err) {
          if (err.name === 'AbortError') return;
        }
      }
      if (fileInput) fileInput.click();
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;
      await loadFile(file);
      fileInput.value = '';
    });
  }

  async function saveFile() {
    const name = currentFileName || 'document.md';
    if (window.location.protocol !== 'file:' && 'showSaveFilePicker' in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: name,
          types: [{ description: 'Markdown', accept: { 'text/markdown': ['.md'] } }],
        });
        const writable = await handle.createWritable();
        await writable.write(editor.value);
        await writable.close();
        if (handle.name) {
          currentFileName = handle.name;
          document.title = currentFileName + ' · Markdown';
          updateStatus();
        }
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }
    downloadFile(editor.value, name, 'text/markdown');
  }

  if (saveBtn) saveBtn.addEventListener('click', saveFile);

  function exportHTML() {
    const lang = isEn() ? 'en' : 'zh-CN';
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map((l) => l.getAttribute('href'))
      .filter((h) => h && !/^(https?:)?\/\//i.test(h) && !/^data:/i.test(h));

    const baseName = (currentFileName || 'document').replace(/\.(md|markdown)$/i, '');

    const clone = preview.cloneNode(true);
    clone.querySelectorAll('.md-copy-btn').forEach((b) => b.remove());

    const doc = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(baseName)}</title>
${links.map((h) => `<link rel="stylesheet" href="${escapeHtml(h)}">`).join('\n')}
<style>
  body { max-width: 900px; margin: 48px auto; padding: 0 24px; }
  .md-copy-btn { display: none !important; }
</style>
</head>
<body>
${clone.innerHTML}
</body>
</html>`;

    downloadFile(doc, baseName + '.html', 'text/html');
  }

  (function bindExportButton() {
    let btn = document.getElementById('exportHtmlBtn');
    if (!btn) {
      const host = (printBtn && printBtn.parentNode) || (saveBtn && saveBtn.parentNode);
      if (!host) return;
      btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'exportHtmlBtn';
      btn.className = 'btn';
      btn.setAttribute('data-i18n', 'btnExportHtml');
      btn.textContent = getT().exportHtml;
      btn.title = getT().exportHtmlTip;
      const anchor = printBtn || saveBtn;
      host.insertBefore(btn, anchor ? anchor.nextSibling : null);
    }
    btn.addEventListener('click', exportHTML);
  })();

  /* ---------- 2.16.5 一键清空 ---------- */
  (function bindClearButton() {
    const btn = document.getElementById('clearBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      if (!editor.value.trim() && !currentFileName) return;
      if (!window.confirm(getT().clearConfirm)) return;

      editor.value = '';
      currentFileName = '';
      try { localStorage.removeItem(STORAGE_TEXT); } catch (e) {}

      lastLineCount = -1;
      document.title = 'Markdown 编辑器 · 核心工具箱';
      render();
      setPreviewStatus(getT().cleared);
      editor.focus();
    });
  })();

  /* ---------- 2.16.6 恢复默认 ---------- */
  (function bindResetButton() {
    const btn = document.getElementById('resetBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      if (!window.confirm(getT().resetConfirm)) return;
      try { localStorage.removeItem(STORAGE_TEXT); } catch (e) {}
      window.location.reload();
    });
  })();

  if (printBtn) printBtn.addEventListener('click', () => window.print());

  window.addEventListener('beforeprint', () => {
    document.querySelectorAll('.md-copy-btn').forEach((b) => (b.style.display = 'none'));
  });
  window.addEventListener('afterprint', () => {
    document.querySelectorAll('.md-copy-btn').forEach((b) => (b.style.display = ''));
  });

  editor.addEventListener('input', scheduleRender);

  editor.addEventListener('keydown', function (e) {
    const mod = e.ctrlKey || e.metaKey;

    if (mod && !e.shiftKey && !e.altKey) {
      const k = e.key.toLowerCase();
      if (k === 'b') { e.preventDefault(); insertFormat('bold'); return; }
      if (k === 'i') { e.preventDefault(); insertFormat('italic'); return; }
      if (k === 'k') { e.preventDefault(); insertFormat('link'); return; }
      if (k === 's') { e.preventDefault(); saveFile(); return; }
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const sel = editor.value.slice(editor.selectionStart, editor.selectionEnd);
      if (sel.includes('\n')) {
        indentBlock(e.shiftKey);
      } else if (e.shiftKey) {
        indentBlock(true);
      } else {
        editor.setRangeText('  ', editor.selectionStart, editor.selectionEnd, 'end');
      }
      scheduleRender();
    }
  });

  function insertAtCursor(str) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.setRangeText(str, start, end, 'end');
    editor.focus();
    scheduleRender();
  }

  function readImageFile(file) {
    if (!file || !file.type || !file.type.startsWith('image/')) return;
    if (file.size > 2 * 1024 * 1024) {
      setPreviewStatus(getT().imgTooBig);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const name = (file.name || 'image').replace(/\.[^.]+$/, '');
      insertAtCursor(`![${name}](${reader.result})\n`);
    };
    reader.readAsDataURL(file);
  }

  editor.addEventListener('paste', (e) => {
    const items = e.clipboardData && e.clipboardData.items;
    if (!items) return;
    for (const item of items) {
      if (item.type && item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          e.preventDefault();
          readImageFile(file);
        }
        return;
      }
    }
  });

  editor.addEventListener('dragover', (e) => {
    if (e.dataTransfer && Array.from(e.dataTransfer.types).includes('Files')) {
      e.preventDefault();
    }
  });

  editor.addEventListener('drop', (e) => {
    const files = e.dataTransfer && e.dataTransfer.files;
    if (!files || !files.length) return;
    e.preventDefault();

    const mdFile = Array.from(files).find((f) => /\.(md|markdown)$/i.test(f.name));
    if (mdFile) {
      loadFile(mdFile);
      return;
    }
    const img = Array.from(files).find((f) => f.type.startsWith('image/'));
    if (img) readImageFile(img);
  });

  (function initViewMode() {
    const switchWrap = document.querySelector('.md-mode-switch');
    if (!layout || !switchWrap) return;

    const pills = switchWrap.querySelectorAll('.pill[data-mode]');
    const VALID = ['edit', 'split', 'preview'];

    function applyMode(mode) {
      if (!VALID.includes(mode)) mode = 'split';
      layout.dataset.mode = mode;

      pills.forEach((p) => {
        const on = p.dataset.mode === mode;
        p.classList.toggle('active', on);
        p.setAttribute('aria-selected', on ? 'true' : 'false');
      });

      try { localStorage.setItem(STORAGE_MODE, mode); } catch (e) {}

      if (isPreviewVisible()) {
        requestAnimationFrame(() => {
          preview.querySelectorAll('.mermaid[data-processed="true"]').forEach((el) => {
            el.removeAttribute('data-processed');
            el.innerHTML = '';
          });
          scheduleMermaid();
        });
      }
    }

    let saved = 'split';
    try { saved = localStorage.getItem(STORAGE_MODE) || 'split'; } catch (e) {}
    applyMode(saved);

    pills.forEach((p) => p.addEventListener('click', () => applyMode(p.dataset.mode)));

    document.addEventListener('keydown', (e) => {
      if (!(e.ctrlKey || e.metaKey) || !e.shiftKey || e.altKey) return;
      const map = { Digit1: 'edit', Digit2: 'split', Digit3: 'preview' };
      const mode = map[e.code];
      if (mode) {
        e.preventDefault();
        applyMode(mode);
      }
    });
  })();

  document.addEventListener('co:langchange', (e) => {
    if (e && e.detail && e.detail.lang) overrideLang = e.detail.lang;
    scheduleRender();
  });

  let savedText = null;
  try { savedText = localStorage.getItem(STORAGE_TEXT); } catch (e) {}
  editor.value = savedText !== null ? savedText : defaultText;
  render();
})();