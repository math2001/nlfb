var Items;

Items = (function() {
  function Items(path, em) {
    this.path = path;
    this.em = em;
    this.files = [];
    this.folders = [];
    this.$items = $('.items');
    this.template = $('#items-template').html();
    this.loadItems();
  }

  Items.prototype.loadItems = function() {
    return $.ajax({
      url: "getitems.php",
      method: "GET",
      data: {
        path: Path.path,
        noticer: 'index'
      }
    }).done(this.done.bind(this)).fail(this.fail);
  };

  Items.prototype.render = function(files, folders) {
    var data, file, folder, i, j, len, len1, ref, ref1;
    data = {
      files: [],
      folders: []
    };
    console.log(files || this.files);
    ref = files || this.files;
    for (i = 0, len = ref.length; i < len; i++) {
      file = ref[i];
      console.log(file);
      data.files.push({
        name: file,
        path: Path.join(file),
        icon: "./img/file_types/default.svg"
      });
    }
    ref1 = folders || this.folders;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      folder = ref1[j];
      data.folders.push({
        name: folder,
        path: Path.join(folder),
        icon: './img/folder.svg'
      });
    }
    console.log(data);
    return this.$items.html(Mustache.render(this.template, data));
  };

  Items.prototype.done = function(mess, textStatus, jqXHR) {
    this.files = mess.files;
    this.folders = mess.folders;
    return this.render();
  };

  return Items;

})();
