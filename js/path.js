var Path;

Path = (function() {
  function Path() {}

  Path.path = '/';

  Path.prototype.join = function(to) {
    return this.path + to.strip('/') + '/';
  };

  Path.prototype.go = function() {
    var arg, j, len;
    for (j = 0, len = arguments.length; j < len; j++) {
      arg = arguments[j];
      this.path = this.join(arg);
    }
    return this;
  };

  Path.prototype.dirname = function(times) {
    var i, j, ref;
    if (times == null) {
      times = 1;
    }
    this.path = this.path.split('/');
    for (i = j = 0, ref = times; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      if (this.path.get(-1) !== '..') {
        this.path = this.path.slice(0, -1);
      } else {
        this.path.push('..');
      }
    }
    this.path = this.path.join('/');
    return this;
  };

  return Path;

})();
