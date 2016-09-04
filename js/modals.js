var ModalsManager, test;

ModalsManager = (function() {
  function ModalsManager() {
    var $simple;
    $simple = $('#simple-message');
    this._simple = {
      modal: $simple,
      fader: $simple.parent(),
      header: $simple.find('h3'),
      body: $simple.find('.mbody')
    };
    this._simple.fader.hide();
    window.$document.on('click', '.modal .close', function() {
      $(this).parentsUntil('.mfade').last().parent().fadeOut();
      return this.hasAModalFocused = false;
    });
    this.hasAModalFocused = false;
  }

  ModalsManager.prototype.simple = function(header, message, type, time) {
    if (type == null) {
      type = null;
    }
    if (time == null) {
      time = 400;
    }
    this.hasAModalFocused = true;
    this._simple.modal.attr('data-type', type);
    this._simple.header.text(header).append('<span class="close">&times;</span>');
    this._simple.body.html(message);
    return this._simple.fader.fadeIn(time);
  };

  ModalsManager.prototype.hideThemAll = function() {
    this._simple.fader.fadeOut();
    return console.log(this.name, 'hideThemAll');
  };

  return ModalsManager;

})();

test = function() {
  var modals;
  window.$document = $(document);
  modals = new ModalsManager();
  return modals.simple('404 - Path unexisting', 'This path does not exists, impossible to ...');
};
