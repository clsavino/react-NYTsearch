// Include React
var React = require("react");
var helpers = require("../utils/helpers.js");
// This is the Saved component. It will be used to show the saved searches and provide a means to delete articles.
var Saved = React.createClass({

  getInitialState: function() {
    return {deleteID: ""};
  },

  deleteSaved: function(event) {
    event.preventDefault();
    this.setState({deleteID: event.target.id});

    helpers.deleteSaved(event.target.id).then(function(response) {
      console.log('in saved.js, article deleted, id: ',event.target.id)
    }.bind(this));

  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-default text-center">
            <div className="panel-heading">
              <h3>Saved Articles</h3>
            </div>

            <div className="panel-body text-center">
              {/* use a map function to loop through an array in JSX */}
              {this.props.saved.map(function(article, i) {
                return (
                  <div id={i} key={i} className="well text-left">
                    <h3>{article.title}</h3>
                    <a href={article.url} target="blank">{article.url}</a>
                    <h5>{article.date.slice(0,10)}</h5>
                    <button onClick={this.handleDelete} className="btn btn-danger btn-sm">Delete</button>
                  </div>
                );
              }, this)}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Saved;
