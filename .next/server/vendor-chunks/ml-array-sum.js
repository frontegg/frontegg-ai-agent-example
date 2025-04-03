"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/ml-array-sum";
exports.ids = ["vendor-chunks/ml-array-sum"];
exports.modules = {

/***/ "(rsc)/./node_modules/ml-array-sum/lib-es6/index.js":
/*!****************************************************!*\
  !*** ./node_modules/ml-array-sum/lib-es6/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ sum)\n/* harmony export */ });\n/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-any-array */ \"(rsc)/./node_modules/is-any-array/lib-esm/index.js\");\n\n\nfunction sum(input) {\n  if (!(0,is_any_array__WEBPACK_IMPORTED_MODULE_0__.isAnyArray)(input)) {\n    throw new TypeError('input must be an array');\n  }\n\n  if (input.length === 0) {\n    throw new TypeError('input must not be empty');\n  }\n\n  var sumValue = 0;\n\n  for (var i = 0; i < input.length; i++) {\n    sumValue += input[i];\n  }\n\n  return sumValue;\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbWwtYXJyYXktc3VtL2xpYi1lczYvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBMEM7O0FBRTFDO0FBQ0EsT0FBTyx3REFBVTtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxrQkFBa0Isa0JBQWtCO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFMEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdWFsaWZpY2F0aW9uLWFnZW50Ly4vbm9kZV9tb2R1bGVzL21sLWFycmF5LXN1bS9saWItZXM2L2luZGV4LmpzPzc1MWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNBbnlBcnJheSB9IGZyb20gJ2lzLWFueS1hcnJheSc7XG5cbmZ1bmN0aW9uIHN1bShpbnB1dCkge1xuICBpZiAoIWlzQW55QXJyYXkoaW5wdXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW5wdXQgbXVzdCBiZSBhbiBhcnJheScpO1xuICB9XG5cbiAgaWYgKGlucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2lucHV0IG11c3Qgbm90IGJlIGVtcHR5Jyk7XG4gIH1cblxuICB2YXIgc3VtVmFsdWUgPSAwO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICBzdW1WYWx1ZSArPSBpbnB1dFtpXTtcbiAgfVxuXG4gIHJldHVybiBzdW1WYWx1ZTtcbn1cblxuZXhwb3J0IHsgc3VtIGFzIGRlZmF1bHQgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/ml-array-sum/lib-es6/index.js\n");

/***/ })

};
;