var CMF;

CMF = (function() {
  function CMF() {}

  CMF._default = function() {
    return window.lastContextMenuFromElement;
  };

  CMF.openFromDataHref = function() {
    var el, href;
    el = CMF._default();
    if (el.nodeName.toLowerCase() === 'a') {
      el = el.parentNode;
    }
    href = el.getAttribute('data-href');
    return openInNewTab('localhost', href);
  };

  CMF.copyName = function() {
    var $el, el;
    el = CMF._default();
    if (el.nodeName.toLowerCase() === 'li') {
      $el = $(el).find('a');
    } else {
      $el = $(el);
    }
    return copy($el.text());
  };

  CMF.copyPath = function(forurl) {
    var el;
    if (forurl == null) {
      forurl = false;
    }
    el = CMF._default();
    if (el.nodeName.toLowerCase() === 'a') {
      el = el.parentNode;
    }
    if (forurl === false) {
      return copy(el.getAttribute('data-href'));
    } else {
      return copy(encodeURIComponent(el.getAttribute('data-href')).replace(/%2F/g, '/'));
    }
  };

  CMF.toogleShowHiddenFiles = function($menuitem) {
    if (window.$items.hasClass('hiding-files')) {
      window.$items.removeClass('hiding-files');
      return $menuitem.text('Show hidden items');
    } else {
      window.$items.addClass('hiding-files');
      return $menuitem.text('Hide hidden items');
    }
  };

  return CMF;

})();
