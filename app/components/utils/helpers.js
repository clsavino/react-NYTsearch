var axios = require("axios");

var nytAPIKey = "63e4f097e28c463fb375ca3da91da377";

var helpers = {
  runQuery: function(term, start, end){
    var term = term.trim();
    var start = start.trim() + "0101";
    var end = end.trim() + "1231";

    console.log("Query Run",term,start,end);

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + term + "&begin_date" + start + "&end_date" + end + "&api-key" + nytAPIKey;

    return axios.get( queryURL )
    .then(function(results){
      console.log("Axios Results ", results.data.response);
      return results.data.response;
    })
  },
  getSaved: function(){
    return axios.get('/api/saved')
      .then(function(results){
        console.log("axios results ", results);
        return results;
      })
  },
  postArticle: function(title, date, url){
    var newArticle = {
      title: title,
      date: date,
      url: url
    };
    return axios.post('/api/saved', newArticle)
      .then(function(results){
        console.log("axios results ", results._id);
        return results._id;
      })
  },
  deleteSaved: function(title) {
    return axios.delete('/api/saved', {title: title});
  }
}

module.exports = helpers;
