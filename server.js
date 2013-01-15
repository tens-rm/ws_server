var http = require('http');
http.createServer( function( req, res ) {
						res.writeHead( 200, {'Content-Type':'text/plain'});
						res.end('Hello NodeNinja');
					}
				 ).listen( 8080 );