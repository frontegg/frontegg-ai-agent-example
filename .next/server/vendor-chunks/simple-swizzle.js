/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/simple-swizzle";
exports.ids = ["vendor-chunks/simple-swizzle"];
exports.modules = {

/***/ "(rsc)/./node_modules/simple-swizzle/index.js":
/*!**********************************************!*\
  !*** ./node_modules/simple-swizzle/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar isArrayish = __webpack_require__(/*! is-arrayish */ \"(rsc)/./node_modules/simple-swizzle/node_modules/is-arrayish/index.js\");\n\nvar concat = Array.prototype.concat;\nvar slice = Array.prototype.slice;\n\nvar swizzle = module.exports = function swizzle(args) {\n\tvar results = [];\n\n\tfor (var i = 0, len = args.length; i < len; i++) {\n\t\tvar arg = args[i];\n\n\t\tif (isArrayish(arg)) {\n\t\t\t// http://jsperf.com/javascript-array-concat-vs-push/98\n\t\t\tresults = concat.call(results, slice.call(arg));\n\t\t} else {\n\t\t\tresults.push(arg);\n\t\t}\n\t}\n\n\treturn results;\n};\n\nswizzle.wrap = function (fn) {\n\treturn function () {\n\t\treturn fn(swizzle(arguments));\n\t};\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvc2ltcGxlLXN3aXp6bGUvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsaUJBQWlCLG1CQUFPLENBQUMsMEZBQWE7O0FBRXRDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvQ0FBb0MsU0FBUztBQUM3Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3F1YWxpZmljYXRpb24tYWdlbnQvLi9ub2RlX21vZHVsZXMvc2ltcGxlLXN3aXp6bGUvaW5kZXguanM/NzgzNyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBpc0FycmF5aXNoID0gcmVxdWlyZSgnaXMtYXJyYXlpc2gnKTtcblxudmFyIGNvbmNhdCA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQ7XG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbnZhciBzd2l6emxlID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzd2l6emxlKGFyZ3MpIHtcblx0dmFyIHJlc3VsdHMgPSBbXTtcblxuXHRmb3IgKHZhciBpID0gMCwgbGVuID0gYXJncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdHZhciBhcmcgPSBhcmdzW2ldO1xuXG5cdFx0aWYgKGlzQXJyYXlpc2goYXJnKSkge1xuXHRcdFx0Ly8gaHR0cDovL2pzcGVyZi5jb20vamF2YXNjcmlwdC1hcnJheS1jb25jYXQtdnMtcHVzaC85OFxuXHRcdFx0cmVzdWx0cyA9IGNvbmNhdC5jYWxsKHJlc3VsdHMsIHNsaWNlLmNhbGwoYXJnKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdHMucHVzaChhcmcpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXN1bHRzO1xufTtcblxuc3dpenpsZS53cmFwID0gZnVuY3Rpb24gKGZuKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIGZuKHN3aXp6bGUoYXJndW1lbnRzKSk7XG5cdH07XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/simple-swizzle/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/simple-swizzle/node_modules/is-arrayish/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/simple-swizzle/node_modules/is-arrayish/index.js ***!
  \***********************************************************************/
/***/ ((module) => {

eval("module.exports = function isArrayish(obj) {\n\tif (!obj || typeof obj === 'string') {\n\t\treturn false;\n\t}\n\n\treturn obj instanceof Array || Array.isArray(obj) ||\n\t\t(obj.length >= 0 && (obj.splice instanceof Function ||\n\t\t\t(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvc2ltcGxlLXN3aXp6bGUvbm9kZV9tb2R1bGVzL2lzLWFycmF5aXNoL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcXVhbGlmaWNhdGlvbi1hZ2VudC8uL25vZGVfbW9kdWxlcy9zaW1wbGUtc3dpenpsZS9ub2RlX21vZHVsZXMvaXMtYXJyYXlpc2gvaW5kZXguanM/MjZmOCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXJyYXlpc2gob2JqKSB7XG5cdGlmICghb2JqIHx8IHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cmV0dXJuIG9iaiBpbnN0YW5jZW9mIEFycmF5IHx8IEFycmF5LmlzQXJyYXkob2JqKSB8fFxuXHRcdChvYmoubGVuZ3RoID49IDAgJiYgKG9iai5zcGxpY2UgaW5zdGFuY2VvZiBGdW5jdGlvbiB8fFxuXHRcdFx0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCAob2JqLmxlbmd0aCAtIDEpKSAmJiBvYmouY29uc3RydWN0b3IubmFtZSAhPT0gJ1N0cmluZycpKSk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/simple-swizzle/node_modules/is-arrayish/index.js\n");

/***/ })

};
;