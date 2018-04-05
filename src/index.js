// Utilities inspired by Underscore.js

const toString = Object.prototype.toString;
const isFunction = (obj) => {
  return typeof(obj) === 'function';
};
const isObject = (obj) => {
  return obj === Object(obj);
};
const isArray = (obj) => {
  return toString.call(obj) == '[object Array]';
};
const isDate = (obj) => {
  return toString.call(obj) == '[object Date]';
};
const isBoolean = (obj) => {
  return toString.call(obj) == '[object Boolean]';
};
const isNumber = (obj) => {
  obj = obj - 0;
  return obj === obj;
};

const convertStringToCamelCase = (string) => {
  if (isNumber(string)) {
    return string;
  }
  string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
    return chr ? chr.toUpperCase() : '';
  });
  // 1st char is always lowercase
  return string.substr(0, 1).toLowerCase() + string.substr(1);
};

const keysToCamelCase = (input) => {
  if (!isObject(input) || !isArray(input)) {
    return input;
  }

  let result;

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
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = keysToCamelCase;
} else {
  global.keysToCamelCase = keysToCamelCase;
}