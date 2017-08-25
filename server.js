//====Requirements===//
var express = require('express');
var path = require('path');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = ('mysql');
var PORT = process.env.PORT || 8080;

//======Body Parser =======//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));









//=====PORT listner=====//
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});