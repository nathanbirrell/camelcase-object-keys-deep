'use strict';

// Utilities inspired by Underscore.js

var toString = Object.prototype.toString;
var isObject = function isObject(obj) {
  return obj === Object(obj);
};
var isArray = function isArray(obj) {
  return toString.call(obj) == '[object Array]';
};
var isNumber = function isNumber(obj) {
  obj = obj - 0;
  return obj === obj;
};

var convertSnakeCaseToCamelCase = function convertSnakeCaseToCamelCase(string) {
  if (isNumber(string)) {
    return string;
  }
  string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
    return chr ? chr.toUpperCase() : '';
  });
  // 1st char is always lowercase
  return string.substr(0, 1).toLowerCase() + string.substr(1);
};

var convertObjectKeys = function convertObjectKeys(input) {
  var output = {};
  Object.keys(input).forEach(function (key) {
    var camelCaseKey = convertSnakeCaseToCamelCase(key);
    output[camelCaseKey] = keysToCamelCase(input[key]);
  });
  return output;
};

var convertArrayItems = function convertArrayItems(input) {
  var output = [];
  input.forEach(function (item) {
    output.push(keysToCamelCase(item));
  });
  return output;
};

var keysToCamelCase = function keysToCamelCase(input) {
  if (!(isObject(input) || isArray(input))) {
    return input;
  }

  var result = void 0;

  if (isObject(input)) {
    // handle object keys
    result = {};
    result = convertObjectKeys(input);
  }

  if (isArray(input)) {
    // handle array items
    result = [];
    result = convertArrayItems(input);
  }

  return result;
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = keysToCamelCase;
} else {
  exports.keysToCamelCase = keysToCamelCase;
}