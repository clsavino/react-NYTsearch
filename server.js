// Include Server Dependencies
var express = require("express");

var request = require("request");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");

mongoose.Promise = Promise;

//Require Schemas
var Article = require('./models/Article.js');

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
var dbURI = 'mongodb://localhost/nytreact';
/*
if (process.env.NODE_ENV === 'production') {
    dbURI= "mongodb://heroku_xfj05g0m:<dbpassword>@ds141098.mlab.com:41098/heroku_xfj05g0m";
}
*/
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
// Database configuration with mongoose
mongoose.connect(dbURI);
}

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});
// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

/* Alternate way to render / root route
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
*/

app.get("/"), function(req, res) {
  res.render(index.html);
});

// This is the route used to send GET requests to retrieve the saved articles
// and place in Saved Article Panel
app.get("/api/retrieve", function(req, res) {
  console.log('in server, /retrieve');
  Article.find({})
  .exec(function(err, doc) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      res.send(docs);
    }
  });
});

//the route to send POST requests to save the
//  article to saved list
app.post('/api/saved', function(req, res){
  // save the article object which has the article title,
  // url and publish date to the variable
  console.log('in /api/saved to post - req.body', req.body);
  var newArticle = new Article(req.body.article);
    newArticle.save(function (err, doc) {
      if (err) {
        res.send(err);
      } else {
        res.send(doc);
      }
    });
});

// Route to delete an article from saved list
app.delete('/api/delete/:term', function(req, res){
  Article.find({"title": req.params.term})
  .remove(function (response) {
    console.log('removed article');
    res.send(response);
  })
});

app.get("/api/search/:term/:start/:end", function (req, res) {
  var endpoint = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=1b8ad75b08d7499ab6862418e9cc2c3a&",
    q = req.params.term,
    start = req.params.start,
    end = req.params.end,
    fl = "web_url,headline,pub_date";

  var url = endpoint + "q=" + q + "&begin_date=" + start + "&end_date=" + end + "&fl=" + fl;

  request(url, function (err, response, body) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      body = JSON.parse(body);
      console.log("parsed body ", body)
      res.json(body);
    }

  })
});

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
