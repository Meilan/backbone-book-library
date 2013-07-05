var app = app || {};

app.library = Backbone.Collection.extend({
	model: app.Book,
	url: '/api/books'
});