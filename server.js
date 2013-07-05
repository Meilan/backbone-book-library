
/*

// Module dependencies.
var application_root = __dirname,
	express = require( 'express' ), //Web framework
	path = require( 'path' ), //Utilities for dealing with file paths
	mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();

//Connect to database
mongoose.connect( 'mongodb://localhost/library_database' );

//Configure server
app.configure( function(){
	//parses request body and populates request.body
	app.use( express.bodyParser() );

	//checks request.body for HTTP method overrides
	app.use( express.methodOverride() );

	//perform route lookup based on URL and HTTP method
	app.use( app.router );

	//where to serve static content
	app.use( express.static( path.join(application_root, 'site') ) );

	//show all errors in development
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }) );
});

//Routes

//Schemas
var Book = new mongoose.Schema({
	title: String,
	author: String,
	releaseDate: Date
});

//Models
var BookModel = mongoose.model( 'Book', Book );


app.get( '/api', function( request, response ) {
	response.send( 'Library API is running' );
});

//Get a list of all books
app.get( '/api/books', function( request, response ) {
	return BookModel.find( function( err, books ) {
		if( !err ) {
			return response.send( books );
		} else {
			return console.log( err );
		}
	});
});

//Get a single book by id
app.get( '/api/books/:id', function( request, response ) {
	return BookModel.findById( request.params.id, function( err, book ) {
		if( !err ) {
			return response.send( book );
		} else {
			return console.log( err );
		}
	});
});

app.post( '/api/books', function( request, response){
	var book = new BookModel({
		title: request.body.title,
		author: request.body.author,
		releaseDate: request.body.releaseDate
	})

	book.save( function( err ){
		if( !err ){
			return console.log('created');
		} else {
			return console.log( err );
		}
	});

	return response.send( book );

});

//Update a book
app.put( '/api/books/:id', function( request, response ) {
	console.log( 'Updating book ' + request.body.title );
	return BookModel.findById( request.params.id, function( err, book ) {
		book.title = request.body.title;
		book.author = request.body.author;
		book.releaseDate = request.body.releaseDate;
		book.keywords = request.body.keywords;

		return book.save( function( err ) {
			if( !err ) {
				console.log( 'book updated' );
			} else {
				console.log( err );
			}
			return response.send( book );
		});
	});
});

/*

jQuery.post( '/api/books', {
	'title': 'Meilan Lin',
	'author': 'Meilan',
	'releaseDate': new Date( 2013, 6, 28 ).getTime()
}, function( data, textStatus, jqXHR ){
	console.log( 'Post response:');
	console.dir( data );
	console.log( textStatus );
	console.dir( jqXHR );
});


jQuery.get( '/api/books/51cc906d1173e20113000002', function( data, textStatus, jqXHR ){
	console.log( 'Get response:' );
	console.dir( data );
	console.log( textStatus );
	console.dir( jqXHR );
});


jQuery.ajax({
	url: '/api/books/51cc906d1173e20113000002',
	type: 'PUT',
	data: {
		'title': 'Lan',
		'author': 'Me',
		'releaseDate': new Date( 2010, 4, 1).getTime()
	},
	success: function( data, textStatus, jqXHR ){
		console.log( 'Post response:' );
		console.dir( data );
		console.log( textStatus );
		console.dir( jqXHR );
	}
});

jQuery.ajax({
	url: '/api/books/51cc947a9ba55e5113000002',
	type: 'DELETE',
	success: function( data, textStatus, jqXHR ){
		console.log( 'Post response:' );
		console.dir( data );
		console.log( textStatus );
		console.log( jqXHR );
	} 
});

jQuery.post( '/api/books', {
	'title': 'Secrets of the JavaScript Ninja',
	'author': 'John Resig',
	'releaseDate': new Date( 2008, 3, 12 ).getTime(),
	'keywords': [
		{ 'keyword': 'JavaScript' },
		{ 'keyword': 'Reference' }
	]
}, function( data, textStatus, jqXHR ){
		console.log( 'Post response:' );
		console.dir( data );
		console.log( textStatus );
		console.dir( jqXHR );
});

*/

//Start server

/*
var port = 4711;
app.listen( port, function(){
	console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});




*/





// Module dependencies.
var application_root = __dirname,
	express = require( 'express' ), //Web framework
	path = require( 'path' ), //Utilities for dealing with file paths
	mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();

//Connect to database
mongoose.connect( 'mongodb://localhost/library_database' );

//Schemas
var Keywords = new mongoose.Schema({
	keyword: String
});

var Book = new mongoose.Schema({
	coverImage: String,
	title: String,
	author: String,
	releaseDate: Date,
	keywords: [ Keywords ]
});

//Models
var BookModel = mongoose.model( 'Book', Book );

// Configure server
app.configure( function() {
	//parses request body and populates request.body
	app.use( express.bodyParser() );

	//checks request.body for HTTP method overrides
	app.use( express.methodOverride() );

	//perform route lookup based on url and HTTP method
	app.use( app.router );

	//Where to serve static content
	app.use( express.static( path.join( application_root, 'site') ) );

	//Show all errors in development
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
app.get( '/api', function( request, response ) {
	response.send( 'Library API is running' );
});

//Get a list of all books
app.get( '/api/books', function( request, response ){

		return BookModel.find( function( err, books ) {
		if( !err ) {
			return response.send( books );
			response.send( 'books' );

		} else {
			return console.log( err );
			response.send( 'error' );
		}
	});
});

//Get a single book by id
app.get( '/api/books/:id', function( request, response ) {
	return BookModel.findById( request.params.id, function( err, book ) {
		if( !err ) {
			return response.send( book );
		} else {
			return console.log( err );
		}
	});
});

//Insert a new book
app.post( '/api/books', function( request, response ) {
	var book = new BookModel({
		coverImage: request.body.coverImage,
		title: request.body.title,
		author: request.body.author,
		releaseDate: request.body.releaseDate,
		keywords: request.body.keywords
	});
	book.save( function( err ) {
		if( !err ) {
			return console.log( 'created' );
		} else {
			return console.log( err );
		}
	});
	return response.send( book );
});

//Update a book
app.put( '/api/books/:id', function( request, response ) {
	console.log( 'Updating book ' + request.body.title );
	return BookModel.findById( request.params.id, function( err, book ) {
		book.coverImage = request.body.coverImage;
		book.title = request.body.title;
		book.author = request.body.author;
		book.releaseDate = request.body.releaseDate;
		book.keywords = request.body.keywords;

		return book.save( function( err ) {
			if( !err ) {
				console.log( 'book updated' );
			} else {
				console.log( err );
			}
			return response.send( book );
		});
	});
});

//Delete a book
app.delete( '/api/books/:id', function( request, response ) {
	console.log( 'Deleting book with id: ' + request.params.id );
	return BookModel.findById( request.params.id, function( err, book ) {
		return book.remove( function( err ) {
			if( !err ) {
				console.log( 'Book removed' );
				return response.send( '' );
			} else {
				console.log( err );
			}
		});
	});
});

//Start server
var port = 4711;
app.listen( port, function() {
	console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});






























