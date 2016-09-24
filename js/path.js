var Path;

Path = (function() {
  function Path() {}

  Path.init = function(em) {
    this.em = em;
    this.path = '/';
    return this.bindEvents();
  };

  Path.join = function(to) {
    var path;
    path = this.path.split('/');
    path.remove('');
    path.push(to.strip('/'));
    return '/' + path.join('/');
  };

  Path.go = function() {
    var arg, j, len;
    for (j = 0, len = arguments.length; j < len; j++) {
      arg = arguments[j];
      this.path = this.join(arg);
    }
    return this;
  };

  Path.dirname = function(times) {
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

  Path.bindEvents = function() {
    var editPath;
    editPath = function(path) {
      return this.path = path;
    };
    return this.em.on('navigate', editPath.bind(this));
  };

  return Path;

})();
