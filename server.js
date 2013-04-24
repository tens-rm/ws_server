var sys  = require('sys')
var http = require('http');
var url  = require('url');
var query= require('querystring');

var mongoose = require('mongoose');

// �X�L�[�}��`
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

				Users.find( function( err, result ){
					if( err ) console.log( err );
					console.log( 'item num -> ' + result.length );
					for( var i=0; i<result.length; ++i ) {
						console.log( result[ i ] );
					}
					res.end();
				});
		} );
	}
	else
	if( req.method=='GET' )
	{
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write('GET Method');
		res.end();
		console.log( 'GET Method' );
	}
	else
	{
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write('Not POST or GET Method');
		res.end();
	}

}).listen(8000);
