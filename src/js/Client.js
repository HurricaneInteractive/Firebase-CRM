import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import AppConnect from './App';
import store from './Store';

const app = document.getElementById('app')
const url = require('../dist/css/style.css');

ReactDOM.render(<Provider store={store}><AppConnect /></Provider>, app);
