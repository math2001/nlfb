var Shorcuts;

Shorcuts = (function() {
  function Shorcuts() {}

  Shorcuts.init = function() {
    return this.bindEvents();
  };

  Shorcuts.canRun = function() {
    return !Search.isFocus() && !Tools.isFocus();
  };

  Shorcuts.bindEvents = function() {
    var checkForShortcuts;
    checkForShortcuts = function(e) {
      var prevent;
      if (e.ctrlKey) {
        return true;
      }
      prevent = true;
      if (this.canRun() && e.keyCode === code('f')) {
        prevent = Search.run();
      } else if (this.canRun() && e.keyCode === code('r')) {
        Tools.refresh();
      } else if (this.canRun() && e.keyCode === code('d')) {
        Tools.dirname();
      } else if (this.canRun() && e.keyCode === code('e')) {
        Tools.showEditPathPanel();
      } else {
        prevent = false;
      }
      if (prevent) {
        e.preventDefault();
      }
      return !prevent;
    };
    return $(document.body).bind('keydown', checkForShortcuts.bind(this));
  };

  return Shorcuts;

})();
