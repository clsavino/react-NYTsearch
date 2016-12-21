var axios = require("axios");

//var nytAPIKey = '1b8ad75b08d7499ab6862418e9cc2c3a';

var helpers = {
  runQuery: function(term, start, end){
    var term = term.trim();
    var start = start.trim() + "0101";
    var end = end.trim() + "1231";

    console.log("in runQuery",term,start,end);

    //var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + term + "&begin_date" + start + "&end_date" + end + "&api-key" + nytAPIKey;
    //console.log(queryURL);
    //return axios.get( querURL )
    return axios.get('/api/search/:term/:start/:end')
    .then(function(results){
      console.log("Axios Results from NYT query", results);

      return results;

    })
  },
  getSaved: function(){
    return axios.get('/api/retrieve')
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
    return axios.post('/api/store', newArticle)
      .then(function(results){
        console.log("axios results ", results._id);
        return results._id;
      })
  },
  deleteSaved: function(title) {
    return axios.delete('/api/delete', {title: title});
  }
}

module.exports = helpers;
