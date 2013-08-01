define(function(require) {

  var Collection = require('lavaca/mvc/Collection');

  var PeopleCollection = Collection.extend(function() {
    Collection.apply(this, arguments);
    this.apply({
      resultsPerPage: 25,
      currentPage: 1,
      pages: function() {
        var numberOfPages = Math.ceil(this.count() / this.get('resultsPerPage')),
            pages = [];
        for (var i = 0; i < numberOfPages; i++) {
          pages.push(i+1);
        }
        return pages;
      }
    }); 
  }, {
    url: '/mock/people.json',
    onFetchSuccess: function(response) {
      Collection.prototype.onFetchSuccess.apply(this, arguments);
      var header = new Collection();
      ['rank', 'player', 'country', 'averagePoints', 'totalPoints', 'totalEvents'].forEach(function(item) {
        var text = item.replace( /([A-Z])/g, ' $1');
        text = text.charAt(0).toUpperCase() + text.slice(1);
        header.add({
          filter: item,
          displayName: text,
          isDescending: item === 'averagePoints',
          currentFilter: 'averagePoints'
        });
      });
      this.set('header', header);
      this.get('header').on('changeItem', function(e) {
        if (e.attribute === 'isDescending') {
          var filter = e.model.get('filter');
          e.currentTarget.set('currentFilter', filter);
          this.set('currentPage', 1);
          this.sortByFilter(filter, e.model.get('isDescending'));
        }
      }.bind(this));
    },
    sortByFilter: function(filter, isDescending) {
      this.sort(filter, isDescending);
    }
  });

  return PeopleCollection;
  
});