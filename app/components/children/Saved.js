// Include React
var React = require("react");
var helpers = require("../utils/helpers.js");
// This is the Saved component. It will be used to show the saved searches and provide a means to delete articles.
var Saved = React.createClass({

  handleDelete: function(event) {
    var selectedParent = event.target.parentNode;
    var title = selectedParent.firstChild.innerHTML;
    this.props.deleteItem(title);
    selectedParent.parentNode.removeChild(selectedParent);
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
              {/* use a map function to loop through an array in JSX building a div for each article saved*/}
              {this.props.saved.map(function(article, i) {
                return (
                  <div id={i} key={i} className="well text-left">
                    <h4>{article.title}</h4>
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
