define(function(require) {

  var CollectionView = require('app/ui/views/CollectionView'),
      $ = require('jquery'),
      TableHeadView = require('app/ui/views/TableHeadView');

  /**
   * Example view type
   * @class app.ui.views.PersonCollectionView
   * @extends lavaca.mvc.View
   */
  var PersonCollectionView = CollectionView.extend({
    TView: TableHeadView,
    itemEl: function() {
      return $('<th/>');
    }
  });

  return PersonCollectionView;

});
