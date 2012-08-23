
var express = require('express');



// TODO:
//   request: headers: 'x-forwarded-for': 'real IP address'
var app = express.createServer(express.logger());

var septa = require("./lib/septa/main.js");


//
// Associative array for all of our routes
//
var routes = {};
routes["api"] = require("./routes/api.js");
routes["echo"] = require("./routes/echo.js");


app.get("/api", routes["api"].go);
app.get("/echo", routes["echo"].go);

app.get('/', function(request, response) {
  response.send('Hello World!');
});


//
// Set this up, mostly for our favicon.
//
app.use(express.static(__dirname + '/public'));


//
// Start up the SEPTA sub-system, specifically fetching from the API.
//
septa.boot();


//
// Actually start listening.
//
var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});


