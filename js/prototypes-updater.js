var all, any, code, copyObject, copyText, forEach, globMatch, openInNewTab;

forEach = function(obj, func) {
  var i, j, key, keys, len;
  if (typeof obj !== 'object') {
    console.error("forEach(...) needs an OBJECT (not a '" + (typeof obj) + "' and a function");
  }
  keys = Object.keys(obj);
  for (i = j = 0, len = keys.length; j < len; i = ++j) {
    key = keys[i];
    if ('stop' === func(key, obj[key], obj, i)) {
      return obj;
    }
  }
  return obj;
};

copyObject = function(obj) {
  return $.extend({}, obj);
};

copyText = function(text) {
  var $el;
  $el = $('<input type="text">').val(text).css({
    position: 'absolute',
    left: '-100%',
    top: '-100%',
    opacity: 0
  }).appendTo(document.body);
  $el[0].select();
  if (!document.execCommand('copy')) {
    console.warn('Unable to copy.');
    return false;
  }
  $el.remove();
  return text;
};

code = function(letter) {
  if (letter === 'ctrl') {
    return 17;
  }
  if (letter === 'alt') {
    return 18;
  }
  if (letter === 'escape') {
    return 27;
  }
  if (letter === 'enter' || letter === 'return') {
    return 13;
  }
  if (letter.length !== 1) {
    return console.error("code: unknow abrv '" + letter + "'");
  }
  return letter.charCodeAt(0) - 32;
};

openInNewTab = function(url) {
  var $el;
  $el = $('<a>a link</a>').attr({
    target: '_blank',
    href: url
  }).css({
    position: 'absolute',
    left: '-100%',
    top: '-100%',
    width: 0,
    height: 0,
    opacity: 0
  }).appendTo(document.body);
  $el[0].click();
  return $el.remove();
};

any = function(arr) {
  var el, j, len;
  for (j = 0, len = arr.length; j < len; j++) {
    el = arr[j];
    if (el) {
      return true;
    }
  }
  return false;
};

all = function(arr) {
  var el, j, len;
  for (j = 0, len = arr.length; j < len; j++) {
    el = arr[j];
    if (!el) {
      return false;
    }
  }
  return true;
};

globMatch = function(pattern, elements) {
  var element, j, len, match, regex;
  pattern = pattern.replace(/[\-\[\]\/\{\}\(\)\+\?\.\^\$\|]/g, "\\$&");
  pattern = pattern.replace(/([^\\]?)\*/, '$1.*');
  regex = new RegExp('^' + pattern + '$');
  if (typeof elements === 'object') {
    match = [];
    for (j = 0, len = elements.length; j < len; j++) {
      element = elements[j];
      if (regex.test(element)) {
        match.push(element);
      }
    }
    return match;
  } else if (typeof elements === 'string') {
    return regex.test(elements);
  } else {
    return console.error("Does not support " + (typeof elements));
  }
};

Array.prototype.__update = function(arr) {
  var j, len, val;
  while (this.length > 0) {
    this.pop();
  }
  for (j = 0, len = arr.length; j < len; j++) {
    val = arr[j];
    this.push(val);
  }
  return this;
};

Array.prototype.remove = function(valToRemove, times) {
  var arr, j, len, val;
  if (times == null) {
    times = 2;
  }
  arr = [];
  for (j = 0, len = this.length; j < len; j++) {
    val = this[j];
    if (times === 0 || val !== valToRemove) {
      arr.push(val);
    } else if (val === valToRemove) {
      times -= 1;
    }
  }
  return this.__update(arr);
};

Array.prototype.get = function(index) {
  if (index < 0) {
    index = this.length + index;
  }
  return this[index];
};

String.prototype.strip = function(charToRemove) {
  var char, cont, end, i, j, k, len, len1, ref, start;
  if (charToRemove == null) {
    charToRemove = ' ';
  }
  start = 0;
  end = this.length;
  cont = true;
  for (i = j = 0, len = this.length; j < len; i = ++j) {
    char = this[i];
    if (cont === true && char === charToRemove) {
      start++;
    } else {
      cont = false;
    }
  }
  cont = true;
  ref = this.split('').reverse();
  for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
    char = ref[i];
    if (cont === true && char === charToRemove) {
      end--;
    } else {
      cont = false;
    }
  }
  return this.slice(start, end);
};

String.prototype.wrap = function(char) {
  if (char == null) {
    char = '"';
  }
  return char + this + char;
};

$.fn.exists = function(nice) {
  if (nice == null) {
    nice = false;
  }
  return this.length > 0;
};

$.arrayDiff = function(arr1, arr2) {
  var arr, i, j, len, val;
  arr = [];
  for (i = j = 0, len = arr1.length; j < len; i = ++j) {
    val = arr1[i];
    if (arr2.indexOf(val) === -1) {
      arr.push(val);
    }
  }
  return arr;
};
