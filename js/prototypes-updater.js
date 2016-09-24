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

Array.prototype.remove = function(valToRemove) {
  var arr, j, len, val;
  arr = [];
  for (j = 0, len = this.length; j < len; j++) {
    val = this[j];
    if (val !== valToRemove) {
      arr.push(val);
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

String.prototype.strip = function(str, charToRemove) {
  var char, cont, end, i, j, k, len, len1, ref, start;
  if (charToRemove == null) {
    charToRemove = ' ';
  }
  start = 0;
  end = str.length;
  cont = true;
  for (i = j = 0, len = str.length; j < len; i = ++j) {
    char = str[i];
    if (cont === true && char === charToRemove) {
      start++;
    } else {
      cont = false;
    }
  }
  cont = true;
  ref = str.split('').reverse();
  for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
    char = ref[i];
    if (cont === true && char === charToRemove) {
      end--;
    } else {
      cont = false;
    }
  }
  return str.slice(start, end);
};
