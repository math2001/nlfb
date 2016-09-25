var Breadcrumbs;

Breadcrumbs = (function() {
  function Breadcrumbs() {}

  Breadcrumbs.init = function(em, path1) {
    this.em = em;
    this.path = path1;
    this.$el = $('#breadcrumbs');
    this.template = $('#breadcrumbs-template').html();
    this.render();
    return this.bindEvents();
  };

  Breadcrumbs.render = function(path) {
    var bit, data, i, j, len;
    if (path == null) {
      path = this.path.path;
    }
    path = path.split('/').remove('');
    data = {
      splitedPath: [
        {
          name: 'Localhost',
          path: '/'
        }
      ]
    };
    for (i = j = 0, len = path.length; j < len; i = ++j) {
      bit = path[i];
      data.splitedPath.push({
        name: bit,
        path: '/' + path.slice(0, i + 1).join('/')
      });
    }
    return this.$el.html(Mustache.render(this.template, data));
  };

  Breadcrumbs.bindEvents = function() {
    return this.em.on('navigate', this.render.bind(this));
  };

  return Breadcrumbs;

})();
