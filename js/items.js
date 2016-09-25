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
        return this.render(this.files, this.folders);
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
      return this.render(mess.files, mess.folders, 'search');
    };
    this.em.on('search', renderSearch.bind(this));
    normalRender = function() {
      return this.render(this.files, this.folders);
    };
    return this.em.on('empty-search', normalRender.bind(this));
  };

  Items.prototype.render = function(files, folders, type) {
    var data, filesIter, foldersIter;
    if (type == null) {
      type = null;
    }
    data = {
      files: [],
      folders: []
    };
    filesIter = function(file, val) {
      var fileData, htmlName, isImage;
      fileData = {
        name: file,
        path: this.path.join(file)
      };
      if (type === 'search') {
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
      return data.files.push(fileData);
    };
    foldersIter = function(folder, val) {
      var folderData, hasIndex, htmlName;
      folderData = {
        name: folder,
        path: this.path.join(folder)
      };
      if (type === 'search') {
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
      return data.folders.push(folderData);
    };
    if (files !== null) {
      forEach(files, filesIter.bind(this));
    }
    if (folders !== null) {
      forEach(folders, foldersIter.bind(this));
    }
    if (files === null && folders === null) {
      console.log('empty!');
    }
    return this.$items.html(Mustache.render(this.template, data));
  };

  return Items;

})();
