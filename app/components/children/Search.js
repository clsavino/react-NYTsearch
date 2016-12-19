var React = require("react");
var helpers = require("../utils/helpers");

var Search = React.createClass({

  handleSave: function() {

    helpers.postArticle(this.props.title, this.props.date, this.props.url).then(function() {
    }.bind(this));

  },
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-center">
          <div className="row">
            <div className="col-sm-8" action="/api/save">
              <a href={this.props.url}>{this.props.title}</a>
              <p>{this.props.date}</p>
            </div>
            <div className="col-sm-4">
              <button type="submit" onClick={this.handleSave} id="savebtn" className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Search;
