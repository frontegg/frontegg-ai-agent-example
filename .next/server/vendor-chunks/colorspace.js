"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/colorspace";
exports.ids = ["vendor-chunks/colorspace"];
exports.modules = {

/***/ "(rsc)/./node_modules/colorspace/index.js":
/*!******************************************!*\
  !*** ./node_modules/colorspace/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar color = __webpack_require__(/*! color */ \"(rsc)/./node_modules/color/index.js\")\n  , hex = __webpack_require__(/*! text-hex */ \"(rsc)/./node_modules/text-hex/index.js\");\n\n/**\n * Generate a color for a given name. But be reasonably smart about it by\n * understanding name spaces and coloring each namespace a bit lighter so they\n * still have the same base color as the root.\n *\n * @param {string} namespace The namespace\n * @param {string} [delimiter] The delimiter\n * @returns {string} color\n */\nmodule.exports = function colorspace(namespace, delimiter) {\n  var split = namespace.split(delimiter || ':');\n  var base = hex(split[0]);\n\n  if (!split.length) return base;\n\n  for (var i = 0, l = split.length - 1; i < l; i++) {\n    base = color(base)\n    .mix(color(hex(split[i + 1])))\n    .saturate(1)\n    .hex();\n  }\n\n  return base;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvY29sb3JzcGFjZS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsa0RBQU87QUFDM0IsVUFBVSxtQkFBTyxDQUFDLHdEQUFVOztBQUU1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsd0NBQXdDLE9BQU87QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcXVhbGlmaWNhdGlvbi1hZ2VudC8uL25vZGVfbW9kdWxlcy9jb2xvcnNwYWNlL2luZGV4LmpzP2EyN2YiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29sb3IgPSByZXF1aXJlKCdjb2xvcicpXG4gICwgaGV4ID0gcmVxdWlyZSgndGV4dC1oZXgnKTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIGNvbG9yIGZvciBhIGdpdmVuIG5hbWUuIEJ1dCBiZSByZWFzb25hYmx5IHNtYXJ0IGFib3V0IGl0IGJ5XG4gKiB1bmRlcnN0YW5kaW5nIG5hbWUgc3BhY2VzIGFuZCBjb2xvcmluZyBlYWNoIG5hbWVzcGFjZSBhIGJpdCBsaWdodGVyIHNvIHRoZXlcbiAqIHN0aWxsIGhhdmUgdGhlIHNhbWUgYmFzZSBjb2xvciBhcyB0aGUgcm9vdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlIFRoZSBuYW1lc3BhY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZGVsaW1pdGVyXSBUaGUgZGVsaW1pdGVyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjb2xvclxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbG9yc3BhY2UobmFtZXNwYWNlLCBkZWxpbWl0ZXIpIHtcbiAgdmFyIHNwbGl0ID0gbmFtZXNwYWNlLnNwbGl0KGRlbGltaXRlciB8fCAnOicpO1xuICB2YXIgYmFzZSA9IGhleChzcGxpdFswXSk7XG5cbiAgaWYgKCFzcGxpdC5sZW5ndGgpIHJldHVybiBiYXNlO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gc3BsaXQubGVuZ3RoIC0gMTsgaSA8IGw7IGkrKykge1xuICAgIGJhc2UgPSBjb2xvcihiYXNlKVxuICAgIC5taXgoY29sb3IoaGV4KHNwbGl0W2kgKyAxXSkpKVxuICAgIC5zYXR1cmF0ZSgxKVxuICAgIC5oZXgoKTtcbiAgfVxuXG4gIHJldHVybiBiYXNlO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/colorspace/index.js\n");

/***/ })

};
;