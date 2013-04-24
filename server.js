var sys  = require('sys')
var http = require('http');
var url  = require('url');
var query= require('querystring');

var mongoose = require('mongoose');
var db       = mongoose.createConnection('mongodb://localhost/test');
var user_data= new mongoose.Schema({
	id			: String,
	pss			: String,
});
var users    = db.model( 'user_data', user_data );

http.createServer(function(req,res){

	if( req.method=='POST' )
	{
		var body = '';
		req.on( 'data', function(data){ body += data; } );
		req.on( 'end', function() {
				var POST  = query.parse( body );
				console.log( POST );

				users.find( function( err, mice ){
					if( err ) console.log( err );
					res.write( mice );
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
