var express = require('express');
var DEBUG = false;

//var app = express(); 
var app = express.createServer(express.logger())
  , fs = require('fs');

var pg = require('pg');
if (DEBUG) pg = pg.native;


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
	var url = process.env.DATABASE_URL;
	pg.connect(url, function(err, client) {
		if (err) throw err;
		response.writeHead(200, {"Content-Type": "text/plain"});
		var query = client.query('SELECT content FROM jokes WHERE id=' + parseInt(request.params.id)); 
		query.on('row', function(row) {
			response.end(row['content']);
		});
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


