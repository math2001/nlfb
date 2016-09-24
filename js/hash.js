var Hash;

Hash = (function() {
  function Hash() {}

  Hash.init = function(em) {
    this.em = em;
    this.bindDOM();
    return this.bindEvents();
  };

  Hash.bindEvents = function() {
    var updatePath;
    updatePath = function(path) {
      return location.hash = '#' + path;
    };
    return this.em.on('update-path', updatePath);
  };

  Hash.bindDOM = function() {
    var fireNavigation;
    fireNavigation = function() {
      return this.em.emit('navigate', location.hash.slice(1));
    };
    return $(window).bind('hashchange', fireNavigation.bind(this));
  };

  return Hash;

})();
