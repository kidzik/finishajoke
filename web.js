var express = require('express');

var app = express.createServer(express.logger())
  , fs = require('fs')
  , pg = require('pg');


function err(err) {
    if (err) { throw err; }
}

app.get('/', function(request, response) {
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

app.get('/joke/:id/', function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});

	pg.connect(process.env.DATABASE_URL, function(err, client) {
		var query = client.query('SELECT content FROM jokes WHERE id=' + parseInt(request.params.id)); 
		query.on('row', function(row) {
			response.end(row[0]);
		});
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


