var React = require("react");
var helpers = require("")
var Form = React.createClass({

  getInitialState: function() {
    return { term: "", start:"", end:"" };
  },

  handleChangeTerm: function(event) {
    this.setState({ term: event.target.value });
  },

  handleChangeStart: function(event) {
    this.setState({ start: event.target.value });
  },

  handleChangeEnd: function(event) {
    this.setState({ end: event.target.value });
  },

  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of clicking the button
    event.preventDefault();
    // Set the parent to have the search term
    console.log('in handleSubmit',this.state.term,this.state.start,this.state.end);
    this.props.setTerm(this.state.term, this.state.start, this.state.end);
    this.setState({ term: "" });
    this.setState({ start: ""});
    this.setState({ end: ""});
  },

  render: function() {
    return (
      <div className="panel panel-default">

        <div className="panel-heading">
          <h3 className="panel-title text-center"><strong>Search Parmeters</strong></h3>
        </div>

        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label htmlFor="term">
                <strong>Search Term</strong>
              </label>
              <input value={this.state.term} type="text"
                className="form-control text-center"
                id="term"
                onChange={this.handleChangeTerm}
                required />
              <br />
            </div>

              <div className="form-group">
                <label htmlFor="start"><strong>Start Year:</strong></label>
                <input value={this.state.start} type="text" className="form-control text-center" id="start"
                  onChange={this.handleChangeStart} />
              </div>

              <div className="form-group">
                <label htmlFor="endYear"><strong>End Year:</strong></label>
                <input value={this.state.end} type="text" className="form-control" id="end"
                  onChange={this.handleChangeEnd} />
              </div>

          </form>
        </div>
      </div>

    );
  }
});

module.exports = Form;
