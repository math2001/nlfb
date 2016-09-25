var Search;

Search = (function() {
  function Search() {}

  Search.init = function(em, path) {
    this.em = em;
    this.path = path;
    this.$el = $('#search');
    this.bindEvents();
    return this.bindDOM();
  };

  Search.advancedResearch = function(pattern, arr) {
    var el, highlightLetters, indexes, j, len, match, results;
    match = function(text, pattern) {
      var index, indexes, j, lastIndex, len, letter;
      lastIndex = -1;
      indexes = [];
      for (j = 0, len = pattern.length; j < len; j++) {
        letter = pattern[j];
        index = text.indexOf(letter, lastIndex + 1);
        if (index === -1) {
          return false;
        }
        lastIndex = index;
        indexes.push(index);
      }
      return indexes;
    };
    highlightLetters = function(word, indexes) {
      var i, j, len, letter, newWord;
      newWord = '';
      for (i = j = 0, len = word.length; j < len; i = ++j) {
        letter = word[i];
        if (indexes.indexOf(i) !== -1) {
          newWord += "<b>" + letter + "</b>";
        } else {
          newWord += letter;
        }
      }
      return newWord;
    };
    results = {};
    for (j = 0, len = arr.length; j < len; j++) {
      el = arr[j];
      indexes = match(el, pattern);
      if (indexes !== false) {
        results[el] = highlightLetters(el, indexes);
      }
    }
    return results;
  };

  Search.bindEvents = function() {
    var getItems;
    getItems = function(mess) {
      this.files = mess.files;
      this.folders = mess.folders;
      return console.log('(bindEvents) get items', this.files, this.folders);
    };
    return this.em.on('got-items', getItems.bind(this));
  };

  Search.bindDOM = function() {
    var addValue, search;
    addValue = function(obj1, obj2) {
      var add, obj;
      obj = {};
      add = function(key, val) {
        if (!obj2[key]) {
          return null;
        }
        val = [val];
        val.push(obj2[key]);
        return obj[key] = val;
      };
      forEach(obj1, add);
      return obj;
    };
    search = function(e) {
      var pattern, selectedFiles, selectedFolders;
      if ((pattern = $(this).val()) === '') {
        e.data["this"].em.fire('empty-search', null);
        return false;
      }
      if (e.data["this"].files !== null) {
        selectedFiles = e.data["this"].advancedResearch(pattern, Object.keys(e.data["this"].files));
        selectedFiles = addValue(e.data["this"].files, selectedFiles);
      } else {
        selectedFiles = {};
      }
      if (e.data["this"].folders !== null) {
        selectedFolders = e.data["this"].advancedResearch(pattern, Object.keys(e.data["this"].folders));
        selectedFolders = addValue(e.data["this"].folders, selectedFolders);
      } else {
        selectedFolders = {};
      }

      /*
      				selectedFiles = {
      					name: [isImage, htmlName],
      					name: [isImage, htmlName],
      				}
      				selectedFolders = {
      					name: [hasIndex, htmlName],
      					name: [hasIndex, htmlName],
      				}
       */
      return e.data["this"].em.fire('search', {
        files: selectedFiles,
        folders: selectedFolders
      });
    };
    return this.$el.bind('input', {
      "this": this
    }, search);
  };

  return Search;

})();
