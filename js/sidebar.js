var Sidebar;

Sidebar = (function() {
  function Sidebar() {}

  Sidebar.init = function() {
    this.$sidebar = $('#sidebar').find('.projects');
    this.template = $('#sidebar-template').html();
    this.loadItems({
      path: '/',
      $target: this.$sidebar,
      init: true
    });
    return this.bindDOM();
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
      url: "getitems.php",
      data: {
        path: kwargs.path,
        filter: 'folders',
        noticer: 'hasFolder'
      },
      method: 'GET'
    }).done(done.bind(this)).fail(fail);
  };

  Sidebar.bindDOM = function() {
    var showDeeper;
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
      $toDeploy = kwargs.$target.find('ul');
      if ($toDeploy.length === 0) {
        $toDeploy = $(Mustache.render(this.template, dataForTemplate)).slideUp(0);
        kwargs.$target.append($toDeploy);
      }
      return $toDeploy.slideDown();
    } else {
      return kwargs.$target.find('ul').first().slideUp();
    }
  };

  return Sidebar;

})();
