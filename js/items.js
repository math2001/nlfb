var Items;

Items = (function() {
  function Items() {}

  Items.init = function() {
    this.files = {};
    this.folders = {};
    this.$items = $('.items');
    this.templates = {
      'files and folders': $('#items-template-faf').html(),
      'code': $('#items-template-code').html(),
      'image': $('#items-template-image').html()
    };
    return this.bindEvent();
  };

  Items.getIconForFile = function(extension) {
    var ext;
    ext = 'default';
    forEach(CONFIG.supported_icons, function(glob, file) {
      if (globMatch(glob, extension)) {
        ext = file;
        return 'stop';
      }
    });
    return "./img/file_types/" + ext + ".svg";
  };

  Items.zoom = function(zoomIn) {
    var value;
    if (typeof zoomIn === 'string') {
      zoomIn = zoomIn === 'in';
    }
    if (zoomIn === true) {
      value = parseInt(this.$items.attr('data-zoom')) + 1;
      if (value <= parseInt(this.$items.attr('data-zoom-max'))) {
        return this.$items.attr('data-zoom', value);
      }
    } else {
      value = parseInt(this.$items.attr('data-zoom')) - 1;
      if (value >= parseInt(this.$items.attr('data-zoom-min'))) {
        return this.$items.attr('data-zoom', value);
      }
    }
  };

  Items.loadItems = function(path) {
    var done, fail;
    done = function(mess, textStatus, jqXHR) {
      var contentType, dataForEvent;
      contentType = jqXHR.getResponseHeader('content-type');
      if (contentType.indexOf('application/json') >= 0) {
        dataForEvent = {};
        if (Object.keys(mess.files).length > 0) {
          this.files = mess.files;
          dataForEvent.files = copyObject(this.files);
        } else {
          this.files = dataForEvent.files = null;
        }
        if (Object.keys(mess.folders).length > 0) {
          this.folders = mess.folders;
          dataForEvent.folders = copyObject(this.folders);
        } else {
          this.folders = dataForEvent.folders = null;
        }
        EM.fire('got-items', dataForEvent);
        return this.render({
          files: this.files,
          folders: this.folders,
          type: 'files and folders'
        });
      } else if (contentType.indexOf('text/plain') >= 0) {
        return this.render({
          content: mess,
          type: 'code'
        });
      } else if (contentType.indexOf('image/png') >= 0) {
        return this.render({
          path: Path.path,
          type: 'image'
        });
      } else {
        alert("Unknown content-type: '" + (jqXHR.getResponseHeader('content-type')) + "'!");
        console.error("Unknown content-type: '" + (jqXHR.getResponseHeader('content-type')) + "'!");
        console.log(jqXHR.getAllResponseHeaders());
        return console.log(mess);
      }
    };
    fail = function(jqXHR, textStatus, errorThrown) {
      alert('Fail on loading items!\n\n' + jqXHR.responseText);
      console.error('Fail on loading items:', textStatus.wrap());
      console.info(jqXHR.getAllResponseHeaders());
      return console.info(jqXHR.responseText);
    };
    path = path || Path.path;
    return $.ajax({
      url: "server.php",
      method: "GET",
      data: {
        path: path,
        noticer: 'index'
      }
    }).done(done.bind(this)).fail(fail.bind(this));
  };

  Items.bindEvent = function() {
    var checkZoom, normalRender, renderSearch;
    EM.on('navigate', this.loadItems.bind(this));
    renderSearch = function(mess) {
      return this.render({
        type: 'files and folders',
        files: mess.files,
        folders: mess.folders,
        isSearch: true,
        animate: false
      });
    };
    EM.on('search', renderSearch.bind(this));
    normalRender = function() {
      return this.render({
        type: 'files and folders',
        files: this.files,
        folders: this.folders,
        animate: false
      });
    };
    EM.on('empty-search', normalRender.bind(this));
    checkZoom = function(e) {
      if (e.ctrlKey) {
        if (e.originalEvent.deltaY < 0) {
          this.zoom('in');
        } else {
          this.zoom('out');
        }
        return e.preventDefault();
      }
    };
    return $(document.body).bind('wheel', checkZoom.bind(this));
  };

  Items.render = function(kwargs) {
    var $newItems, _this, code, ext, filesIter, foldersIter, html, language, obj, showNewItems, templateData, totalAnimationTime;
    if (kwargs == null) {
      kwargs = {};
    }
    if (kwargs.animate === void 0) {
      kwargs.animate = true;
    }
    if (kwargs.type === void 0) {
      return console.error("Don't know the type, impossible to render!");
    }
    if (kwargs.type === 'files and folders') {
      if (kwargs.files === void 0 || kwargs.folders === void 0) {
        return console.error('Files or folders are undefined. UNACCEPTABLE!');
      }
      templateData = {
        files: [],
        folders: []
      };
      filesIter = function(file, val) {
        var checker, fileData, htmlName, isImage;
        fileData = {
          name: file,
          path: Path.join(file)
        };
        if (kwargs.isSearch === true) {
          isImage = val[0], htmlName = val[1];
          fileData.name = htmlName;
        } else {
          isImage = val;
        }
        if (isImage) {
          fileData.icon = fileData.path;
        } else {
          fileData.icon = this.getIconForFile(Path.extension(fileData.path));
        }
        if (any((function() {
          var i, len, ref, results;
          ref = CONFIG.hidden_files;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            checker = ref[i];
            results.push(globMatch(checker, file));
          }
          return results;
        })())) {
          fileData.isHidden = true;
        } else {
          fileData.isHidden = false;
        }
        return templateData.files.push(fileData);
      };
      foldersIter = function(folder, val) {
        var checker, folderData, hasIndexOrExt, htmlName;
        folderData = {
          name: folder,
          path: Path.join(folder)
        };
        if (kwargs.isSearch === true) {
          hasIndexOrExt = val[0], htmlName = val[1];
          folderData.name = htmlName;
        } else {
          hasIndexOrExt = val;
        }
        if (typeof hasIndexOrExt === 'string') {
          folderData.icon = Path.join(folder + '/screenshot.' + hasIndexOrExt);
        } else if (hasIndexOrExt) {
          folderData.icon = './img/folder-index.svg';
        } else {
          folderData.icon = './img/folder.svg';
        }
        if (any((function() {
          var i, len, ref, results;
          ref = CONFIG.hidden_folders;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            checker = ref[i];
            results.push(globMatch(checker, folder));
          }
          return results;
        })())) {
          folderData.isHidden = true;
        } else {
          folderData.isHidden = false;
        }
        return templateData.folders.push(folderData);
      };
      if (kwargs.files !== null) {
        forEach(kwargs.files, filesIter.bind(this));
      }
      if (kwargs.folders !== null) {
        forEach(kwargs.folders, foldersIter.bind(this));
      }
      if (kwargs.files === null && kwargs.folders === null) {
        console.log('empty!');
      }
    } else if (kwargs.type === 'code') {
      if (Path.extension() !== 'txt') {
        ext = Path.extension();
        if (ext.indexOf('php') >= 0) {
          ext = 'html';
        }
        if (hljs.getLanguage(ext)) {
          obj = hljs.highlight(ext, kwargs.content);
          code = obj.value.replace(/\t/g, '    ');
          language = obj.language;
        } else {
          code = kwargs.content;
          language = 'unknown';
        }
      } else {
        code = kwargs.content;
        language = 'plain';
      }
      templateData = {
        code: code,
        language: language
      };
    } else if (kwargs.type === 'image') {
      if (kwargs.path === void 0) {
        return console.error('No path for image!');
      }
      templateData = {
        path: kwargs.path
      };
    } else {
      console.error("Unknown type '" + kwargs.type + "'! Impossible to render.");
    }
    html = Mustache.render(this.templates[kwargs.type], templateData);
    if (kwargs.animate === true) {
      totalAnimationTime = CONFIG.browsing_animation_total_time;
      $newItems = this.$items.clone();
      $newItems.html(html);
      showNewItems = function(_this, $newItems) {
        return $newItems.animate({
          opacity: 1,
          left: 10,
          right: 0
        }, totalAnimationTime / 2, function() {
          _this.$items = $newItems;
          return EM.fire('items-var-changed', _this.$items);
        });
      };
      $newItems.css({
        opacity: 0,
        left: 50,
        right: -50
      });
      _this = this;
      return this.$items.after($newItems).animate({
        opacity: 0,
        left: -50,
        right: 50
      }, totalAnimationTime / 2, function() {
        $(this).remove();
        return showNewItems(_this, $newItems);
      });
    } else {
      return this.$items.html(html);
    }
  };

  return Items;

})();
