import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const url = require('../dist/css/style.css');

class App extends Component {
    render() {
        return <h1>Hello World!</h1>
    }
}

ReactDOM.render(<App />, document.getElementById('app'));