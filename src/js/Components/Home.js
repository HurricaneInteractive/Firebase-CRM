import React , { Component } from 'react';

import { Link, Redirect } from 'react-router-dom';
import { auth } from '../Firebase/helpers';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            user: '',
            authenticated: false,
            checkingAuth: true
        };
    }

    render() {
        return(
            <div>
                <h2>Home</h2>
            </div>
        )
    }
}

export default Home;