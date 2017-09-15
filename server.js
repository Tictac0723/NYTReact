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
if(process.env.NODE_ENV =='production') {
mongoose.connect("mongodb://heroku_grl8bwn6:ojlmlknrtseh7r52lh02pv7rcc@ds135594.mlab.com:35594/heroku_grl8bwn6");
}
else{
  mongoose.connect('mongodb://localhost/NYTreact');
}
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------
// Main "/" Route. This will redirect the user to our rendered React application

var router = require('./controllers/controller.js');
app.use('/', router);

  app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });