var Items;

Items = (function() {
  function Items(em) {
    this.em = em;
    this.files = ['a test'];
    this.folders = ['folder1', 'folder2', '_nlfb'];
    this.$items = $('.items');
    this.template = $('#items-template').html();
    this.render();
  }

  Items.prototype.render = function() {
    var data, file, folder, i, j, len, len1, ref, ref1;
    data = {
      files: [],
      folders: []
    };
    ref = this.files;
    for (i = 0, len = ref.length; i < len; i++) {
      file = ref[i];
      data.files.push({
        name: file,
        path: Path.join(file),
        icon: "./img/file_types/default.svg"
      });
    }
    ref1 = this.folders;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      folder = ref1[j];
      data.folders.push({
        name: folder,
        path: Path.join(folder),
        icon: './img/folder.svg'
      });
    }
    return this.$items.html(Mustache.render(this.template, data));
  };

  return Items;

})();
