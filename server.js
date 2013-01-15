var http = require('http');
var func = function( req, res ) {
	res.writeHead( 200, {'Content-Type':'text/plain'});
	res.end('Hello NodeNinja');
}
http.createServer( func ).listen( 8080 );