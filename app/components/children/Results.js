var React = require("react");
var helpers = require("./utils/helpers");

var Results = React.createClass({


  handleSave: function (event) {
    var selectedParent = event.target.parentNode,
        title = selectedParent.firstChild.innerHTML,
        date = selectedParent.childNodes[1].innerHTML,
        //url = selectedParent.childNodes[2].innerHTML,
        button = selectedParent.childNodes[2];

    var saveObject = {
      title: title,
      //url: url,
      date: date
    }
    this.state.saved.push(saveObject);
    this.props.saveItem(saveObject);
    this.props.setSaved(this.state.saved);
    button.setAttribute("disabled", "true");

  },
  render: function() {
    return (
        {/*
        <div className="panel-body text-center">
          <div className="row">
            <div className="col-sm-8" >
              <a href={this.props.url}>{this.props.title}</a>
              <p>{this.props.date}</p>
            </div>
            <div className="col-sm-4">
              <button type="submit" onClick={this.handleSave} id="savebtn" className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
        */}
        <section className="row">
          <section className="col-md-12">
            <section className="panel panel-default text-center">
              <section className="panel-heading">
                <h3>Search Results</h3>
              </section>
              <section className="panel-body">
              {this.props.results.map(function(result, i) {
                return (
                  <section id={i} key={i} className="text-left well">
                    <h3>{result.headline.main}</h3>
                    {/*<h4>{result.url}</h4>*/}
                    <h5>{result.pub_date}</h5>
                    <button onClick={this.handleSave} className="btn btn-primary btn-sm">Save</button>
                  </section>
                );
              }, this)}

              </section>
            </section>
          </section>
      </section>
      </div>
    );
  }
});

module.exports = Results;
