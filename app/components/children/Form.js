var React = require("react");

var Form = React.createClass({

  getInitialState: function() {
    return { term: "", start:"", end:"" };
  },

  handleChangeTerm: function(event) {
    console.log('handleChangeTerm',event.target.value);
    this.setState({ term: event.target.value });
  },

  handleChangeStart: function(event) {
    console.log('handleChangeStart',event.target.value);
    this.setState({ start: event.target.value });
  },

  handleChangeEnd: function(event) {
    console.log('handleChangeEnd',event.target.value);
    this.setState({ end: event.target.value });
  },

  handleSubmit: function(event) {
    event.preventDefault();
    // Set the parent to have the search term
    console.log('in handleSubmit',this.state.term,this.state.start,this.state.end);
    this.props.setParams(this.state.term, this.state.start, this.state.end);
  },

  render: function() {
    return (
      <div className="panel panel-default">

        <div className="panel-heading">
          <h3 className="panel-title text-center">Enter Your Search Parmeters</h3>
        </div>

        <div className="panel-body text-center">
          <form >

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
                <input value={this.state.end} type="text" className="form-control text-center" id="end"
                  onChange={this.handleChangeEnd} />
              </div>
              <button onClick={this.handleSubmit} type="submit" className="btn btn-primary btn-md">Search</button>
          </form>
        </div>
      </div>

    );
  }
});

module.exports = Form;
