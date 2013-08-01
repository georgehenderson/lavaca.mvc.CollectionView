define(function(require) {

  var View = require('lavaca/mvc/View');
  require('rdust!templates/person');

  /**
   * Example view type
   * @class app.ui.views.PersonView
   * @extends lavaca.mvc.View
   */
  var PersonView = View.extend(function() {
    View.apply(this, arguments);
    this.render();
  }, {
    /**
     * The name of the template used by the view
     * @property {String} template
     * @default 'example'
     */
    template: 'templates/person',
    /**
     * A class name added to the view container
     * @property {String} className
     * @default 'example'
     */
    className: 'person new',
    onRenderSuccess: function() {
      View.prototype.onRenderSuccess.apply(this, arguments);
      setTimeout(function() { this.el.removeClass('new'); }.bind(this), 1000);
    }

  });

  return PersonView;

});
