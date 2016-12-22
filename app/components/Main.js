// Include React
var React = require("react");
var isEqual = require("lodash.isequal");


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
    return {
      term: "",
      start:"",
      end:"",
      title:"",
      date: "",
      url:"",
      results: [],
      saved: []
    };
  },

  // This function allows children to update the parent.
  setParams: function(term,start,end) {
    this.setState({
      term: term,
      start: start,
      end: end
    })
    console.log('setParams - this.setState',this.setState);
  },

  // The moment the page renders, get the Articles
  componentDidMount: function() {

    helpers.getSaved().then(function(saved) {
      console.log('response from helpers.getSaved - saved.data',saved.data);
      if (!isEqual(saved,this.state.saved)) {
        this.setState({ saved: saved.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {
    // Run the query for the articles
    helpers.runQuery(this.state.term, this.state.start, this.state.end).then(function(results) {
      if (!isEqual(results, this.state.results)) {
        this.setState({results: results});
        //array of response objects from api
        console.log('response after query',results);
        return;
      }
      /*
        helpers.getSaved().then(function(response) {
          this.setState({ article: response.data });
        }.bind(this));//helpers.getSaved
      */
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
          <Forms setParams={this.setParams} />
          <Results results={this.state.results} state={this.state} title={this.state.title} date={this.state.date} url={this.state.url} />
          <Saved article={this.state.article} />
        </div>
      </div>
    );
  }
});


module.exports = Main;
