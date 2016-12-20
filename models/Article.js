var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({

  title: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  date: {
    type: Date,
  },
  url: {
    type: String,
    unique: true,
    dropDups: true,
    required: true
  }

});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
