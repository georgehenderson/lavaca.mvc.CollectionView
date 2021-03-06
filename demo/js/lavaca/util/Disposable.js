define(function(require) {

  var extend = require('./extend');

  function _disposeOf(obj) {
    var n,
        o,
        i;
    for (n in obj) {
      if (obj.hasOwnProperty(n)) {
        o = obj[n];
          if (o) {
            if (typeof o === 'object' && typeof o.dispose === 'function') {
              o.dispose();
            } else if (o instanceof Array) {
              for (i = o.length - 1; i > -1; i--) {
                  if (o[i] && typeof o[i].dispose === 'function') {
                    o[i].dispose();
                  } else {
                    _disposeOf(o[i]);
                  }
                }
            }
          }
        }
    }
  }

  /**
   * Abstract type for types that need to ready themselves for GC
   * @class lavaca.util.Disposable
   * @constructor
   *
   */
  var Disposable = extend({
    /**
     * Readies the object to be garbage collected
     * @method dispose
     *
     */
    dispose: function() {
        _disposeOf(this);
    }
  });

  return Disposable;

});