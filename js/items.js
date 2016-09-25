var Items;

Items = (function() {
  function Items(path1, em) {
    this.path = path1;
    this.em = em;
    this.files = {};
    this.folders = {};
    this.$items = $('.items');
    this.template = $('#items-template').html();
    this.bindEvent();
  }

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

      } else {

      }
    };
    fail = function(jqXHR, textStatus, errorThrown) {
      alert('Fail on loading!');
      console.error('Fail on loading:', textStatus);
      console.warn(jqXHR.getAllResponseHeaders());
      return console.warn(jqXHR.responseText);
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
        isSearch: true
      });
    };
    this.em.on('search', renderSearch.bind(this));
    normalRender = function() {
      return this.render({
        type: 'files and folders',
        files: this.files,
        folders: this.folders
      });
    };
    return this.em.on('empty-search', normalRender.bind(this));
  };

  Items.prototype.render = function(kwargs) {
    var filesIter, foldersIter, templateData;
    if (kwargs == null) {
      kwargs = {};
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
        var fileData, htmlName, isImage;
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
          fileData.icon = './img/file_types/default.svg';
        }
        return templateData.files.push(fileData);
      };
      foldersIter = function(folder, val) {
        var folderData, hasIndex, htmlName;
        folderData = {
          name: folder,
          path: this.path.join(folder)
        };
        if (kwargs.isSearch === true) {
          hasIndex = val[0], htmlName = val[1];
          folderData.name = htmlName;
        } else {
          hasIndex = val;
        }
        if (hasIndex) {
          folderData.icon = './img/folder-index.svg';
        } else {
          folderData.icon = './img/folder.svg';
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
    } else {
      console.error("Unknown type '" + kwargs.type + "'! Impossible to render.");
    }
    return this.$items.html(Mustache.render(this.template, templateData));
  };

  return Items;

})();
