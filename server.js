//require express
var express = require("express");
// require body parser
var bodyParser = require("body-parser");
// require method override
var methodOverride = require("method-override");
// require path
var path = require('path');
// require request
var request = require('request');
// require cheerio
var cheerio = require('cheerio');
// require fs (file system)
var fs = require('fs');
// require mysql
var mysql = ('mysql');

// determine if port is live or local
var port = process.env.PORT || 3000;
// create instance of express
var app = express();

// Serve static content for app from "public" directory
app.use(express.static("public"));
// use html interpreter from body-parser npm
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars instance
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// import routes
var routes = require("./controllers/controller.js");
// give server access to routes
app.use("/", routes);
// port listener
app.listen(port, function() {
  console.log("App listening on port " + port);
});

// newsCycle: get new story from the API
function newsCycle(){
	var cc = 6;
	var interval = setInterval(function(){
		console.log(-- cc);

		if (cc == 0){
			clearInterval(interval);
			console.log("time's up!  Getting another news article...");
			// API Magic here
			//==Daily Mail ==//
			request('https://newsapi.org/v1/articles?source=daily-mail&sortBy=top&apiKey=091a3ab93dd24678b96df7d26d7717f8', function (error, response) {
				//console.log('error:', error); // Print the error if one occurred
				//console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
				console.log('body:', response.body); // Print the HTML for the Google homepage. 

				// write the bits from the response object to the database

				// change the currentStory in db.NewsStory to 0 (false)

				// set the newest story in db.NewsStory to 1 (true)

			});

			newsCycle();
		}
	}, 1000);
}
// run the thing
newsCycle();
