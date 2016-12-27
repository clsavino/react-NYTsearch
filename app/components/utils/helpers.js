var axios = require("axios");

var helpers = {

  runQuery: function(term, start, end){
    var term = term.trim();
    var start = start.trim() + "0101";
    var end = end.trim() + "1231";

    console.log("\nin runQuery",term,start,end);

    //var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + term + "&begin_date" + start + "&end_date" + end + "&api-key" + nytAPIKey;
    //console.log(queryURL);
    //return axios.get( querURL )
    return axios.get('/api/search/' + term + '/' + start + '/' + end )
    .then(function(response){
      console.log("\nAxios Response from NYT query", response);
      return response.data.response.docs;
    })
  },

  getSaved: function(){
    return axios.get('/api/retrieve')
      .then(function(response){
        console.log("axios response from /api/retrieve", response);
        return response;
      })
  },

  postArticle: function(newArticle){
    return axios.post('/api/saved', {article:newArticle})
      .then(function(response){
        console.log("post article axios response ", response._id);
        return response._id;
      })
  },

  deleteSaved: function(title) {
    return axios.delete('/api/delete', title);
  }
}

module.exports = helpers;
