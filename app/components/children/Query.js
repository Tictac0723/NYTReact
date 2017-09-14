import React from 'react';

export class Query extends React.Component {

    constructor(props) {
        super(props);
        this.state = {title: "", startYear: "", endYear: ""}

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleEndYearChange = this.handleEndYearChange.bind(this);
        this.handleStartYearChange = this.handleStartYearChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.setSearchField(this.state.title, this.state.startYear, this.state.endYear);
    }

    handleTitleChange(e) {
        this.setState({title: e.target.value})
    }

    handleStartYearChange(e) {
        this.setState({startYear: e.target.value})
    }

    handleEndYearChange(e) {
        this.setState({endYear: e.target.value})
    }

    render() {
        return (
    
          <div className="panel panel-default">
    
            <div className="panel-heading">
              <h3 className="panel-title text-center" style={ {fontSize: "20px"} }><i><b>Search</b></i></h3>
            </div>
    
            <div className="panel-body text-center">
              <form role="form" onSubmit={this.handleSubmit}>
    
                <div className="form-group col-md-offset-3 col-md-6">
                  <label htmlFor="topic" className="text-center">Topic</label>
                  <input type="text" className="form-control text-center" id="topic" onChange={this.handleTitleChange} />
                </div>
    
                <br />
    
                <div className="form-group col-md-offset-3 col-md-6">
                  <label htmlFor="startYear">Start Year</label>
                  <input type="text" className="form-control text-center" id="startYear" onChange={this.handleStartYearChange} />
                </div>
    
                <br />
    
                <div className="form-group col-md-offset-3 col-md-6">
                  <label htmlFor="endYear">End Year</label>
                  <input type="text" className="form-control text-center" id="endYear" onChange={this.handleEndYearChange} />
                </div>
    
                <br />
    
                <button onClick = {this.handleSubmit} type="submit" className="btn btn-info col-md-offset-5 col-md-2" id="searchBtn">Search</button>
    
              </form>
            </div>
    
          </div>
    
        );
      }
    }
    