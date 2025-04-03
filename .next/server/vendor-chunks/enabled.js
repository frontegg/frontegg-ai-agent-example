"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/enabled";
exports.ids = ["vendor-chunks/enabled"];
exports.modules = {

/***/ "(rsc)/./node_modules/enabled/index.js":
/*!***************************************!*\
  !*** ./node_modules/enabled/index.js ***!
  \***************************************/
/***/ ((module) => {

eval("\n\n/**\n * Checks if a given namespace is allowed by the given variable.\n *\n * @param {String} name namespace that should be included.\n * @param {String} variable Value that needs to be tested.\n * @returns {Boolean} Indication if namespace is enabled.\n * @public\n */\nmodule.exports = function enabled(name, variable) {\n  if (!variable) return false;\n\n  var variables = variable.split(/[\\s,]+/)\n    , i = 0;\n\n  for (; i < variables.length; i++) {\n    variable = variables[i].replace('*', '.*?');\n\n    if ('-' === variable.charAt(0)) {\n      if ((new RegExp('^'+ variable.substr(1) +'$')).test(name)) {\n        return false;\n      }\n\n      continue;\n    }\n\n    if ((new RegExp('^'+ variable +'$')).test(name)) {\n      return true;\n    }\n  }\n\n  return false;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvZW5hYmxlZC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFNBQVMsc0JBQXNCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3F1YWxpZmljYXRpb24tYWdlbnQvLi9ub2RlX21vZHVsZXMvZW5hYmxlZC9pbmRleC5qcz8wNjM0Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBnaXZlbiBuYW1lc3BhY2UgaXMgYWxsb3dlZCBieSB0aGUgZ2l2ZW4gdmFyaWFibGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgbmFtZXNwYWNlIHRoYXQgc2hvdWxkIGJlIGluY2x1ZGVkLlxuICogQHBhcmFtIHtTdHJpbmd9IHZhcmlhYmxlIFZhbHVlIHRoYXQgbmVlZHMgdG8gYmUgdGVzdGVkLlxuICogQHJldHVybnMge0Jvb2xlYW59IEluZGljYXRpb24gaWYgbmFtZXNwYWNlIGlzIGVuYWJsZWQuXG4gKiBAcHVibGljXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5hYmxlZChuYW1lLCB2YXJpYWJsZSkge1xuICBpZiAoIXZhcmlhYmxlKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIHZhcmlhYmxlcyA9IHZhcmlhYmxlLnNwbGl0KC9bXFxzLF0rLylcbiAgICAsIGkgPSAwO1xuXG4gIGZvciAoOyBpIDwgdmFyaWFibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyaWFibGUgPSB2YXJpYWJsZXNbaV0ucmVwbGFjZSgnKicsICcuKj8nKTtcblxuICAgIGlmICgnLScgPT09IHZhcmlhYmxlLmNoYXJBdCgwKSkge1xuICAgICAgaWYgKChuZXcgUmVnRXhwKCdeJysgdmFyaWFibGUuc3Vic3RyKDEpICsnJCcpKS50ZXN0KG5hbWUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKChuZXcgUmVnRXhwKCdeJysgdmFyaWFibGUgKyckJykpLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/enabled/index.js\n");

/***/ })

};
;