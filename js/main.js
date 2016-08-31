var addItemsTo, advancedResearch, handleExpandFolder, loadDirs, loadProjects, manageContextMenu, manageSearch, manageSideBarResize, shortenPath, update, updateBreadcrumb;

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
  var dir, dirImg, file, hide, j, k, len1, len2;
  if (dirs == null) {
    dirs = [];
  }
  if (files == null) {
    files = [];
  }
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
    $el.append("<li contextmenuc='item-contextmenu' class='item" + hide + "' data-href='" + (getPath(file)) + "'> <img src='img/file_types/" + (getFileType(file)) + ".svg' onerror='this.src=\"img/file_types/default.svg\"'> <a>" + file + "</a> </li>");
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

update = function(mess, type, jqXHR) {
  var codeContent, folderContent, func, imageContent, time;
  updateBreadcrumb();
  folderContent = function() {
    var $new;
    extract(mess, window);
    $new = $('<ul></ul>');
    $new.attr('class', window.$items.attr('class'));
    if (len(dirs) + len(files) === 0) {
      $new.html('<p class="cd-empty">Empty</p>');
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
  if (jqXHR.getResponseHeader('content-type') === 'application/json') {
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
  if (path == null) {
    path = false;
  }
  if (func == null) {
    func = false;
  }
  if (data == null) {
    data = false;
  }
  return $.ajax({
    url: "./index.server.php",
    method: "GET",
    data: $.extend({
      path: path || getPath()
    }, data || {})
  }).done(func || update).fail(function(jqXHR, type, obj) {
    say('Error: Fail on loading files from server!');
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
    console.info('loadDirs from server');
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
  $(document).bind('keydown', function() {
    return window.$search.focus();
  });
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
  });
};

manageContextMenu = function() {
  var contextMenuTime, hide;
  window.lastContextMenuFromElement = null;
  window.toRemoveFocus = null;
  contextMenuTime = Config.get('contextMenuTime');
  $(document).on('contextmenu', 'li[data-href]', function(e) {
    e.preventDefault();
    window.lastContextMenuFromElement = this;
    window.toRemoveFocus = $(this).attr('focused', 'on');
    return window.$contextmenu.css({
      top: e.clientY - 16,
      left: e.clientX
    }).fadeIn();
  });
  hide = function() {
    window.$contextmenu.fadeOut(contextMenuTime);
    if (window.toRemoveFocus !== null) {
      return window.toRemoveFocus.attr('focused', 'off');
    }
  };
  window.$contextmenu.bind('clickoutside', hide);
  window.$contextmenu.bind('mousedownoutside', hide);
  return window.$contextmenu.find('[class*=action]').bind('click', hide);
};

$(window).ready(function() {
  Config.init();
  window.$main = $('#main');
  window.$items = $('.items');
  window.$breadcrumb = $('.breadcrumb');
  window.$sidebar = $('#sidebar');
  window.$sep = $('#sep');
  window.$search = $('#search');
  window.$contextmenu = $('#item-contextmenu');
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
