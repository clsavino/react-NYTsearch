var axios = require("axios");

var nytAPIKey = "63e4f097e28c463fb375ca3da91da377";

var helper = {

  runQuery: function(nytsearch) {

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + nytsearch + "&api-key=" + nytAPIKey;
    return axios.get(queryURL).then(function(nytresponse) {
      var allArticles = nytresponse.data.response.docs
      console.log('allArticles',allArticles);
      var articleInfo = [];
      var title = [];
      var date = [];
      var url = [];

      for(var i = 0; i <allArticles.length; i++){
        title = allArticles[i].headline.main
        date = allArticles[i].pub_date
        url = allArticles[i].web_url
        console.log(title,date,url)
        articleInfo = [title, date, url]
      }
      console.log('articleInfo',articleInfo);
      return articleInfo;

    });
  },

  getArticle: function() {
    return axios.get("/api/saved");
    alert("Works")
  },

  postArticle: function(title,date,url) {
    return axios.post("/api/saved", { title: title, date: date, url:url });
  }
};

module.exports = helper;
