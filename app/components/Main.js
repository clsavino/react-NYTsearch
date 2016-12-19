// Include React
var React = require("react");

// include all of the sub-components
var Form = require("./children/Form");
var Saved = require("./children/Saved");
var Search = require("./children/Search");

// Helper for making AJAX requests to the NYT API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // initial state variables
  getInitialState: function() {
    return { searchTerm: "", results: "", article: [] };
  },

  // The moment the page renders get the Article
  componentDidMount: function() {

    helpers.getArticle().then(function(response) {
      console.log('response from helpers.getArticle',response.data);
      if (response !== this.state.article) {
        console.log("Article", response.data);
        this.setState({ Article: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {

    // Run the query for the article
    helpers.runQuery(this.state.searchTerm).then(function(data) {
      if (data !== this.state.results) {
        console.log("Article in runQuery", data);
        //this.setState({ results: data });
        this.setState({ title: data[0]});
        this.setState({ date: data[1]});
        this.setState({ url: data[2]});

        helpers.getArticle().then(function(response) {

          this.setState({ article: response.data });

        }.bind(this)); //helpers.getArticle
      }
    }.bind(this));//helpers.runQuery
  },
  // This function allows childrens to update the parent.
  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },

  render: function() {
    return (
    <div>
      <div className="jumbotron">
        <h1 className="text-center">New York Times Article Search</h1>

        <h3 className="text-center"> Search for and save articles of interest!</h3>
      </div>

      <div className="container">
        <Form id="form" setTerm={this.setTerm} />
        <Search title={this.state.title} date={this.state.date} url={this.state.url} />
        <Saved article={this.state.article} />
      </div>
    </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
