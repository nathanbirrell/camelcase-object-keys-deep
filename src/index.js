// Utilities inspired by Underscore.js

const toString = Object.prototype.toString;
const isObject = (obj) => {
  return obj === Object(obj);
};
const isArray = (obj) => {
  return toString.call(obj) == '[object Array]';
};
const isNumber = (obj) => {
  obj = obj - 0;
  return obj === obj;
};

const convertSnakeCaseToCamelCase = (string) => {
  if (isNumber(string)) {
    return string;
  }
  string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
    return chr ? chr.toUpperCase() : '';
  });
  // 1st char is always lowercase
  return string.substr(0, 1).toLowerCase() + string.substr(1);
};

const convertObjectKeys = (input) => {
  const output = {};
  Object.keys(input).forEach(function (key) {
    const camelCaseKey = convertSnakeCaseToCamelCase(key);
    output[camelCaseKey] = keysToCamelCase(input[key]);
  });
  return output;
};

const convertArrayItems = (input) => {
  const output = [];
  input.forEach(function(item) {
    output.push(keysToCamelCase(item));
  });
  return output;
}

const keysToCamelCase = (input) => {
  if (!(isObject(input) || isArray(input))) {
    return input;
  }

  let result;

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
  window.keysToCamelCase = keysToCamelCase;
}