var CTX, manageContextMenu;

CTX = (function() {
  function CTX() {}

  CTX.openInReal = function(el) {
    var href;
    if (el.nodeName.toLowerCase() === 'a') {
      el = el.parentNode;
    }
    href = el.getAttribute('data-href');
    return openInNewTab('localhost', href);
  };

  CTX.copyName = function(el) {
    var $el;
    if (el.nodeName.toLowerCase() === 'li') {
      $el = $(el).find('a');
    } else {
      $el = $(el);
    }
    return copy($el.text());
  };

  CTX.copyPath_ = function(el, forurl) {
    if (forurl == null) {
      forurl = false;
    }
    if (el.nodeName.toLowerCase() === 'a') {
      el = el.parentNode;
    }
    if (forurl === false) {
      return copy(el.getAttribute('data-href'));
    } else {
      return copy(encodeURIComponent(el.getAttribute('data-href')).replace(/%2F/g, '/'));
    }
  };

  CTX.copyPath = function(key, opt, forurl) {
    var $trigger, path;
    if (forurl == null) {
      forurl = false;
    }
    $trigger = opt.$trigger;
    if ($trigger.nodeName() === 'a') {
      $trigger = $trigger.parent();
    }
    path = new Path(Config.get('localhost'));
    path.go.apply(path, $trigger.attr('data-href').split('/'));
    if (forurl) {
      path = encodeURI(path);
    }
    return copy(path);
  };

  CTX.copyPathForUrl = function(key, opt) {
    return CTX.copyPath(key, opt, true);
  };

  CTX.toogleShowHiddenFiles = function($menuitem) {
    if (window.$items.hasClass('hiding-files')) {
      window.$items.removeClass('hiding-files');
      return $menuitem.text('Hide hidden items');
    } else {
      window.$items.addClass('hiding-files');
      return $menuitem.text('Show hidden items');
    }
  };

  return CTX;

})();

manageContextMenu = function() {
  return $.contextMenu({
    selector: 'li[data-href]',
    items: {
      open: {
        name: "Open in real",
        accesskey: "r",
        callback: function(key, opt) {
          return CTX.openInReal(opt.$trigger[0]);
        }
      },
      copy: {
        name: "Copy",
        accesskey: "c",
        items: {
          name: {
            name: "Name",
            callback: function(key, opt) {
              return CTX.copyName(opt.$trigger[0]);
            }
          },
          path: {
            name: "Path",
            callback: CTX.copyPath
          },
          pathForUrl: {
            name: "Path for url",
            callback: CTX.copyPathForUrl
          }
        }
      },
      sep1: "---------",
      hiddenFiles: {
        name: 'Toogle view hidden file',
        type: "checkbox"
      }
    }
  });
};
