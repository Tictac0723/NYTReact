const express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
logger = require('morgan'),
Article = require('./models/Article.js'),
methodOverride = require('method-override');
request = require('request');

// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// -------------------------------------------------

// MongoDB configuration (Change this URL to your own DB)
mongoose.connect("mongodb://NYTreact");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
  });

  app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });