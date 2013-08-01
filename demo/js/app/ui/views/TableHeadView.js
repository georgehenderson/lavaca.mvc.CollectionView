define(function(require) {

  var View = require('lavaca/mvc/View'),
      $ = require('jquery');
  require('rdust!templates/table-head');

  /**
   * Example view type
   * @class app.ui.views.TableHeadView
   * @extends lavaca.mvc.View
   */
  var TableHeadView = View.extend(function() {
    View.apply(this, arguments);
    this.mapEvent({
      '[data-filter]': {
        click: this.onTap.bind(this)
      },
      model: {
        change: function() {
          this.redraw();
        }.bind(this)
      }
    });
    this.parentView.model.on('change', 'currentFilter', function(e) {
      this.model.set('currentFilter', e.value);
    }.bind(this));
    this.render();
  }, {
    /**
     * The name of the template used by the view
     * @property {String} template
     * @default 'example'
     */
    template: 'templates/table-head',
    /**
     * A class name added to the view container
     * @property {String} className
     * @default 'example'
     */
    className: 'table-head',
    onTap: function(e) {
      var previousDirection = this.model.get('isDescending'),
          filter = $(e.currentTarget).data('filter');
      this.model.apply({
        filter: filter,
        isDescending: !previousDirection
      });
    }

  });

  return TableHeadView;

});
