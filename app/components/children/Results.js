var React = require("react");

var Results = React.createClass({

  getInitialState: function() {
    return {
      saved: []
    };
  },

  handleSave: function (event) {
    var selectedParent = event.target.parentNode,
        title = selectedParent.firstChild.innerHTML,
        url = selectedParent.childNodes[1].innerHTML,
        date = selectedParent.childNodes[2].innerHTML,
        button = selectedParent.childNodes[3];

    //Article info to save in db, selected by user with Save button
    var saveObject = {
      title: title,
      url: url,
      date: date
    }
    //push object onto array of articles to save to db
    this.state.saved.push(saveObject);
    this.props.saveItem(saveObject);
    this.props.setSaved(this.state.saved);
    button.setAttribute("disabled", "true");

  },
  render: function() {
    return (
        <section className="row">
          <section className="col-md-12">
            <section className="panel panel-default text-center">
              <section className="panel-heading">
                <h3>Search Results</h3>
              </section>
              <section className="panel-body">
              {this.props.results.map(function(result, i) {
                return (
                  <section id={i} key={i} className="well text-left">
                    <h4>{result.headline.main}</h4>
                    <a href={result.web_url} target='blank' >{result.web_url}</a>
                    <h5>{result.pub_date.slice(0,10)}</h5>
                    <button onClick={this.handleSave} className="btn btn-primary btn-sm">Save</button>
                  </section>
                );
              }, this)}

              </section>
            </section>
          </section>
      </section>
    );
  }
});

module.exports = Results;
