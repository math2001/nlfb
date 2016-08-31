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

  return CMF;

})();
