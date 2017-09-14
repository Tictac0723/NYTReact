import React from 'react';
import ReactDOM from 'react-dom';
//remember to include subcomponents Saved and Searched
import { Searched } from './children/Search';
import {Saved} from './children/Save';
import {Query} from './children/Query';
var helpers = require('./utils/helper');


export class Jumbotron extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            apiResults: [],
            mongoResults: [],
            searchTerms: ["", "", ""]
        }
        this.setSearchField = this.setSearchField.bind(this);
        this.resetMongoResults = this.resetMongoResults.bind(this);
    }

    setSearchField(title, start, end) {
        this.setState({
            searchTerms: [title, start, end]
        });
    }

    resetMongoResults(newData) {
        this.setState({
            mongoResults: newData
        });
    }


    // handleTitleChange(event) {    
    //     this.setState({ title: event.target.value });
    // }

    // handleStartYearChange(event) {    
    //     this.setState({ startYear: event.target.value });
    // }

    // handleEndYearChange(event) {    
    //     this.setState({ endYear: event.target.value });
    // }

    componentDidMount() {
        helpers.apiGet().then(function (query) {
            this.setState({
                mongoResults: query.data
            })
        }.bind(this));
    }
    //  If the component changes (i.e. if a search is entered)...
    componentDidUpdate(prevProps, prevState) {
        if(this.state.searchTerms != prevState.searchTerms) {
            helpers.runQuery(this.state.searchTerms[0], this.state.searchTerms[1], this.state.searchTerms[2]).then(function(data) {
                this.setState({apiResults: data})
            }.bind(this));
        }
    }

    render() {
        return (
            <div id='main-container'>
                <div className="jumbotron">
                    <h1 className="display-3">New York Times Articles on React!</h1>
                    <p className="lead">This is a simple web application that uses MongoDB, Express, React, and Node to search, display, and delete New York Times Articles.</p>
                    <hr className="my-4" />
                    <p>It was built by the beautiful and wonderful Taylor Clark.</p>
                </div>
                <div className="col-md-12">
                <Query setSearchField = {this.setSearchField} />
                </div>
                <div className="col-md-12">
                <Searched apiResults ={this.state.apiResults} resetMongoResults ={this.resetMongoResults} />
                </div>
                <div className="col-md-12">
                <Saved mongoResults={this.state.mongoResults} resetMongoResults={this.resetMongoResults} />
                </div>
            </div>
        );
    }
}
