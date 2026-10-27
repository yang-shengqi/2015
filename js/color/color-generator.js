/* ============================================================
 * color-generator.js —— 纯净防重复版
 * ============================================================ */
(function (global) {
  'use strict';
  var C = global.CO_Color;
  var H = global.CO_Harmony;
  var rgbToHex = C.rgbToHex, hexToRgb = C.hexToRgb;
  var matchColorInPalette = global.CO_Filter.matchColorInPalette;

  function generateRows(state, palette, ruleName) {
    var baseColorsRgb = [];
    
    if (state.hasImage && state.baseImageColors.length === 5) {
      baseColorsRgb = state.baseImageColors.map(c => hexToRgb(c.hex));
    } else {
      baseColorsRgb = H.generateColors(state.mainRgb, 'mono');
    }

    var genColors = [], genNames = [];
    var ruleColors = [], ruleNames = [];
    
    var usedNames = new Set(); 
    var usedHexes = new Set(); 

    // 【修改】统一色库
    var namePool = palette || global.CO_Names.CN_PALETTE;

    // 1. 上层（原色）
    baseColorsRgb.forEach(function(rgb, i) {
      var finalRgb = rgb;
      // 直接用 matchColorInPalette，带防跳色相
      var match = matchColorInPalette(rgb, namePool, usedNames);
      
      if (palette) finalRgb = match.rgb;
      
      if (usedHexes.has(rgbToHex(finalRgb))) {
          finalRgb = rgb; 
      }
      
      genColors.push(finalRgb);
      usedHexes.add(rgbToHex(finalRgb));
      
      var finalName = match.name;
      if (usedNames.has(finalName)) {
          finalName = finalName + "·" + (i + 1); 
      }
      usedNames.add(finalName);
      genNames.push(finalName);
    });

    // 2. 下层（演化）
    genColors.forEach(function(baseRgb, i) {
      var generated = H.generateColors(baseRgb, ruleName);
      var ruleRgb = generated[0];
      
      var match = matchColorInPalette(ruleRgb, namePool, usedNames);
      
      if (palette) ruleRgb = match.rgb;
      
      if (usedHexes.has(rgbToHex(ruleRgb))) {
          ruleRgb = generated[0];
      }
      
      ruleColors.push(ruleRgb);
      usedHexes.add(rgbToHex(ruleRgb));
      
      var finalName = match.name;
      if (usedNames.has(finalName)) {
          finalName = finalName + "·" + (i + 1);
      }
      usedNames.add(finalName);
      ruleNames.push(finalName);
    });

    return { genColors: genColors, genNames: genNames, ruleColors: ruleColors, ruleNames: ruleNames };
  }

  global.CO_Generator = { generateRows: generateRows };
})(window);