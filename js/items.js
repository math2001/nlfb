var Items;

Items = (function() {
  function Items(path1, em) {
    this.path = path1;
    this.em = em;
    this.files = {};
    this.folders = {};
    this.$items = $('.items');
    this.templates = {
      'files and folders': $('#items-template-faf').html(),
      'code': $('#items-template-code').html(),
      'image': $('#items-template-image').html()
    };
    this.bindEvent();
  }

  Items.prototype.getIconForFile = function(extension) {
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

  Items.prototype.loadItems = function(path) {
    var done, fail;
    done = function(mess, textStatus, jqXHR) {
      var dataForEvent;
      if (jqXHR.getResponseHeader('content-type') === 'application/json') {
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
        this.em.fire('got-items', dataForEvent);
        return this.render({
          files: this.files,
          folders: this.folders,
          type: 'files and folders'
        });
      } else if (jqXHR.getResponseHeader('content-type') === 'text/plain') {
        return this.render({
          content: mess,
          type: 'code'
        });
      } else if (jqXHR.getResponseHeader('content-type') === 'image/png') {
        return this.render({
          path: this.path.path,
          type: 'image'
        });
      } else {

      }
    };
    fail = function(jqXHR, textStatus, errorThrown) {
      alert('Fail on loading items!\n\n' + jqXHR.responseText);
      console.error('Fail on loading items:', textStatus.wrap());
      console.info(jqXHR.getAllResponseHeaders());
      return console.info(jqXHR.responseText);
    };
    path = path || this.path.path;
    return $.ajax({
      url: "getitems.php",
      method: "GET",
      data: {
        path: path,
        noticer: 'index'
      }
    }).done(done.bind(this)).fail(fail.bind(this));
  };

  Items.prototype.bindEvent = function() {
    var normalRender, renderSearch;
    this.em.on('navigate', this.loadItems.bind(this));
    renderSearch = function(mess) {
      return this.render({
        type: 'files and folders',
        files: mess.files,
        folders: mess.folders,
        isSearch: true,
        animate: false
      });
    };
    this.em.on('search', renderSearch.bind(this));
    normalRender = function() {
      return this.render({
        type: 'files and folders',
        files: this.files,
        folders: this.folders,
        animate: false
      });
    };
    return this.em.on('empty-search', normalRender.bind(this));
  };

  Items.prototype.render = function(kwargs) {
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
          path: this.path.join(file)
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
          fileData.icon = this.getIconForFile(this.path.extension(fileData.path));
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
          path: this.path.join(folder)
        };
        if (kwargs.isSearch === true) {
          hasIndexOrExt = val[0], htmlName = val[1];
          folderData.name = htmlName;
        } else {
          hasIndexOrExt = val;
        }
        if (typeof hasIndexOrExt === 'string') {
          console.log(folder, this.path.join(folder + '/screenshot.' + hasIndexOrExt));
          folderData.icon = this.path.join(folder + '/screenshot.' + hasIndexOrExt);
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
      if (this.path.extension() !== 'txt') {
        ext = this.path.extension();
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
          return _this.em.fire('items-var-changed', _this.$items);
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
