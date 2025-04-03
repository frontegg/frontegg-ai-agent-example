/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/binary-search";
exports.ids = ["vendor-chunks/binary-search"];
exports.modules = {

/***/ "(rsc)/./node_modules/binary-search/index.js":
/*!*********************************************!*\
  !*** ./node_modules/binary-search/index.js ***!
  \*********************************************/
/***/ ((module) => {

eval("module.exports = function(haystack, needle, comparator, low, high) {\n  var mid, cmp;\n\n  if(low === undefined)\n    low = 0;\n\n  else {\n    low = low|0;\n    if(low < 0 || low >= haystack.length)\n      throw new RangeError(\"invalid lower bound\");\n  }\n\n  if(high === undefined)\n    high = haystack.length - 1;\n\n  else {\n    high = high|0;\n    if(high < low || high >= haystack.length)\n      throw new RangeError(\"invalid upper bound\");\n  }\n\n  while(low <= high) {\n    // The naive `low + high >>> 1` could fail for array lengths > 2**31\n    // because `>>>` converts its operands to int32. `low + (high - low >>> 1)`\n    // works for array lengths <= 2**32-1 which is also Javascript's max array\n    // length.\n    mid = low + ((high - low) >>> 1);\n    cmp = +comparator(haystack[mid], needle, mid, haystack);\n\n    // Too low.\n    if(cmp < 0.0)\n      low  = mid + 1;\n\n    // Too high.\n    else if(cmp > 0.0)\n      high = mid - 1;\n\n    // Key found.\n    else\n      return mid;\n  }\n\n  // Key not found.\n  return ~low;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvYmluYXJ5LXNlYXJjaC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdWFsaWZpY2F0aW9uLWFnZW50Ly4vbm9kZV9tb2R1bGVzL2JpbmFyeS1zZWFyY2gvaW5kZXguanM/ZDMzMCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGhheXN0YWNrLCBuZWVkbGUsIGNvbXBhcmF0b3IsIGxvdywgaGlnaCkge1xuICB2YXIgbWlkLCBjbXA7XG5cbiAgaWYobG93ID09PSB1bmRlZmluZWQpXG4gICAgbG93ID0gMDtcblxuICBlbHNlIHtcbiAgICBsb3cgPSBsb3d8MDtcbiAgICBpZihsb3cgPCAwIHx8IGxvdyA+PSBoYXlzdGFjay5sZW5ndGgpXG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcImludmFsaWQgbG93ZXIgYm91bmRcIik7XG4gIH1cblxuICBpZihoaWdoID09PSB1bmRlZmluZWQpXG4gICAgaGlnaCA9IGhheXN0YWNrLmxlbmd0aCAtIDE7XG5cbiAgZWxzZSB7XG4gICAgaGlnaCA9IGhpZ2h8MDtcbiAgICBpZihoaWdoIDwgbG93IHx8IGhpZ2ggPj0gaGF5c3RhY2subGVuZ3RoKVxuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJpbnZhbGlkIHVwcGVyIGJvdW5kXCIpO1xuICB9XG5cbiAgd2hpbGUobG93IDw9IGhpZ2gpIHtcbiAgICAvLyBUaGUgbmFpdmUgYGxvdyArIGhpZ2ggPj4+IDFgIGNvdWxkIGZhaWwgZm9yIGFycmF5IGxlbmd0aHMgPiAyKiozMVxuICAgIC8vIGJlY2F1c2UgYD4+PmAgY29udmVydHMgaXRzIG9wZXJhbmRzIHRvIGludDMyLiBgbG93ICsgKGhpZ2ggLSBsb3cgPj4+IDEpYFxuICAgIC8vIHdvcmtzIGZvciBhcnJheSBsZW5ndGhzIDw9IDIqKjMyLTEgd2hpY2ggaXMgYWxzbyBKYXZhc2NyaXB0J3MgbWF4IGFycmF5XG4gICAgLy8gbGVuZ3RoLlxuICAgIG1pZCA9IGxvdyArICgoaGlnaCAtIGxvdykgPj4+IDEpO1xuICAgIGNtcCA9ICtjb21wYXJhdG9yKGhheXN0YWNrW21pZF0sIG5lZWRsZSwgbWlkLCBoYXlzdGFjayk7XG5cbiAgICAvLyBUb28gbG93LlxuICAgIGlmKGNtcCA8IDAuMClcbiAgICAgIGxvdyAgPSBtaWQgKyAxO1xuXG4gICAgLy8gVG9vIGhpZ2guXG4gICAgZWxzZSBpZihjbXAgPiAwLjApXG4gICAgICBoaWdoID0gbWlkIC0gMTtcblxuICAgIC8vIEtleSBmb3VuZC5cbiAgICBlbHNlXG4gICAgICByZXR1cm4gbWlkO1xuICB9XG5cbiAgLy8gS2V5IG5vdCBmb3VuZC5cbiAgcmV0dXJuIH5sb3c7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/binary-search/index.js\n");

/***/ })

};
;