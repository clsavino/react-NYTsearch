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
      saved: [],
      article: []
    };
  },

  // This function allows children to update the parent.
  setParams: function(term,start,end) {
    this.setState({ term: term });
    this.setState({ start: start });
    this.setState({ end: end });
    console.log('in setParams - term, start,end', term, start, end);
  },

  // The moment the page renders, get the Articles
  componentDidMount: function() {
    console.log('in componentDidMount');
    helpers.getSaved().then(function(saved) {
      console.log('response from helpers.getSaved - saved.data',saved.data);
      if (!isEqual(saved,this.state.saved)) {
        this.setState({ saved: saved.data });
        console.log('in componentDidMount- saved.data',saved.data);
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {
    console.log('in componentDidUpdate')
    // Run the query for the articles
    helpers.runQuery(this.state.term, this.state.start, this.state.end).then(function(results) {
      if (!isEqual(results, this.state.results)) {
        this.setState({results: results});
        //array of response objects from api
        console.log('response after runQuery',results);
        return;
      }
    }.bind(this));//helpers.runQuery
  },

  setSaved: function(saved) {
    this.state.saved.push(saved);
  },

  saveItem: function(newArticle) {
    helpers.postArticle(newArticle).then(function (response) {
      console.log("Saved Article: ", response);
    });
  },

  deleteItem: function(title) {
    helpers.deleteSaved(title).then(function (response) {
      console.log("Deleted Article: ", response);
    });
  },

  render: function() {
    return (
      <div>
        <div className="jumbotron">
          <h2 className="text-center">New York Times Article Search</h2>
          <h3 className="text-center">Search and save articles</h3>
        </div>

        <div className="container">
          <Form setParams={this.setParams} />
          <Results
            results={this.state.results}
            title={this.state.title}
            date={this.state.date}
            url={this.state.url}
            setSaved={this.setSaved}
            saveItem={this.saveItem} />
          <Saved
            deleteItem={this.deleteItem}
            saved={this.state.saved} />
        </div>
      </div>
    );
  }
});


module.exports = Main;
