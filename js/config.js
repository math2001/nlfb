var Config;

Config = (function() {
  function Config() {}

  Config.init = function(config) {
    var default_config;
    if (config == null) {
      config = false;
    }
    default_config = {
      totalSlideTime: 500,
      localhost: 'localhost',
      imgExt: ['jpg', 'png', 'bmp', 'jpeg', 'gif', 'ico', 'svg'],
      emptyEditPathValueOnHide: true,
      iProjects: ['_nlfb'],
      iFolders: ['.git'],
      iFiles: []
    };
    return window._config = config ? $.extend(default_config, config) : default_config;
  };

  Config.get = function(key, def) {
    if (def == null) {
      def = void 0;
    }
    if (window._config[key] !== void 0) {
      return window._config[key];
    } else if (def !== void 0) {
      return def;
    } else {
      console.error("config: the key " + key + " is unset!");
      return void 0;
    }
  };

  return Config;

})();
