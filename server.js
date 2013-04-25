var sys  = require('sys')
var http = require('http');
var url  = require('url');
var query= require('querystring');

var mongoose = require('mongoose');

// スキーマ定義
var users= new mongoose.Schema({
	name		: String
	,passwd		: String
});
var Users = mongoose.model( 'users', users );

mongoose.connect( 'mongodb://localhost/test' );

http.createServer(function(req,res){

	if( req.method=='POST' )
	{
		var body = '';
		req.on( 'data', function(data){ body += data; } );
		req.on( 'end', function() {
				var POST  = query.parse( body );
				console.log( POST );

				Users.find( POST, function( err, result ){
					if( err ) console.log( err );
					console.log( 'item num -> ' + result.length );
					for( var i=0; i<result.length; ++i ) {
						console.log( result[ i ] );
					}
					res.writeHead(200, {"Content-Type": "text/plain"});
					res.write( result + '');
					res.end();
				});
		} );
	}
	else
	if( req.method=='GET' )
	{
		var params = url.parse( req.url, true );
		console.log( params );
		res.end();
	}
	else
	{
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write('Not POST or GET Method');
		res.end();
	}

}).listen(8000);
