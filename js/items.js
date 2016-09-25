var Items;

Items = (function() {
  function Items(path1, em) {
    this.path = path1;
    this.em = em;
    this.files = {};
    this.folders = {};
    this.$items = $('.items');
    this.template = $('#items-template').html();
    this.loadItems();
    this.bindEvent();
  }

  Items.prototype.loadItems = function(path) {
    var done, fail;
    done = function(mess, textStatus, jqXHR) {
      if (jqXHR.getResponseHeader('content-type') === 'HTTP/1.0 404 Not Found') {
        alert('error on load file');
        console.log(jqXHR.getAllResponseHeaders());
      }
      this.files = mess.files;
      this.folders = mess.folders;
      return this.render();
    };
    fail = function(jqXHR, textStatus, errorThrown) {
      alert('Fail on loading!');
      return console.log(jqXHR.getAllResponseHeaders());
    };
    return $.ajax({
      url: "getitems.php",
      method: "GET",
      data: {
        path: path || this.path.path,
        noticer: 'index'
      }
    }).done(done.bind(this)).fail(fail.bind(this));
  };

  Items.prototype.bindEvent = function() {
    return this.em.on('navigate', this.loadItems.bind(this));
  };

  Items.prototype.render = function(files, folders) {
    var data, filesIter, foldersIter;
    data = {
      files: [],
      folders: []
    };
    filesIter = function(file, isImage) {
      var fileData;
      fileData = {
        name: file,
        path: this.path.join(file)
      };
      if (isImage) {
        fileData.icon = fileData.path;
      } else {
        fileData.icon = './img/file_types/default.svg';
      }
      return data.files.push(fileData);
    };
    foldersIter = function(folder, hasIndex) {
      var folderData;
      folderData = {
        name: folder,
        path: this.path.join(folder)
      };
      if (hasIndex) {
        folderData.icon = './img/folder-index.svg';
      } else {
        folderData.icon = './img/folder.svg';
      }
      return data.folders.push(folderData);
    };
    forEach(files || this.files, filesIter.bind(this));
    forEach(folders || this.folders, foldersIter.bind(this));
    return this.$items.html(Mustache.render(this.template, data));
  };

  return Items;

})();
