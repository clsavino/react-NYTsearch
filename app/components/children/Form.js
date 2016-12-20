var React = require("react");

var Form = React.createClass({

  getInitialState: function() {
    return { term: "", start:"", end:"" };
  },

  handleChangeTerm: function(event) {
    console.log('term from form',event.target.value);
    this.setState({ term: event.target.value });
  },

  handleChangeStart: function(event) {
    console.log('start from form',event.target.value);
    this.setState({ start: event.target.value });
  },

  handleChangeEnd: function(event) {
    console.log('end from form',event.target.value);
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
          <h3 className="panel-title text-center">Search Parmeters</h3>
        </div>

        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>

            <div className="form-group">
              <h4 className="">
                <strong>Search Term</strong>
              </h4>
              <input value={this.state.term} type="text"
                className="form-control text-center"
                id="term"
                onChange={this.handleChangeTerm}
                required />
              <br />
            </div>

              <div className="form-group">
                <label for="startYear">Start Year:</label>
                <input value={this.state.start} type="text" className="form-control text-center" id="start"
                  onChange={this.handleChangeStart} />
              </div>

              <div className="form-group">
                <label for="endYear">End Year:</label>
                <input value={this.state.end} type="text" className="form-control" id="end"
                  onChange={this.handleChangeEnd} />
              </div>

              <button className="btn btn-primary" type="submit">Submit</button>

          </form>
        </div>
      </div>

    );
  }
});

module.exports = Form;
