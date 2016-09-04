var ManageEditPath, addItemsTo, advancedResearch, handleExpandFolder, loadDirs, loadProjects, manageEditPath, manageSearch, manageSideBarResize, shortenPath, update, updateBreadcrumb;

advancedResearch = function(arr, pattern) {
  var el, highlightLetters, indexes, j, len1, match, results;
  if (pattern === '.') {
    return arr;
  }
  match = function(text, pattern) {
    var index, indexes, j, lastIndex, len1, letter;
    lastIndex = 0;
    indexes = [];
    for (j = 0, len1 = pattern.length; j < len1; j++) {
      letter = pattern[j];
      index = text.indexOf(letter, lastIndex);
      if (index === -1) {
        return false;
      }
      lastIndex = index;
      indexes.push(index);
    }
    return indexes;
  };
  highlightLetters = function(word, indexes) {
    var i, j, len1, letter, newWord;
    newWord = '';
    for (i = j = 0, len1 = word.length; j < len1; i = ++j) {
      letter = word[i];
      if (indexes.indexOf(i) !== -1) {
        newWord += "<b>" + letter + "</b>";
      } else {
        newWord += letter;
      }
    }
    return newWord;
  };
  results = [];
  for (j = 0, len1 = arr.length; j < len1; j++) {
    el = arr[j];
    indexes = match(el, pattern);
    if (indexes !== false) {
      results.push(highlightLetters(el, indexes));
    }
  }
  return results;
};

addItemsTo = function($el, dirs, files) {
  var dir, dirImg, file, hide, iconPath, isImage, j, k, len1, len2;
  if (dirs == null) {
    dirs = [];
  }
  if (files == null) {
    files = [];
  }
  isImage = function(file) {
    return $.inArray(getFileType(file), Config.get('imgExt')) > -1;
  };
  dirImg = '<img src="img/folder.svg" alt="folder">';
  hide = '';
  for (j = 0, len1 = dirs.length; j < len1; j++) {
    dir = dirs[j];
    hide = $.inArray(dir, Config.get('iFolders')) > -1 ? ' item-hide' : '';
    $el.append("<li contextmenuc='item-contextmenu' class='item" + hide + "' data-href='" + (getPath(dir)) + "'>" + dirImg + " <a>" + dir + "</a></li>");
  }
  for (k = 0, len2 = files.length; k < len2; k++) {
    file = files[k];
    hide = $.inArray(dir, Config.get('iFiles')) > -1 ? ' item-hide' : '';
    if (isImage(file)) {
      iconPath = Path.abs(Path.valid(location.hash.slice(1), removeTags(file)));
    } else {
      iconPath = "img/file_types/" + (getFileType(file, false)) + ".svg";
    }
    $el.append("<li contextmenuc='item-contextmenu' class='item" + hide + "' data-href='" + (getPath(file)) + "'> <img src='" + iconPath + "' onerror='this.src=\"img/file_types/default.svg\"'> <a>" + file + "</a> </li>");
  }
  return null;
};

shortenPath = function(liCounter) {
  $(window.$breadcrumb.find('li')[liCounter]).hide();
  liCounter++;
  if (liCounter === 1) {
    window.$breadcrumb.prepend('<li>...</li>');
  }
  if (window.$breadcrumb.height() > 60) {
    return shortenPath(liCounter);
  }
  return liCounter;
};

updateBreadcrumb = function() {
  var i, j, len1, pathBit, splitedPath;
  window.$breadcrumb.html('');
  window.$breadcrumb.append('<li nb=-1><a href="#">Localhost<a></li>');
  splitedPath = getPath();
  if (splitedPath === '.') {
    return true;
  }
  splitedPath = splitedPath.split('/');
  for (i = j = 0, len1 = splitedPath.length; j < len1; i = ++j) {
    pathBit = splitedPath[i];
    window.$breadcrumb.append($('<li></li>').append($('<a></a>').text(pathBit).attr('href', '#' + splitedPath.slice(0, i + 1).join('/'))));
  }
  if (window.$breadcrumb.height() > 60) {
    shortenPath(0);
  }
  return true;
};

update = function(mess, type, jqXHR, isFolderForSure) {
  var codeContent, folderContent, func, imageContent, time;
  if (isFolderForSure == null) {
    isFolderForSure = false;
  }
  updateBreadcrumb();
  folderContent = function() {
    var $new, msg;
    extract(mess, window);
    $new = $('<ul></ul>');
    $new.addClass('items');
    if (len(dirs) + len(files) === 0) {
      if (type === 'fail') {
        msg = '...';
      } else {
        'Empty';
      }
      $new.html("<p class=\"cd-empty\">" + msg + "</p>");
    } else {
      addItemsTo($new, dirs, files);
    }
    return $new;
  };
  codeContent = function() {
    var $new;
    $new = $('<pre></pre>');
    $new.addClass('items').append($('<code></code>').html(mess.replace(/\t/g, '  ')).addClass(getFileType(str(location.hash), true)));
    return $new;
  };
  imageContent = function() {
    var $new;
    return $new = $('<div></div>').addClass('items').append($('<img>').attr('src', mess).addClass('atomic-center').css({
      "max-width": "100%",
      "max-height": "100%"
    }));
  };
  if (isFolderForSure === true || jqXHR.getResponseHeader('content-type') === 'application/json') {
    func = folderContent;
  } else if (jqXHR.getResponseHeader('content-type') === 'text/html') {
    func = codeContent;
  } else if (jqXHR.getResponseHeader('content-type').indexOf('image' > -1)) {
    func = imageContent;
  }
  window.files = null;
  window.dirs = null;
  time = Config.get('totalSlideTime') / 2;
  return window.$items.animate({
    opacity: 0,
    overflow: "hidden",
    left: -50,
    right: 50
  }, time, function() {
    var $new;
    $new = func();
    $new.attr('hiding-files', window.$items.attr('hiding-files'));
    $new.attr('view-mode', window.$items.attr('view-mode'));
    $new.attr('showing', 'on');
    if ($new[0].nodeName.toLowerCase() === 'pre') {
      hljs.highlightBlock($new[0]);
    }
    window.$items.after($new);
    $new.animate({
      opacity: 1,
      left: 10,
      right: 0
    }, time, function() {
      return $new.attr('showing', 'off');
    });
    window.$items.remove();
    return window.$items = $new;
  });
};

loadDirs = function(path, func, data) {
  var currentPath;
  if (path == null) {
    path = false;
  }
  if (func == null) {
    func = false;
  }
  if (data == null) {
    data = false;
  }
  currentPath = location.hash;
  if (path === false) {
    path = getPath();
  }
  return $.ajax({
    url: "./index.server.php",
    method: "GET",
    data: $.extend({
      path: path
    }, data || {})
  }).done(func || update).fail(function(jqXHR, type, obj) {
    window.modals.simple("404!", "<p>An error has occurred while we were loading files at <code>" + path + "</code> from server.</p> <pre>" + (jqXHR.getAllResponseHeaders()) + "</pre>", "error");
    update({
      files: [],
      errors: [],
      dirs: []
    }, 'fail', jqXHR, true);
    return console.info(jqXHR.getAllResponseHeaders());
  });
};

loadProjects = function($el) {
  var add;
  if ($el == null) {
    $el = window.$sidebar;
  }
  add = function(dirs, type, $infos) {
    var $ul;
    if ($infos.getResponseHeader('content-type') !== 'application/json') {
      say('unnable to load projects!');
      return console.info($infos.getAllResponseHeaders());
    }
    $ul = window.$sidebar.find('ul').first();
    $ul.find('li').remove();
    return forEach(dirs, function(dir, has_folder) {
      if (!$.inArray(dir, Config.get('iProjects'))) {
        return false;
      }
      return $ul.append($('<li></li>').append(has_folder ? '<span class="spoiler-button"></span>' : '<span class="spoiler-replace"></span>').append($('<a></a>').text(dir).attr('data-href', dir)));
    });
  };
  return loadDirs('.', add, {
    forsidebar: 'yes'
  });
};

handleExpandFolder = function() {
  var $this, $ul, path;
  $this = $(this);
  path = $this.next('a').attr('data-href');
  if ($this.attr('deployed') === 'on') {
    $this.attr('deployed', 'off');
    return $this.parent().find('ul').slideUp();
  }
  $ul = $this.parent().find('ul').first();
  if (len($ul) !== 0) {
    $this.attr('deployed', 'on');
    return $ul.slideDown();
  }
  return loadDirs(path, function(dirs, type, $infos) {
    $ul = $('<ul></ul>').hide();
    forEach(dirs, function(dir, has_folder) {
      return $ul.append($('<li></li>').append(has_folder ? '<span class="spoiler-button"></span>' : '<span class="spoiler-replace"></span>').append($('<a></a>').text(dir).attr('data-href', path + '/' + dir)));
    });
    $this.parent().append($ul);
    $this.attr('deployed', 'on');
    return $ul.slideDown();
  }, {
    forsidebar: 'yes'
  });
};

manageEditPath = function() {
  var hideEditPath;
  window.$editPathInput = $('<input type="text">').attr('placeholder', 'Path...');
  window.isEditPathHidden = true;
  hideEditPath = function() {
    window.$editPathInput.unbind();
    window.$breadcrumb.html(window.prevBreadcrumbHtml);
    if (Config.get('emptyEditPathValueOnHide')) {
      window.$editPathInput.val('');
    }
    return window.isEditPathHidden = true;
  };
  return window.$editPath.bind('click', function() {
    if (window.isEditPathHidden === true) {
      window.isEditPathHidden = false;
      window.$editPathInput.bind('keydown', function(e) {
        var path;
        if (e.keyCode === code('enter')) {
          path = $(this).val();
          if (path === location.hash.slice(1)) {
            return loadDirs();
          } else {
            if (path[0] !== '/') {
              path = pathJoin(location.hash.slice(1), path);
            } else {
              path = path.slice(1);
            }
            hideEditPath();
            return location.hash = '#' + path;
          }
        } else if (e.keyCode === code('escape')) {
          return hideEditPath();
        }
      }).bind('blur', function() {
        return hideEditPath();
      });
      window.prevBreadcrumbHtml = window.$breadcrumb.html();
      window.$breadcrumb.html(window.$editPathInput);
      return window.$editPathInput.focus();
    } else {
      return hideEditPath();
    }
  });
};

ManageEditPath = (function() {
  function ManageEditPath() {
    var _this;
    this.$input = $('<input type="text">').attr('placeholder', 'Path...');
    this.isHide = true;
    this.prevBreadcrumbHtml = '';
    _this = this;
    $('#edit-path').bind('click', function(e) {
      if (_this.isHide) {
        return _this.show();
      } else {
        return _this.hide();
      }
    });
  }

  ManageEditPath.prototype.show = function() {
    var _this;
    this.isHide = false;
    this.prevBreadcrumbHtml = window.$breadcrumb.html();
    window.$breadcrumb.html(this.$input);
    this.$input.focus();
    _this = this;
    return this.$input.bind('keydown', function(e) {
      var path;
      if (e.keyCode === code('enter')) {
        path = _this.$input.val();
        if (path[0] !== '/') {
          path = pathJoin(location.hash.slice(1), path);
        }
        path = Path.valid(path);
        location.hash = '#' + path;
        _this.hide();
      }
      if (e.keyCode === code('escape')) {
        return _this.$input.trigger('blur');
      }
    }).bind('blur', function() {
      return _this.hide();
    });
  };

  ManageEditPath.prototype.hide = function() {
    this.isHide = true;
    window.$breadcrumb.html(this.prevBreadcrumbHtml);
    if (Config.get('emptyEditPathValueOnHide')) {
      return this.$input.val('');
    }
  };

  ManageEditPath.prototype.input = function() {
    return this.$input;
  };

  return ManageEditPath;

})();

manageSideBarResize = function() {
  window.resizingSidebar = false;
  window.$sep.bind('mousedown', function() {
    return window.resizingSidebar = true;
  });
  return $(document).bind('mouseup', function() {
    return window.resizingSidebar = false;
  }).bind('mousemove', function(e) {
    if (!window.resizingSidebar) {
      return true;
    }
    e.preventDefault();
    window.$sep.css('left', e.clientX);
    window.$sidebar.css('width', e.clientX);
    return window.$main.css('width', document.body.clientWidth - e.clientX);
  });
};

manageSearch = function() {
  return window.$search.bind('input', function(e) {
    var dirs, files, val;
    if (window.files === null || window.dirs === null) {
      $(this).val('').addClass('error');
      return true;
    }
    val = $(this).removeClass('error').val();
    if (val === '') {
      files = window.files;
      dirs = window.dirs;
    } else {
      files = advancedResearch(window.files, val);
      dirs = advancedResearch(window.dirs, val);
    }
    window.$items.html('');
    return addItemsTo(window.$items, dirs, files);
  }).bind('keydown', function(e) {
    if (e.keyCode === code('escape')) {
      return window.$search.blur();
    }
  });
};

$(window).ready(function() {
  Config.init();
  window.$editPath = $('#edit-path');
  window.$main = $('#main');
  window.$items = $('.items');
  window.$breadcrumb = $('.breadcrumb');
  window.$sidebar = $('#sidebar');
  window.$sep = $('#sep');
  window.$search = $('#search');
  window.$contextmenu = $('#item-contextmenu');
  window.$document = $(document);
  window.editPath = new ManageEditPath();
  window.modals = new ModalsManager();
  window.$document.bind('keydown', function(e) {
    var canFocusSomething;
    canFocusSomething = $(':focus').length === 0;
    if (e.keyCode === code('f') && canFocusSomething) {
      e.preventDefault();
      return window.$search.focus();
    } else if (e.keyCode === code('e') && canFocusSomething) {
      window.editPath.show();
      return e.preventDefault();
    } else if (canFocusSomething && window.modals.hasAModalFocused && $.inArray(e.keyCode, [code(' '), code('enter')])) {
      e.preventDefault();
      return window.modals.hideThemAll();
    }
  });
  loadDirs();
  loadProjects();
  $('#refresh').click(function() {
    return loadDirs();
  });
  manageSearch();
  manageSideBarResize();
  manageContextMenu();
  $(window).bind('hashchange', function() {
    return loadDirs();
  });
  $('#move-up').bind('click', function() {
    return location.hash = moveUp(location.hash);
  });
  return $(document).on('click', '[data-href]', function() {
    return location.hash = $(this).attr('data-href');
  }).on('click', '.spoiler-button', handleExpandFolder);
});
