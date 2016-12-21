// Include React
var React = require("react");

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
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved Articles</h3>
        </div>
        <div className="panel-body text-center">

          {/* use a map function to loop through an array in JSX */}
          {this.props.article.map(function(search, i) {
            return (

              <div key={i}>
                Title: {search.title}
                Date Published: {search.date}
                <a href={search.url} target='blank' >View Article</a>
                <a id={search.title} onClick={this.deleteArticle} >Delete article</a>
              </div>

            );
          })}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Saved;
