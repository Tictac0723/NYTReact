import React from 'react';
import ReactDOM from 'react-dom';

export class Saved extends React.Component {
    render() {
        return (
        <div id="main-container">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Saved Articles</h3>
                </div>
                <div className="panel-body">
                    <div id="savedTitle"><button>Delete</button></div>
                </div>
            </div>
        </div>
        )
    }
}