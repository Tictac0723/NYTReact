import React from 'react';
import ReactDOM from 'react-dom';
import {Saved} from './Save';

export class Searched extends React.Component {
    render() {
        return (
        <div id="main-container">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Results</h3>
                </div>
                <div className="panel-body">
                    <div id="resultTitle"><button>Save</button></div>
                </div>
            </div>
        </div>
        );
    }
}
