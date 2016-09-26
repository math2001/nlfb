var Tools;

Tools = (function() {
  function Tools() {}

  Tools.init = function(em, path1) {
    this.em = em;
    this.path = path1;
    this.$dirname = $('#dirname');
    this.$refresh = $('#refresh');
    this.$editpath = $('#edit-path');
    this.$editpathPanel = $('#path-edit-panel');
    this.$editpathInput = this.$editpathPanel.find('input');
    return this.bindDOM();
  };

  Tools.bindDOM = function() {
    var dirname, refresh, searchCommand, showEditPathPanel;
    dirname = function() {
      return this.em.fire('update-path', Path.dirname());
    };
    refresh = function() {
      return this.em.fire('navigate', location.hash.slice(1));
    };
    showEditPathPanel = function() {
      this.$editpathPanel.fadeIn(400);
      return this.$editpathInput.focus();
    };
    searchCommand = function(e) {
      var $this, path;
      $this = $(this);
      if (e.keyCode === code('enter')) {
        path = $this.val();
        if (path[0] !== '/') {
          path = e.data["this"].path.join(path);
        }
        e.data["this"].em.fire('update-path', path);
        if (!e.ctrlKey) {
          e.data["this"].$editpathPanel.fadeOut();
          return $this.val('');
        }
        return $this.val('');
      } else if (e.keyCode === code('escape')) {
        $this.val('');
        return e.data["this"].$editpathPanel.fadeOut();
      }
    };
    this.$editpathInput.bind('keydown', {
      "this": this
    }, searchCommand);
    this.$dirname.bind('click', dirname.bind(this));
    this.$refresh.bind('click', refresh.bind(this));
    return this.$editpath.bind('click', showEditPathPanel.bind(this));
  };

  return Tools;

})();
