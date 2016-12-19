// Include React
var React = require("react");

// This is the Saved component. It will be used to show the saved searches.
var Saved = React.createClass({

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved Articles</h3>
        </div>
        <div className="panel-body text-center">

          {/* use a map function to loop through an array in JSX */}
          {this.props.history.map(function(search, i) {
            return (
              <p key={i}>{search.nytsearch}
               Title: {search.title}
               Date Published: {search.date}
              <a href={search.url}>{search.url}</a></p>
            );
          })}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Saved;
