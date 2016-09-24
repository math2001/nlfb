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
    var dirname;
    dirname = function() {
      return this.em.fire('update-path', Path.dirname());
    };
    return this.$dirname.bind('click', dirname.bind(this));
  };

  return Tools;

})();
