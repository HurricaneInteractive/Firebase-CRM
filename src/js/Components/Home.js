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

    componentDidMount() {
        let _this = this;
        auth().onAuthStateChanged(function(user) {
            if (user) {
                _this.setState({
                    authenticated: true,
                    checkingAuth: false
                });
            }
            else {
                _this.setState({
                    authenticated: false,
                    checkingAuth: false
                })
            }
        });
    }

    render() {
        return(
            <div>
                { this.state.checkingAuth === false ? <h2>Home</h2> : <h2>Loading</h2> }
            </div>
        )
    }
}

export default Home;