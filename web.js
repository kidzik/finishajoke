var express = require('express');

var app = express.createServer(express.logger())
  , fs = require('fs')
  , nStore = require('nstore');

var jokes = nStore.new('data/jokes.db', function () {});

function err(err) {
    if (err) { throw err; }
}

jokes.save(1, {content: "A suicide bomber walks into a bar.\nBartender says \"We don't serve suicide bombers here\","}, err);
jokes.save(2, {content: "A second joke,"}, err);

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
	jokes.get(parseInt(request.params.id), function (err, doc, meta) {
		response.end(doc['content']);
	})
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


