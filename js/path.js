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

  Path.dirname = function(times) {
    var i, j, path, ref;
    if (times == null) {
      times = 1;
    }
    path = this.path.split('/');
    path.remove('');
    for (i = j = 0, ref = times; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      if (path.get(-1) !== '..' && path.length > 0) {
        path = path.slice(0, -1);
      } else {
        path.push('..');
      }
    }
    path = '/' + path.join('/');
    return path;
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
