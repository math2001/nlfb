var EM;

EM = (function() {
  function EM() {}

  EM.listeners = {};

  EM.debug = false;

  EM.on = function(eventName, fn) {
    if (typeof this.listeners[eventName] === "undefined") {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(fn);
    return this;
  };

  EM.off = function(eventName, fnToRemove) {
    this.listeners[eventName].remove(fn);
    return this;
  };

  EM.emit = function(eventName, data) {
    var dataToRender, fn, i, len, ref;
    if (typeof this.listeners[eventName] === "undefined") {
      return console.error("Unknown event '" + eventName + "'");
    }
    if (typeof data === 'string') {
      dataToRender = data.wrap();
    } else {
      dataToRender = data;
    }
    if (this.debug) {
      console.info('emit', eventName.wrap(), 'with', dataToRender);
    }
    ref = this.listeners[eventName];
    for (i = 0, len = ref.length; i < len; i++) {
      fn = ref[i];
      fn(data);
    }
    return this;
  };

  EM.fire = function() {
    return this.emit.apply(this, arguments);
  };

  return EM;

})();
