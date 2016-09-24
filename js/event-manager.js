var EM;

EM = (function() {
  function EM() {}

  EM.listeners = {};

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
    var fn, i, len, ref;
    ref = this.listeners[eventName];
    for (i = 0, len = ref.length; i < len; i++) {
      fn = ref[i];
      fn(data);
    }
    return this;
  };

  return EM;

})();
