var	sys	= require('sys');
var	ws	= require('websocket-server');
var mg	= require('mongoose');

var	Schema		= mg.Schema;
var	UserSchema	= new Schema({
	message: String,
	date: Date
});

mg.model('User',UserSchema);
mg.connect('mongodb://localhost/test');
var	User	= mg.model( 'User' );

var	server	= ws.createServer();

server.addListener("connection", function(connection)
{
	sys.puts("connect");

	connection.addListener("message",function(message)
	{
		var user	= new User();
		user.message	= message;
		user.date		= new Date();
		user.save( function(err){if(err){sys.puts(err);}} );
		sys.puts(message);
	});
});

server.addListener("close", function(connection)
{
	sys.puts("close");
});

// 8000ポートで待機
server.listen(8000);
