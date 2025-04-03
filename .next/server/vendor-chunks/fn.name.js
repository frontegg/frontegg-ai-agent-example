"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/fn.name";
exports.ids = ["vendor-chunks/fn.name"];
exports.modules = {

/***/ "(rsc)/./node_modules/fn.name/index.js":
/*!***************************************!*\
  !*** ./node_modules/fn.name/index.js ***!
  \***************************************/
/***/ ((module) => {

eval("\n\nvar toString = Object.prototype.toString;\n\n/**\n * Extract names from functions.\n *\n * @param {Function} fn The function who's name we need to extract.\n * @returns {String} The name of the function.\n * @public\n */\nmodule.exports = function name(fn) {\n  if ('string' === typeof fn.displayName && fn.constructor.name) {\n    return fn.displayName;\n  } else if ('string' === typeof fn.name && fn.name) {\n    return fn.name;\n  }\n\n  //\n  // Check to see if the constructor has a name.\n  //\n  if (\n       'object' === typeof fn\n    && fn.constructor\n    && 'string' === typeof fn.constructor.name\n  ) return fn.constructor.name;\n\n  //\n  // toString the given function and attempt to parse it out of it, or determine\n  // the class.\n  //\n  var named = fn.toString()\n    , type = toString.call(fn).slice(8, -1);\n\n  if ('Function' === type) {\n    named = named.substring(named.indexOf('(') + 1, named.indexOf(')'));\n  } else {\n    named = type;\n  }\n\n  return named || 'anonymous';\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvZm4ubmFtZS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3F1YWxpZmljYXRpb24tYWdlbnQvLi9ub2RlX21vZHVsZXMvZm4ubmFtZS9pbmRleC5qcz8yYmY2Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBFeHRyYWN0IG5hbWVzIGZyb20gZnVuY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB3aG8ncyBuYW1lIHdlIG5lZWQgdG8gZXh0cmFjdC5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbi5cbiAqIEBwdWJsaWNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBuYW1lKGZuKSB7XG4gIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIGZuLmRpc3BsYXlOYW1lICYmIGZuLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICByZXR1cm4gZm4uZGlzcGxheU5hbWU7XG4gIH0gZWxzZSBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBmbi5uYW1lICYmIGZuLm5hbWUpIHtcbiAgICByZXR1cm4gZm4ubmFtZTtcbiAgfVxuXG4gIC8vXG4gIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgY29uc3RydWN0b3IgaGFzIGEgbmFtZS5cbiAgLy9cbiAgaWYgKFxuICAgICAgICdvYmplY3QnID09PSB0eXBlb2YgZm5cbiAgICAmJiBmbi5jb25zdHJ1Y3RvclxuICAgICYmICdzdHJpbmcnID09PSB0eXBlb2YgZm4uY29uc3RydWN0b3IubmFtZVxuICApIHJldHVybiBmbi5jb25zdHJ1Y3Rvci5uYW1lO1xuXG4gIC8vXG4gIC8vIHRvU3RyaW5nIHRoZSBnaXZlbiBmdW5jdGlvbiBhbmQgYXR0ZW1wdCB0byBwYXJzZSBpdCBvdXQgb2YgaXQsIG9yIGRldGVybWluZVxuICAvLyB0aGUgY2xhc3MuXG4gIC8vXG4gIHZhciBuYW1lZCA9IGZuLnRvU3RyaW5nKClcbiAgICAsIHR5cGUgPSB0b1N0cmluZy5jYWxsKGZuKS5zbGljZSg4LCAtMSk7XG5cbiAgaWYgKCdGdW5jdGlvbicgPT09IHR5cGUpIHtcbiAgICBuYW1lZCA9IG5hbWVkLnN1YnN0cmluZyhuYW1lZC5pbmRleE9mKCcoJykgKyAxLCBuYW1lZC5pbmRleE9mKCcpJykpO1xuICB9IGVsc2Uge1xuICAgIG5hbWVkID0gdHlwZTtcbiAgfVxuXG4gIHJldHVybiBuYW1lZCB8fCAnYW5vbnltb3VzJztcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/fn.name/index.js\n");

/***/ })

};
;