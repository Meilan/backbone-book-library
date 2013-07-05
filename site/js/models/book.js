var app = app || {};

app.Book = Backbone.Model.extend({
	defaults: {
		coverImage: 'img/no-image-clickgwalior.jpg',
		title: 'No title',
		author: 'Unknown',
		releaseDate: 'Unknown',
		keywords: 'none'
	},

	parse: function( response ){
		response.id = response._id;
		return response;
	}
});