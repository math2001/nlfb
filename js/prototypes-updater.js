var forEach;

forEach = function(obj, func) {
  var i, j, key, keys, len;
  keys = Object.keys(obj);
  for (i = j = 0, len = keys.length; j < len; i = ++j) {
    key = keys[i];
    func(key, obj[key], obj, i);
  }
  return obj;
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
