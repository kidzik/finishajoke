var express = require('express');

var app = express.createServer(express.logger())
  , fs = require('fs');

app.get('/', function(request, response) {
//  response.send('Hello World2!');
	fs.readFile(__dirname + '/html/index.html',
	function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}

		response.writeHead(200);
		response.end(data);
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
