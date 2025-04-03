"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/text-hex";
exports.ids = ["vendor-chunks/text-hex"];
exports.modules = {

/***/ "(rsc)/./node_modules/text-hex/index.js":
/*!****************************************!*\
  !*** ./node_modules/text-hex/index.js ***!
  \****************************************/
/***/ ((module) => {

eval("\n\n/***\n * Convert string to hex color.\n *\n * @param {String} str Text to hash and convert to hex.\n * @returns {String}\n * @api public\n */\nmodule.exports = function hex(str) {\n  for (\n    var i = 0, hash = 0;\n    i < str.length;\n    hash = str.charCodeAt(i++) + ((hash << 5) - hash)\n  );\n\n  var color = Math.floor(\n    Math.abs(\n      (Math.sin(hash) * 10000) % 1 * 16777216\n    )\n  ).toString(16);\n\n  return '#' + Array(6 - color.length + 1).join('0') + color;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvdGV4dC1oZXgvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3F1YWxpZmljYXRpb24tYWdlbnQvLi9ub2RlX21vZHVsZXMvdGV4dC1oZXgvaW5kZXguanM/OWMzNyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qKipcbiAqIENvbnZlcnQgc3RyaW5nIHRvIGhleCBjb2xvci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRleHQgdG8gaGFzaCBhbmQgY29udmVydCB0byBoZXguXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoZXgoc3RyKSB7XG4gIGZvciAoXG4gICAgdmFyIGkgPSAwLCBoYXNoID0gMDtcbiAgICBpIDwgc3RyLmxlbmd0aDtcbiAgICBoYXNoID0gc3RyLmNoYXJDb2RlQXQoaSsrKSArICgoaGFzaCA8PCA1KSAtIGhhc2gpXG4gICk7XG5cbiAgdmFyIGNvbG9yID0gTWF0aC5mbG9vcihcbiAgICBNYXRoLmFicyhcbiAgICAgIChNYXRoLnNpbihoYXNoKSAqIDEwMDAwKSAlIDEgKiAxNjc3NzIxNlxuICAgIClcbiAgKS50b1N0cmluZygxNik7XG5cbiAgcmV0dXJuICcjJyArIEFycmF5KDYgLSBjb2xvci5sZW5ndGggKyAxKS5qb2luKCcwJykgKyBjb2xvcjtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/text-hex/index.js\n");

/***/ })

};
;