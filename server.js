// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var Promise = require("bluebird");

mongoose.Promise = Promise;

//Require Schemas
var Article = require('./models/model.js');

// Create Instance of Express
var app = express();
// Sets an initial port.
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// MongoDB Configuration configuration
//Database configuration with mongoose
var dbURI = 'mongodb://localhost/nytarticles';
/*
if (process.env.NODE_ENV === 'production') {
    dbURI= "mongodb://heroku_w677159l:cn2kbl6l1cogrv4vf13g13iug8@ds133158.mlab.com:33158/heroku_w677159l";
}
*/
// Database configuration with mongoose
mongoose.connect(dbURI);
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});
// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route used to send GET requests to retrieve the saved articles
app.get("/api/saved", function(req, res) {

  //find all the articles
  Article.find({})
    .exec(function(err, doc){

      if(err){
        console.log(err);
      }
      else {
        res.send(doc);
      }
    })
});

//the route to send POST requests to save the search info
// Route to add an article to saved list
app.post('/api/saved', function(req, res){
  Article.create({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Search");
    }
  });
  console.log("Saved to db")
});

// Route to delete an article from saved list
app.delete('/api/saved/', function(req, res){

  var url = req.param('url');

  Article.find({"url": url}).remove().exec(function(err, data){
    if(err){
      console.log(err);
    }
    else {
      res.send("Deleted the article");
    }
  });
});

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
