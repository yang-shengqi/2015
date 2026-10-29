/* ============================================================
 * color-generator.js —— 终极排版版（固定明度标签 + 分离CSS文本）
 * ============================================================ */
(function (global) {
  'use strict';
  
  function t(key) {
    if (global.CO_I18N && typeof global.CO_I18N.t === 'function') {
      return global.CO_I18N.t(key);
    }
    return key;
  }
  
  var C = global.CO_Color;
  var H = global.CO_Harmony;
  var hexToRgb = C.hexToRgb;
  var matchColorInPalette = global.CO_Filter.matchColorInPalette;

  function generateRows(state, palette, ruleName) {
    var baseColorsRgb = [];
    var mainRgbForRule = state.mainRgb;
    
    // 1. 获取第一排基础颜色
    if (state.hasImage && state.baseImageColors && state.baseImageColors.length > 0) {
      baseColorsRgb = state.baseImageColors.map(c => hexToRgb(c.hex));
      if (baseColorsRgb.length >= 3) {
        var topColor = baseColorsRgb.shift(); 
        baseColorsRgb.splice(2, 0, topColor); 
      }
      if (baseColorsRgb.length >= 3) mainRgbForRule = baseColorsRgb[2]; 
    } else {
      baseColorsRgb = H.generateColors(state.mainRgb, 'mono'); 
      mainRgbForRule = state.mainRgb;
    }

    var genColors = [], genNames = [];
    var ruleColors = [], ruleNames = [];
    var cssNames = [], cssRuleNames = []; // 👈 新增：专门给 CSS 用的纯文本名字
    var namePool = palette || global.CO_Names.CN_PALETTE;

    // 获取当前选中的色库名称
    var libChecked = document.querySelector('input[name="lib"]:checked');
    var libVal = libChecked ? libChecked.value : 'none';
    var libNameMap = {
      'cn': t('libNameCn'),
      'morandi': t('libNameMorandi'),
      'jp': t('libNameJp'),
      'cyber': t('libNameCyber'),
      'none': t('libNameNone')
    };
    var currentLibName = libNameMap[libVal] || t('libNameNone');
    
    // 🔥 固定明度标签
    var fixedLabels = [t('labelPct80'), t('labelPct60'), t('labelPrimary'), t('labelPct40'), t('labelPct20')];

    // ==========================================
    // 2. 渲染第一层（原色卡：明暗阶梯）
    // ==========================================
    baseColorsRgb.forEach(function(rgb, idx) {
      var finalRgb = rgb; 
      var isCenter = (idx === 2);
      
      if (isCenter && !state.hasImage) {
         finalRgb = state.mainRgb;
      }
      
      genColors.push(finalRgb);
      
      var matchName = matchColorInPalette(finalRgb, namePool, null);
      var finalName = (matchName && matchName.name !== '未知') ? matchName.name : t('noStandardName');
      
      // 使用固定的明度文字，而不是算出来的
      var labelText = fixedLabels[idx] || '';
      
      // 两行排版 (界面显示用)
      var displayLabel = labelText + '<br>' + finalName + ' - ' + currentLibName;
      genNames.push(displayLabel); 
      
      // 单行纯文本 (CSS导出用)
      cssNames.push(labelText + ' ' + finalName + ' - ' + currentLibName);
    });

    // ==========================================
    // 3. 渲染第二层（衍生色卡）
    // ==========================================
    var ruleGenerated = H.generateColors(mainRgbForRule, ruleName); 

    ruleGenerated.forEach(function(ruleRgb, index) {
      var finalRgb = ruleRgb; 
      var finalName = t('noStandardName');
      
      var match = matchColorInPalette(ruleRgb, namePool, null);
      if (match && match.name !== '未知') {
        finalRgb = match.rgb;
        finalName = match.name;
      }

      if (index === 0) {
        finalRgb = mainRgbForRule;
        var mainMatch = matchColorInPalette(mainRgbForRule, namePool, null);
        var mainColorName = (mainMatch && mainMatch.name !== '未知') ? mainMatch.name : t('noStandardName');
        
        finalName = t('labelPrimary') + '<br>' + mainColorName + ' - ' + currentLibName;
        cssRuleNames.push(t('labelPrimary') + ' ' + mainColorName + ' - ' + currentLibName); 
      } else {
        finalName = t('labelRule') + '<br>' + finalName + ' - ' + currentLibName;
        cssRuleNames.push(t('labelRule') + ' ' + finalName + ' - ' + currentLibName); 
      }
      
      ruleColors.push(finalRgb);
      ruleNames.push(finalName);
    });

    return { 
      genColors: genColors, genNames: genNames, 
      ruleColors: ruleColors, ruleNames: ruleNames,
      cssNames: cssNames, cssRuleNames: cssRuleNames 
    };
  }

  global.CO_Generator = { generateRows: generateRows };
})(window);