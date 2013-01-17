あああ

var	sys	= require('sys');
var	ws	= require('websocket-server');

var	server	= ws.createServer();

server.addListener("connection", function(connection)
{
	sys.puts("connect");

	connection.addListener("message",function(message)
	{
		sys.puts(message);
	});
});

server.addListener("close", function(connection)
{
	sys.puts("close");
});

// 8000ポートで待機
server.listen(8000);
