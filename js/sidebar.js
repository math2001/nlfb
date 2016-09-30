var Sidebar;

Sidebar = (function() {
  function Sidebar() {}

  Sidebar.init = function() {
    this.$sidebar = $('#sidebar');
    this.$projects = this.$sidebar.find('.projects');
    this.$sidebarResizer = $('#sep');
    this.template = $('#sidebar-template').html();
    this.loadItems({
      path: '/',
      $target: this.$projects,
      init: true
    });
    this.bindDOM();
    this.bindEvents();
    this.resizingSidebar = false;
    return this.sidebarIsHidden = false;
  };

  Sidebar.loadItems = function(kwargs) {
    var done, fail;
    if (kwargs.path === void 0) {
      return console.error('Need path to load items.');
    }
    if (kwargs.$target === void 0) {
      return console.error('Need target to load items.');
    }
    fail = function() {
      return alert('error during loading sidebar! (ajax)');
    };
    done = function(mess, type, jqXHR) {
      var add, folders, toShow;
      if (kwargs.path === '/') {
        folders = {};
        toShow = $.arrayDiff(Object.keys(mess.folders), CONFIG.exclude_projects);
        add = function(key, val) {
          if (toShow.indexOf(key) >= 0) {
            return folders[key] = val;
          }
        };
        forEach(mess.folders, add);
      } else {
        folders = mess.folders;
      }
      return this.render({
        folders: folders,
        $target: kwargs.$target,
        basePath: kwargs.path,
        deploy: kwargs.deploy,
        init: kwargs.init
      });
    };
    return $.ajax({
      url: "server.php",
      data: {
        path: kwargs.path,
        filter: "folders",
        noticer: "hasFolder"
      },
      method: "GET"
    }).done(done.bind(this)).fail(fail);
  };

  Sidebar.bindEvents = function() {
    var updateItemsVar;
    updateItemsVar = function($items) {
      return this.$items = $items;
    };
    return EM.on('items-var-changed', updateItemsVar.bind(this));
  };

  Sidebar.bindDOM = function() {
    var resizeSidebar, showDeeper, startResizeSidebar, stopResizeSidebar;
    showDeeper = function(e) {
      var $this, paramsToLoadFunction;
      $this = $(this);
      paramsToLoadFunction = {
        path: $this.next('a').attr('data-href').slice(1),
        $target: $this.parent()
      };
      if ($this.attr('deployed') === 'off') {
        paramsToLoadFunction.deploy = true;
        $this.attr('deployed', 'on');
      } else {
        paramsToLoadFunction.deploy = false;
        $this.attr('deployed', 'off');
      }
      return e.data["this"].loadItems(paramsToLoadFunction);
    };
    startResizeSidebar = function() {
      this.resizingSidebar = true;
      return $(document.body).css('cursor', 'col-resize');
    };
    stopResizeSidebar = function() {
      this.resizingSidebar = false;
      return $(document.body).css('cursor', '');
    };
    resizeSidebar = function(e) {
      var x;
      if (!this.resizingSidebar) {
        return;
      }
      e.preventDefault();
      x = (e.clientX / document.body.clientWidth) * 100;
      this.$sidebar.css('width', x + '%');
      this.$sidebarResizer.css('left', x + '%');
      this.$items.parent().css('width', (100 - x) + '%');
      return x;
    };
    this.$sidebarResizer.bind('mousedown', startResizeSidebar.bind(this));
    $(document.body).bind('mouseup', stopResizeSidebar.bind(this)).bind('mousemove', resizeSidebar.bind(this));
    return this.$sidebar.on('click', '.spoiler-button', {
      "this": this
    }, showDeeper);
  };

  Sidebar.render = function(kwargs) {
    var $toDeploy, dataForTemplate, formatDataForTemplate;
    if (kwargs.folders === void 0) {
      return console.error('Need folders to render.');
    }
    if (kwargs.basePath === void 0) {
      return console.error('Need path to render.');
    }
    if (kwargs.$target === void 0) {
      return console.error('Need target to render.');
    }
    dataForTemplate = {
      folders: []
    };
    formatDataForTemplate = function(name, hasFolder) {
      return dataForTemplate.folders.push({
        name: name,
        hasFolder: hasFolder,
        path: Path.join(name, kwargs.basePath)
      });
    };
    forEach(kwargs.folders, formatDataForTemplate);
    if (kwargs.init === true) {
      return kwargs.$target.html(Mustache.render(this.template, dataForTemplate));
    }
    if (kwargs.deploy) {
      $toDeploy = kwargs.$target.find('ul').first();
      if ($toDeploy.length === 0) {
        $toDeploy = $(Mustache.render(this.template, dataForTemplate)).slideUp(0);
        kwargs.$target.append($toDeploy);
      }
      return $toDeploy.slideDown(CONFIG.deployment_transition_time);
    } else {
      return kwargs.$target.find('ul').first().slideUp(CONFIG.deployment_transition_time);
    }
  };

  Sidebar.show = function() {
    var sidebarWidth;
    sidebarWidth = Math.round(parseInt(Sidebar.$sidebar.attr("data-prev-width")) / document.body.clientWidth * 100);
    this.$sidebarResizer.show();
    this.$sidebar.animate({
      width: sidebarWidth + '%'
    }, 500);
    return Items.$items.parent().animate({
      width: (100 - sidebarWidth) + '%'
    }, 500);
  };

  Sidebar.hide = function() {
    this.$sidebarResizer.hide();
    this.$sidebar.attr('data-prev-width', this.$sidebar.css("width")).animate({
      width: '0%'
    }, 500);
    return Items.$items.parent().animate({
      width: '100%'
    }, 500);
  };

  Sidebar.toggle = function() {
    if (this.sidebarIsHidden) {
      this.show();
      this.sidebarIsHidden = false;
    } else {
      this.hide();
      this.sidebarIsHidden = true;
    }
    return true;
  };

  return Sidebar;

})();
