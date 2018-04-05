'use strict';

// Utilities inspired by Underscore.js

var toString = Object.prototype.toString;
var isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};
var isObject = function isObject(obj) {
  return obj === Object(obj);
};
var isArray = function isArray(obj) {
  return toString.call(obj) == '[object Array]';
};
var isDate = function isDate(obj) {
  return toString.call(obj) == '[object Date]';
};
var isBoolean = function isBoolean(obj) {
  return toString.call(obj) == '[object Boolean]';
};
var isNumber = function isNumber(obj) {
  obj = obj - 0;
  return obj === obj;
};

var convertStringToCamelCase = function convertStringToCamelCase(string) {
  if (isNumber(string)) {
    return string;
  }
  string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
    return chr ? chr.toUpperCase() : '';
  });
  // 1st char is always lowercase
  return string.substr(0, 1).toLowerCase() + string.substr(1);
};

var keysToCamelCase = function keysToCamelCase(input) {
  if (!isObject(input) || !isArray(input)) {
    return input;
  }

  var result = void 0;

  if (isObject(input)) {
    // handle object keys
    result = {};
    result = convertKeys(input);
  }

  if (isArray(input)) {
    // handle array items
    result = [];
    result = convertItems(input);
  }

  return result;
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = keysToCamelCase;
} else {
  global.keysToCamelCase = keysToCamelCase;
}