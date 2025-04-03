"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/one-time";
exports.ids = ["vendor-chunks/one-time"];
exports.modules = {

/***/ "(rsc)/./node_modules/one-time/index.js":
/*!****************************************!*\
  !*** ./node_modules/one-time/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar name = __webpack_require__(/*! fn.name */ \"(rsc)/./node_modules/fn.name/index.js\");\n\n/**\n * Wrap callbacks to prevent double execution.\n *\n * @param {Function} fn Function that should only be called once.\n * @returns {Function} A wrapped callback which prevents multiple executions.\n * @public\n */\nmodule.exports = function one(fn) {\n  var called = 0\n    , value;\n\n  /**\n   * The function that prevents double execution.\n   *\n   * @private\n   */\n  function onetime() {\n    if (called) return value;\n\n    called = 1;\n    value = fn.apply(this, arguments);\n    fn = null;\n\n    return value;\n  }\n\n  //\n  // To make debugging more easy we want to use the name of the supplied\n  // function. So when you look at the functions that are assigned to event\n  // listeners you don't see a load of `onetime` functions but actually the\n  // names of the functions that this module will call.\n  //\n  // NOTE: We cannot override the `name` property, as that is `readOnly`\n  // property, so displayName will have to do.\n  //\n  onetime.displayName = name(fn);\n  return onetime;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvb25lLXRpbWUvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsV0FBVyxtQkFBTyxDQUFDLHNEQUFTOztBQUU1QjtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcXVhbGlmaWNhdGlvbi1hZ2VudC8uL25vZGVfbW9kdWxlcy9vbmUtdGltZS9pbmRleC5qcz8yNjNjIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIG5hbWUgPSByZXF1aXJlKCdmbi5uYW1lJyk7XG5cbi8qKlxuICogV3JhcCBjYWxsYmFja3MgdG8gcHJldmVudCBkb3VibGUgZXhlY3V0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRoYXQgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uY2UuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgd3JhcHBlZCBjYWxsYmFjayB3aGljaCBwcmV2ZW50cyBtdWx0aXBsZSBleGVjdXRpb25zLlxuICogQHB1YmxpY1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG9uZShmbikge1xuICB2YXIgY2FsbGVkID0gMFxuICAgICwgdmFsdWU7XG5cbiAgLyoqXG4gICAqIFRoZSBmdW5jdGlvbiB0aGF0IHByZXZlbnRzIGRvdWJsZSBleGVjdXRpb24uXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBvbmV0aW1lKCkge1xuICAgIGlmIChjYWxsZWQpIHJldHVybiB2YWx1ZTtcblxuICAgIGNhbGxlZCA9IDE7XG4gICAgdmFsdWUgPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGZuID0gbnVsbDtcblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8vXG4gIC8vIFRvIG1ha2UgZGVidWdnaW5nIG1vcmUgZWFzeSB3ZSB3YW50IHRvIHVzZSB0aGUgbmFtZSBvZiB0aGUgc3VwcGxpZWRcbiAgLy8gZnVuY3Rpb24uIFNvIHdoZW4geW91IGxvb2sgYXQgdGhlIGZ1bmN0aW9ucyB0aGF0IGFyZSBhc3NpZ25lZCB0byBldmVudFxuICAvLyBsaXN0ZW5lcnMgeW91IGRvbid0IHNlZSBhIGxvYWQgb2YgYG9uZXRpbWVgIGZ1bmN0aW9ucyBidXQgYWN0dWFsbHkgdGhlXG4gIC8vIG5hbWVzIG9mIHRoZSBmdW5jdGlvbnMgdGhhdCB0aGlzIG1vZHVsZSB3aWxsIGNhbGwuXG4gIC8vXG4gIC8vIE5PVEU6IFdlIGNhbm5vdCBvdmVycmlkZSB0aGUgYG5hbWVgIHByb3BlcnR5LCBhcyB0aGF0IGlzIGByZWFkT25seWBcbiAgLy8gcHJvcGVydHksIHNvIGRpc3BsYXlOYW1lIHdpbGwgaGF2ZSB0byBkby5cbiAgLy9cbiAgb25ldGltZS5kaXNwbGF5TmFtZSA9IG5hbWUoZm4pO1xuICByZXR1cm4gb25ldGltZTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/one-time/index.js\n");

/***/ })

};
;