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
var Article = require('./models/Article');

// Create Instance of Express
var app = express();

// Set an initial port.
var PORT = process.env.PORT || 5000;

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


if (process.env.NODE_ENV === 'production') {
    dbURI= "mongodb://heroku_xfj05g0m:ujk02k8p0qu0mjd9id7bbf9k45@ds141098.mlab.com:41098/heroku_xfj05g0m";
}
/*
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  // Database configuration with mongoose
  mongoose.connect(dbURI);
}
*/
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

/* Alternate way to render / root route
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
*/

app.get("/", function(req, res) {
  res.render(index.html);
});

// This is the route used to retrieve the saved articles and place them in the Saved Article Panel
app.get("/api/retrieve", function(req, res) {
  console.log('in server, /retrieve');
  Article.find({})
  .exec(function(err, docs) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      console.log('in api/retrieve - docs',docs);
      res.send(docs);
    }
  });
});

//the route to save the article to db
app.post('/api/saved', function(req, res){
  // save the article object which has the article title,
  // url and publish date
  console.log('\nin app.post/api/saved - req.body', req.body);
  var newArticle = new Article(req.body.article);
  console.log('\nnewArticle',newArticle)
    newArticle.save(function (err, doc) {
      if (err) {
        res.send(err);
      } else {
        res.send(doc);
      }
    });
});

// Route to delete an article from saved list
app.delete('/api/delete/:title', function(req, res){
  Article.find({"title": req.params.title})
  .remove(function (response) {
    console.log('removed article with title ',req.params.title);
    res.send(response);
  })
});

app.get("/api/search/:term/:start/:end", function (req, res) {
  var endpoint = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=1b8ad75b08d7499ab6862418e9cc2c3a&",
    q = req.params.term,
    start = req.params.start,
    end = req.params.end;
  console.log('\nreq.params.term',req.params.term);
  console.log('\nreq.params.start',req.params.start);
  console.log('\nreq.params.end',req.params.end);
  var url = endpoint + "q=" + q + "&begin_date=" + start + "&end_date=" + end;
  console.log('\napi/search url = ', url);
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
