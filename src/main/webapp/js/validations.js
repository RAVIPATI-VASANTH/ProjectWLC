"use strict";
//Checks all are alpha or not
function isAlpha(str) {
  var validate = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrtuvwxyz";
  for (var i = 0; i < str.length; i++) {
    if (!validate.includes(str[i])) {
      return false;
    }
  }
  return true;
}
//Checks all are digits or not
function isDigit(str) {
  var validate = "1234567890";
  for (var i = 0; i < str.length; i++) {
    if (!validate.includes(str[i])) {
      return false;
    }
  }
  return true;
}
//Checks if atleast one Spec charecter or not excluding <space>
function isSpecEncounter(str) {
  for (var i = 0; i < str.length; i++) {
    var code = str[i].charCodeAt(0);
    if (
      (code >= 65 && code <= 90) ||
      (code >= 97 && code <= 122) ||
      (code >= 48 && code <= 57) ||
      code === 32
    ) {
      continue;
    } else {
      return true;
    }
  }
  return false;
}

//Checks all are both alpha and Numbers or not
function isalphanum(str) {
  var signal1 = isAlpha(str);
  var signal2 = isDigit(str);
  return signal1 && signal2;
}
