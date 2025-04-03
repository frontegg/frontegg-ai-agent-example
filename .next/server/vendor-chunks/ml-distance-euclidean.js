"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/ml-distance-euclidean";
exports.ids = ["vendor-chunks/ml-distance-euclidean"];
exports.modules = {

/***/ "(rsc)/./node_modules/ml-distance-euclidean/lib-es6/euclidean.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ml-distance-euclidean/lib-es6/euclidean.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   euclidean: () => (/* binding */ euclidean),\n/* harmony export */   squaredEuclidean: () => (/* binding */ squaredEuclidean)\n/* harmony export */ });\nfunction squaredEuclidean(p, q) {\r\n    let d = 0;\r\n    for (let i = 0; i < p.length; i++) {\r\n        d += (p[i] - q[i]) * (p[i] - q[i]);\r\n    }\r\n    return d;\r\n}\r\nfunction euclidean(p, q) {\r\n    return Math.sqrt(squaredEuclidean(p, q));\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbWwtZGlzdGFuY2UtZXVjbGlkZWFuL2xpYi1lczYvZXVjbGlkZWFuLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQU87QUFDUDtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcXVhbGlmaWNhdGlvbi1hZ2VudC8uL25vZGVfbW9kdWxlcy9tbC1kaXN0YW5jZS1ldWNsaWRlYW4vbGliLWVzNi9ldWNsaWRlYW4uanM/ZWI3MSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gc3F1YXJlZEV1Y2xpZGVhbihwLCBxKSB7XHJcbiAgICBsZXQgZCA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBkICs9IChwW2ldIC0gcVtpXSkgKiAocFtpXSAtIHFbaV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGV1Y2xpZGVhbihwLCBxKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHNxdWFyZWRFdWNsaWRlYW4ocCwgcSkpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/ml-distance-euclidean/lib-es6/euclidean.js\n");

/***/ })

};
;