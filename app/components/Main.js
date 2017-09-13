import React from 'react';
import ReactDOM from 'react-dom';
//remember to include subcomponents Saved and Searched
import { Searched } from './children/Search';
import {Saved} from './children/Save';
var helpers = require('./utils/helper');


export class Jumbotron extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            startYear: '',
            endYear: '',
            results: [],
            savedArticles: []
        }
        // this.handleTitleChange = this.handleTitleChange.bind(this);
        // this.handleStartYearChange = this.handleStartYearChange.bind(this);
        // this.handleEndYearChange = this.handleEndYearChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    saveArticle(title, date, url) {
        helpers.postArticle(title, date, url);
        this.getArticle();
    }

    deleteArticle(article) {
        console.log(article);
        axios.delete('/api/saved' + article_id).then(function (response) {
            this.setState({ savedArticles: response.data });
            return response;
        }.bind(this));
        this.getArticle();
    }

    setTitle(title, start, end) {
        this.setState({
            title: title,
            startYear: start,
            endYear: end
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
        helpers.getArticle().then(function (response) {
            console.log(response);
            if (response !== this.state.title) {
                console.log("Title", response.data);
                this.setState({ title: response.data });
            }
        }.bind(this));
    }
    //  If the component changes (i.e. if a search is entered)...
    componentDidUpdate() {
        helpers.runQuery(this.state.title).then(function (data) {
            if (data !== this.state.title) {
                this.setState({
                    results: data
                })

                helpers.postArticle(this.state.title).then(function (response) {
                    console.log("updated");

                    helpers.getArticle().then(function (resposne) {
                        console.log("title ", response.data);

                        console.log("title", response.data);
                        this.setState({ title: resposne.data });
                    }.bind(this));
                }.bind(this));
            }
        }.bind(this))
    }

    handleSubmit(event) {
        event.preventDefault();
        alert("DAT TITLE BRO " + this.state.title);
        console.log(this.state);
        // this.props.setTitle(this.state.title);
        // this.setState({ title: "" });
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
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Panel title</h3>
                    </div>
                    <div className="panel-body">
                        <div className="input-group">
                            <h3>Topic</h3>
                            <form>
                                <input
                                    id="topic"
                                    type="text"
                                    className="form-control"
                                    placeholder="North Korea"
                                    onChange={this.handleTitleChange}
                                />
                                <h3>Start Year</h3>
                                <input
                                    id="startYear"
                                    type="text"
                                    className="form-control"
                                    placeholder="2016"
                                    onChange={this.handleStartYearChange}
                                />
                                <h3>End Year</h3>
                                <input
                                    id="endYear"
                                    type="text"
                                    className="form-control"
                                    placeholder="2017"
                                    onChange={this.handleEndYearChange}
                                />
                                <button type="submit" className="btn btn-danger">Search</button>
                            </form>

                        </div>

                    </div>
                </div>
                <div className="col-md-12">
                <Searched setTerm={this.setTerm} />
                </div>
                <div className="col-md-12">
                <Saved />
                </div>
            </div>
        );
    }
}
