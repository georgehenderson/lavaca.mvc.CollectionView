define(function(require) {

  var BaseView = require('./BaseView'),
      PersonCollectionView = require('app/ui/views/PersonCollectionView'),
      TableHeaderCollectionView = require('app/ui/views/TableHeaderCollectionView'),
      $ = require('jquery');
  require('rdust!templates/example');

  /**
   * Example view type
   * @class app.ui.views.ExampleView
   * @extends app.ui.views.BaseView
   */
  var ExampleView = BaseView.extend(function() {
    BaseView.apply(this, arguments);
    this.mapChildView({
      '.people tbody': {
        TView: PersonCollectionView,
        model: this.model
      },
      '.people thead tr': {
        TView: TableHeaderCollectionView,
        model: this.model.get('header')
      }
    });
    this.mapEvent({
      'select': {
        change: this.onSelectChange.bind(this)
      },
      'input': {
        keydown: this.onInputKeydown.bind(this)
      },
      '.pagination li': {
        tap: this.onTapPagination.bind(this)
      }
    });
    this.model.on('change', 'currentPage', function() {
      this.redraw('.pagination');
    }.bind(this));
  }, {
    /**
     * The name of the template used by the view
     * @property {String} template
     * @default 'example'
     */
    template: 'templates/example',
    /**
     * A class name added to the view container
     * @property {String} className
     * @default 'example'
     */
    className: 'example',
    onTapPagination: function(e) {
      var el = $(e.currentTarget),
          page = el.data('page');
      this.model.set('currentPage', parseInt(page, 10));
    },
    onSelectChange: function(e) {
      var val = $(e.currentTarget).val();
      this.model.set('resultsPerPage', parseInt(val, 10));
      this.redraw('.pagination');
    },
    onInputKeydown: function(e) {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(function() {
        var val = $(e.currentTarget).val();
        this.model.set('search', val);
      }.bind(this), 200);
    }

  });

  return ExampleView;

});
