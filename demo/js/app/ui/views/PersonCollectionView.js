define(function(require) {

  var CollectionView = require('app/ui/views/CollectionView'),
      $ = require('jquery'),
      PersonView = require('app/ui/views/PersonView');

  /**
   * Example view type
   * @class app.ui.views.PersonCollectionView
   * @extends lavaca.mvc.View
   */
  var PersonCollectionView = CollectionView.extend(function() {
    CollectionView.apply(this, arguments);
    this.model.on('change', this.onItemEvent.bind(this));
  }, {
    TView: PersonView,
    itemEl: function() {
      return $('<tr/>');
    },
    modelFilter: function(i, model) {
      var search = this.model.get('search'),
          resultsPerPage,
          currentPage;
      if (search) {
        return model.get('player').toLowerCase().indexOf(search.toLowerCase()) > -1;
      } else {
        resultsPerPage = this.model.get('resultsPerPage');
        currentPage = this.model.get('currentPage');
        return i >= (currentPage - 1) * resultsPerPage && i < currentPage * resultsPerPage;
      }
    }
  });

  return PersonCollectionView;

});
