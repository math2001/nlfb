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
    this.bindDOM();
    return this.bindEvents();
  };

  Tools.bindEvents = function() {
    var saveItems;
    saveItems = function($items) {
      return this.$items = $items;
    };
    return this.em.on('items-var-changed', saveItems.bind(this));
  };

  Tools.dirname = function() {
    return this.em.fire('update-path', Path.dirname());
  };

  Tools.refresh = function() {
    return this.em.fire('navigate', location.hash.slice(1));
  };

  Tools.isFocus = function() {
    return this.$editpathInput.is(':focus');
  };

  Tools.showEditPathPanel = function() {
    this.$editpathPanel.fadeIn(400);
    return this.$editpathInput.focus();
  };

  Tools.bindDOM = function() {
    var searchCommand, specificToItems, view;
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
    this.$dirname.bind('click', this.dirname.bind(this));
    this.$refresh.bind('click', this.refresh.bind(this));
    this.$editpath.bind('click', this.showEditPathPanel.bind(this));
    specificToItems = {
      open: {
        name: "Open in real",
        accesskey: "r",
        callback: this.openInReal
      },
      copy: {
        name: "Copy",
        accesskey: "c",
        items: {
          name: {
            name: "Name",
            callback: this.copyName
          },
          path: {
            name: "Path",
            callback: this.copyPath
          },
          pathForUrl: {
            name: "Path for url",
            callback: this.copyPath
          }
        }
      }
    };
    view = {
      hiddenFiles: {
        name: 'Toogle hidden items',
        callback: this.toggleHiddenFiles.bind(this)
      },
      zoom: {
        name: 'Zoom',
        items: {
          'in': {
            name: 'Zoom in',
            callback: this.zoom.bind(this)
          },
          'out': {
            name: 'Zoom out',
            callback: this.zoom.bind(this)
          }
        }
      }
    };
    $.contextMenu({
      selector: '.items',
      items: view
    });
    return $.contextMenu({
      selector: '.item',
      items: $.extend(specificToItems, view)
    });
  };

  Tools.copyName = function(key, opt) {
    return copyText(opt.$trigger.find('a').text());
  };

  Tools.copyPath = function(key, opt) {
    if (key === 'pathForUrl') {
      return copyText(encodeURI(opt.$trigger.attr('data-href')));
    } else {
      return copyText(opt.$trigger.attr('data-href'));
    }
  };

  Tools.openInReal = function(key, opt) {
    console.log(CONFIG.localhost);
    return openInNewTab('http://' + CONFIG.localhost + '/' + opt.$trigger.attr('data-href').slice(1));
  };

  Tools.toggleHiddenFiles = function(key, opt) {
    return this.$items.attr('hiding-files', this.$items.attr('hiding-files') === 'on' ? 'off' : 'on');
  };

  Tools.zoom = function(key, opt) {
    Items.zoom(key);
    return false;
  };

  return Tools;

})();
