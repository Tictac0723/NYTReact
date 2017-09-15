import React from 'react';
import ReactDOM from 'react-dom';

export class Saved extends React.Component {
    constructor(props) {
        super(props);
        this.state = {doIneedThis: false}
        
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
        var articleMongoId = event.target.value;

        var that = this;

        helpers.apiDelete(articleMongoId).then(function() {
            helpers.apiGet().then(function(query) {
                that.props.resetMongoResults(query.data)
            })
        });
    }

      // Here we render the Search Results Panel
  render() {
    
        // http://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
        // another way could be using the bind() function. but why not try it this way too.
        var that = this;
    
        return (
    
          <div className="panel panel-default">
    
            <div className="panel-heading">
              <h3 className="panel-title text-center" style={ {fontSize: "20px"} }><i><b>Saved Articles</b></i></h3>
            </div>
    
            <div className="panel-body">
              <ul className="list-group col-md-8 col-md-offset-2">
    
                {this.props.mongoResults.map(function(search, i) {
                  return (
                    <li key={search._id} className="list-group-item" style={ {borderWidth: "0px"} }>
                      <div className="input-group">
                        <div type="text" className="form-control">
                          <b><a href={search.url} target="_new" style={ {color: "black"} }>{search.title}</a></b>
                          <i> {search.date.substring(0, 10)}</i>
                        </div>
                        <span className="input-group-btn">
                          <button className="btn btn-danger" type="button" onClick={that.handleDelete} value={search._id}>Remove</button>
                        </span>
                      </div>
                    </li>
                  );
                })}
    
              </ul>
            </div>
    
          </div>
          
        )
    }
}