var Path, add, arr, array_diff, code, copy, die, extend, extract, float, forEach, getFileType, getPath, int, len, list, moveUp, openInNewTab, pathJoin, quote, say, startWith, str, trim,
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
  var e, j, len1, results;
  results = [];
  for (j = 0, len1 = el.length; j < len1; j++) {
    e = el[j];
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

array_diff = function(arr1, arr2) {
  var el, j, len1;
  arr = [];
  for (j = 0, len1 = arr1.length; j < len1; j++) {
    el = arr1[j];
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
  var i, j, key, keys, len1;
  keys = Object.keys(obj);
  for (i = j = 0, len1 = keys.length; j < len1; i = ++j) {
    key = keys[i];
    func(key, obj[key], obj, i);
  }
  return obj;
};

extend = function(obj1, obj2) {
  var j, k, key, keys1, keys2, len1, len2, obj;
  obj = {};
  keys1 = Object.keys(obj1);
  keys2 = Object.keys(obj2);
  for (j = 0, len1 = keys1.length; j < len1; j++) {
    key = keys1[j];
    obj[key] = obj1[key];
  }
  for (k = 0, len2 = keys2.length; k < len2; k++) {
    key = keys2[k];
    obj[key] = obj2[key];
  }
  return obj;
};

add = function(arr1, arr2) {
  var el, j, len1;
  for (j = 0, len1 = arr2.length; j < len1; j++) {
    el = arr2[j];
    arr1.push(el);
  }
  return arr1;
};

trim = function(str, charToRemove) {
  var char, cont, end, i, j, k, len1, len2, ref, start;
  if (charToRemove == null) {
    charToRemove = ' ';
  }
  start = 0;
  end = len(str);
  cont = true;
  for (i = j = 0, len1 = str.length; j < len1; i = ++j) {
    char = str[i];
    if (cont === true && char === charToRemove) {
      start++;
    } else {
      cont = false;
    }
  }
  cont = true;
  ref = list(str).reverse();
  for (i = k = 0, len2 = ref.length; k < len2; i = ++k) {
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
  return path.replace(/<\/?[^>]+(>|$)/g, "");
};

extract = function(obj, objToSave) {
  var isValid, j, key, len1, ref;
  if (objToSave == null) {
    objToSave = false;
  }
  isValid = function(varName) {
    return /[a-zA-Z_][a-zA-Z0-9_]+/.test(varName);
  };
  ref = Object.keys(obj);
  for (j = 0, len1 = ref.length; j < len1; j++) {
    key = ref[j];
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
  var j, len1, tested, w;
  if (type == null) {
    type = 'any';
  }
  tested = str.slice(0, len(word));
  if (typeof word === typeof 'str') {
    return tested === word;
  }
  if (typeof word !== typeof ['foo']) {
    for (j = 0, len1 = word.length; j < len1; j++) {
      w = word[j];
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
  var final, j, len1, p, path, paths, sep;
  paths = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  final = [];
  sep = '/';
  for (j = 0, len1 = paths.length; j < len1; j++) {
    path = paths[j];
    if (!$.isString(path)) {
      return console.error("pathJoin: Can only join string and not " + (typeof path));
    }
    p = trim(path, '/');
    if (p !== '') {
      final.push(p);
    }
  }
  return final.join(sep);
};

String.prototype.strip = function(char) {
  if (char == null) {
    char = '/';
  }
  return trim(this, char);
};

Array.prototype.remove = function(el) {
  var e, i, j, k, l, len1, len2, ref, results;
  arr = [];
  for (j = 0, len1 = this.length; j < len1; j++) {
    e = this[j];
    if (e !== el) {
      arr.push(el);
    }
  }
  for (i = k = 0, ref = this.length; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
    arr.pop();
  }
  results = [];
  for (l = 0, len2 = arr.length; l < len2; l++) {
    el = arr[l];
    results.push(arr.push(el));
  }
  return results;
};

Array.prototype.get = function(index) {
  if (index < 0) {
    index = len(this) + index;
  }
  return this[index];
};

$.fn.addClasses = function() {
  var arg, j, len1;
  for (j = 0, len1 = arguments.length; j < len1; j++) {
    arg = arguments[j];
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

$.isString = function(el) {
  return typeof el === 'string';
};

Path = (function() {
  function Path(path1) {
    this.path = path1 != null ? path1 : '/';
  }

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

  Path.prototype.abs = function() {
    return 'http://' + pathJoin(Config.get('localhost'), this.path);
  };

  return Path;

})();

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
  return extension;
};
