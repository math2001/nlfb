var Tools;

Tools = (function() {
  function Tools() {}

  Tools.init = function(em) {
    this.em = em;
    this.$dirname = $('#dirname');
    this.$refresh = $('#refresh');
    this.$editpath = $('#edit-path');
    return this.bindDOM();
  };

  Tools.bindDOM = function() {
    var dirname, refresh;
    dirname = function() {
      return this.em.fire('update-path', Path.dirname());
    };
    refresh = function() {
      return this.em.fire('navigate', location.hash.slice(1));
    };
    this.$dirname.bind('click', dirname.bind(this));
    return this.$refresh.bind('click', refresh.bind(this));
  };

  return Tools;

})();
