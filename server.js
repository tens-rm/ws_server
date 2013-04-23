var sys  = require('sys')
var http = require('http');
var url  = require('url');
var query= require('querystring');

http.createServer(function(req,res){

	if( req.method=='POST' )
	{
		var body = '';
		req.on( 'data', function(data){ body += data; } );
		req.on( 'end', function() {
				var POST  = query.parse( body );
				console.log( POST );
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
