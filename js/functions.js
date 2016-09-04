var Path, add, arr, array_diff, code, copy, copyThing, die, extend, extract, float, forEach, getFileType, getPath, int, len, list, moveUp, normPath, openInNewTab, pathJoin, quote, removeTags, say, startWith, str, trim,
  slice = [].slice;

len = function(el) {
  if (el.length !== void 0) {
    return el.length;
  } else {
    console.error("length of \"" + el + "\" is undefined!");
  }
  return 0;
};

die = function(msg) {
  if (msg == null) {
    msg = 'die';
  }
  throw new Error(msg);
};

int = function(el) {
  return parseInt(el);
};

float = function(el) {
  return parseFloat(el);
};

str = function(el) {
  return '' + el;
};

list = function(el) {
  var e, k, len1, results;
  results = [];
  for (k = 0, len1 = el.length; k < len1; k++) {
    e = el[k];
    results.push(e);
  }
  return results;
};

arr = function(el) {
  return list(el);
};

say = function() {
  return alert(list(arguments).join(' '));
};

removeTags = function(str) {
  return $('<div></div>').html(str).text();
};

array_diff = function(arr1, arr2) {
  var el, k, len1;
  arr = [];
  for (k = 0, len1 = arr1.length; k < len1; k++) {
    el = arr1[k];
    if (arr2.indexOf(el) === -1) {
      arr.push(el);
    }
  }
  return arr;
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
  if (len(letter) !== 1) {
    return console.error("code: unknow abrv '" + letter + "'");
  }
  return letter.charCodeAt(0) - 32;
};

quote = function(str) {
  return "\"" + str + "\"";
};

forEach = function(obj, func) {
  var i, k, key, keys, len1;
  keys = Object.keys(obj);
  for (i = k = 0, len1 = keys.length; k < len1; i = ++k) {
    key = keys[i];
    func(key, obj[key], obj, i);
  }
  return obj;
};

extend = function(obj1, obj2) {
  var k, key, keys1, keys2, l, len1, len2, obj;
  obj = {};
  keys1 = Object.keys(obj1);
  keys2 = Object.keys(obj2);
  for (k = 0, len1 = keys1.length; k < len1; k++) {
    key = keys1[k];
    obj[key] = obj1[key];
  }
  for (l = 0, len2 = keys2.length; l < len2; l++) {
    key = keys2[l];
    obj[key] = obj2[key];
  }
  return obj;
};

add = function(arr1, arr2) {
  var el, k, len1;
  for (k = 0, len1 = arr2.length; k < len1; k++) {
    el = arr2[k];
    arr1.push(el);
  }
  return arr1;
};

trim = function(str, charToRemove) {
  var char, cont, end, i, k, l, len1, len2, ref, start;
  if (charToRemove == null) {
    charToRemove = ' ';
  }
  start = 0;
  end = len(str);
  cont = true;
  for (i = k = 0, len1 = str.length; k < len1; i = ++k) {
    char = str[i];
    if (cont === true && char === charToRemove) {
      start++;
    } else {
      cont = false;
    }
  }
  cont = true;
  ref = list(str).reverse();
  for (i = l = 0, len2 = ref.length; l < len2; i = ++l) {
    char = ref[i];
    if (cont === true && char === charToRemove) {
      end--;
    } else {
      cont = false;
    }
  }
  return str.slice(start, end);
};

moveUp = function(path) {
  if (path == null) {
    path = location.hash;
  }
  path = path.split('/');
  return path.slice(0, -1).join('/');
};

getPath = function(invalidPath) {
  var path;
  path = location.hash;
  if (path[0] === '#') {
    path = path.slice(1, len(path));
  }
  path = trim(path, '/');
  if (invalidPath !== void 0) {
    path = path + '/' + invalidPath;
  }
  if (path === '') {
    path = '.';
  }
  return path = removeTags(path);
};

extract = function(obj, objToSave) {
  var isValid, k, key, len1, ref;
  if (objToSave == null) {
    objToSave = false;
  }
  isValid = function(varName) {
    return /[a-zA-Z_][a-zA-Z0-9_]+/.test(varName);
  };
  ref = Object.keys(obj);
  for (k = 0, len1 = ref.length; k < len1; k++) {
    key = ref[k];
    if (isValid(key)) {
      eval("var " + key + " = obj[key]");
    }
    if (objToSave) {
      objToSave[key] = obj[key];
    }
  }
  return null;
};

startWith = function(str, word, type) {
  var k, len1, tested, w;
  if (type == null) {
    type = 'any';
  }
  tested = str.slice(0, len(word));
  if (typeof word === typeof 'str') {
    return tested === word;
  }
  if (typeof word !== typeof ['foo']) {
    for (k = 0, len1 = word.length; k < len1; k++) {
      w = word[k];
      if (type === 'all' && tested !== word) {
        return false;
      }
      if (type === 'any' && tested === word) {
        return true;
      }
    }
    if (type === 'all') {
      return true;
    } else {
      return false;
    }
  }
};

openInNewTab = function() {
  var url;
  url = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  if ($.isArray(url)) {
    url = url.join('/');
  }
  if (!startWith(url, ['http://', 'https', 'file://'])) {
    url = 'http://' + url;
  }
  return $("<a>").attr("href", url).attr("target", "_blank")[0].click();
};

copy = function(str) {
  var $input;
  $input = $('<input type="text" />').val(str).appendTo($('body')).css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    'z-index': 5000
  }).select();
  if (!document.execCommand('copy')) {
    console.warn('unnable to copy "' + str + '"!');
  }
  $input.remove();
  return str;
};

pathJoin = function() {
  var final, k, len1, p, path, paths, sep;
  paths = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  final = [];
  sep = '/';
  for (k = 0, len1 = paths.length; k < len1; k++) {
    path = paths[k];
    if (typeof path !== 'string') {
      return console.error("pathJoin: Can only join string and not " + (typeof path));
    }
    p = trim(path, '/');
    if (p !== '') {
      final.push(p);
    }
  }
  return final.join(sep);
};

copyThing = function(el) {
  var char, k, len1, newStr;
  if (typeof el === 'string') {
    newStr = '';
    for (k = 0, len1 = el.length; k < len1; k++) {
      char = el[k];
      newStr += el;
    }
    return newStr;
  }
};

String.prototype.strip = function(char) {
  if (char == null) {
    char = '/';
  }
  return trim(this, char);
};

Array.prototype.remove = function(el) {
  var e, i, k, l, len1, len2, m, ref, results;
  arr = [];
  for (k = 0, len1 = this.length; k < len1; k++) {
    e = this[k];
    if (e !== el) {
      arr.push(el);
    }
  }
  for (i = l = 0, ref = this.length; 0 <= ref ? l <= ref : l >= ref; i = 0 <= ref ? ++l : --l) {
    arr.pop();
  }
  results = [];
  for (m = 0, len2 = arr.length; m < len2; m++) {
    el = arr[m];
    results.push(arr.push(el));
  }
  return results;
};

Array.prototype.removeAll = function(el) {
  var e, k, l, len1, len2;
  arr = [];
  for (k = 0, len1 = this.length; k < len1; k++) {
    e = this[k];
    if (el !== e) {
      arr.push(e);
    }
  }
  while (len(this) > 0) {
    this.shift();
  }
  for (l = 0, len2 = arr.length; l < len2; l++) {
    el = arr[l];
    this.push(el);
  }
  return this;
};

Array.prototype.get = function(index) {
  if (index < 0) {
    index = len(this) + index;
  }
  return this[index];
};

String.prototype.contains = function(str) {
  var i, k, ref;
  for (i = k = 0, ref = len(this); 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
    if (this.slice(i, i + len(str)) === str) {
      return true;
    }
  }
  return false;
};

Array.prototype.pop = function(index) {
  var el, i, k, l, len1, len2;
  if (index == null) {
    index = this.length - 1;
  }
  arr = [];
  for (i = k = 0, len1 = this.length; k < len1; i = ++k) {
    el = this[i];
    if (i !== index) {
      arr.push(el);
    }
  }
  while (len(this) > 0) {
    this.shift();
  }
  for (l = 0, len2 = arr.length; l < len2; l++) {
    el = arr[l];
    this.push(el);
  }
  return this;
};

$.fn.addClasses = function() {
  var arg, k, len1;
  for (k = 0, len1 = arguments.length; k < len1; k++) {
    arg = arguments[k];
    this.addClass(arg);
  }
  return this;
};

$.fn.isEmpty = function() {
  return len(this) === 0;
};

$.fn.nodeName = function() {
  if (len(this) > 1) {
    return console.error('nodeName: More than on node to return! Just impossible');
  }
  if (this.isEmpty()) {
    return console.error('nodeName: No elements!');
  }
  return this[0].nodeName.toLowerCase();
};

$.fn.nb = function(index, to) {
  var i, j, jquerys, k, len1;
  if (to == null) {
    to = null;
  }
  if (to === null) {
    return $(this[index]);
  }
  if (to > this.length) {
    return console.error("Cannot get all the elements to '" + to + "'");
  }
  jquerys = this.slice(index, to);
  for (i = k = 0, len1 = jquerys.length; k < len1; i = ++k) {
    j = jquerys[i];
    jquerys[i] = $(j);
  }
  return jquerys;
};

$.isString = function(el) {
  return typeof el === 'string';
};

getFileType = function(filename, real) {
  var extension;
  if (real == null) {
    real = true;
  }
  extension = filename.split('.').get(-1);
  if (real) {
    return extension;
  }
  switch (extension) {
    case 'gitignore':
    case 'gitattributes':
      return 'git';
  }
  if (extension.contains('sublime')) {
    return 'sublime';
  }
  return extension;
};

normPath = function(path) {
  var i, item, k, len1;
  path = path.split('/');
  for (i = k = 0, len1 = path.length; k < len1; i = ++k) {
    item = path[i];
    if (item === '..') {
      if (i > 0 && path[i - 1] !== '..') {
        path.pop(i).pop(i - 1);
      }
    }
  }
  return path.join('/');
};

Path = (function() {
  function Path(path1) {
    this.path = path1 != null ? path1 : '/';
  }

  Path.prototype.norm = function() {
    var i, item, k, len1, path;
    path = this.path.split('/');
    for (i = k = 0, len1 = path.length; k < len1; i = ++k) {
      item = path[i];
      if (item === '..') {
        if (i > 0 && path[i - 1] !== '..') {
          path.pop(i).pop(i - 1);
        }
      }
    }
    return path.join('/');
  };

  Path.prototype.moveUp = function() {
    this.path = this.path.strip('/').split('/').slice(0, -1).join('/');
    return this;
  };

  Path.prototype.go = function() {
    var path;
    path = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    this.path = pathJoin.apply(null, [this.path].concat(slice.call(path)));
    return this;
  };

  Path.prototype.toString = function() {
    return this.path;
  };

  Path.abs = function(path) {
    return 'http://' + pathJoin(Config.get('localhost'), path);
  };

  Path.valid = function() {
    var path;
    path = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    path = path.join('/').split('/').removeAll('');
    path = path.join('/').split('\\').removeAll('');
    path = path.join('/').split('/').removeAll('').join('/');
    path = normPath(path);
    return path;
  };

  return Path;

})();
