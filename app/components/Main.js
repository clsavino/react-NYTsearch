// Include React
var React = require("react");

// include all of the sub-components
var Form = require("./children/Form");
var Saved = require("./children/Saved");
var Results = require("./children/Results");

// Helper for making AJAX requests to the NYT API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // initial state variables
  getInitialState: function() {
    return { searchTerm: "", searchStart:"", searchEnd:"", title:"", date: "", url:"", results: "", article: [] };
  },

  // This function allows children to update the parent.
  setTerm: function(term,start,end) {
    this.setState({searchTerm: term,searchStart: start,searchEnd: end})
  },

  // The moment the page renders, get the Articles
  componentDidMount: function() {

    helpers.getSaved().then(function(response) {
      console.log('response from helpers.getSaved',response.data);
      if (response !== this.state.article) {
        console.log("article", response.data);
        this.setState({ article: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {

    // Run the query for the article
    helpers.runQuery(this.state.searchTerm, this.state.searchStart, this.state.searchEnd).then(function(res) {

      //array of response objects from api
      console.log(res.data.response.docs);
      this.setState({
        title: res.data.response.docs[1].headline.main,
        date: res.data.response.docs[1].pub_date,
        url: res.data.response.docs[1].web_url
      })

        helpers.getSaved().then(function(response) {
          this.setState({ article: response.data });
        }.bind(this)); //helpers.getArticle

    }.bind(this));//helpers.runQuery
  },
  render: function() {
    return (
      <div>
        <div className="jumbotron">
          <h2 className="text-center">New York Times Article Search</h2>
          <h3 className="text-center">Search and save articles</h3>
        </div>

        <div className="container">
          <Form id="form" setTerm={this.setTerm} />
          <Results title={this.state.title} date={this.state.date} url={this.state.url} />
          <Saved article={this.state.article} />
        </div>
      </div>
    );
  }
});


module.exports = Main;
