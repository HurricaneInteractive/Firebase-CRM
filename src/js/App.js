import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, HashRouter, Redirect } from 'react-router-dom';

import firebase from './Firebase/initialize';
import { isAuthed, auth } from './Firebase/helpers';

import Navbar from'./Navbar';

import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

import Dashboard from './Components/Users/Dashboard';

import { 
    loginUser, 
    checkAuthStatus,
    changeUserState 
} from './Redux/Actions/userActions';

class App extends Component {
    constructor() {
        super();
    }

    logInUser(email, password) {
        this.props.dispatch(loginUser(email, password));
        this.props.dispatch(checkAuthStatus());
    }

    setCurrentUser(user) {
        this.props.dispatch(changeUserState(user));
    }

    render() {
        const _this = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                _this.setCurrentUser(user);
            }
            else {
                _this.setCurrentUser(user);
            }
        });

        let loggedIn = false;
        if (this.props.user === null) {
            loggedIn = false;
        } else {
            loggedIn = true;
        }

        return (
            <Router>
                <div>
                    <Navbar />
                    <main>
                        <div className="container-fluid">
                            <Route exact path="/" render={() => (
                                loggedIn ? (
                                    <Redirect to="/dashboard" />
                                ) : (
                                    <Home />
                                )
                            )} />
                            <Route exact path="/login" render={() => ( <Login login={this.logInUser.bind(this)} /> ) } />
                            <Route exact path="/register" component={Register} />
                            <Route path="/dashboard" component={Dashboard} />
                        </div>
                    </main>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        user: state.user.user
    }
}

const AppConnect = connect(
    mapStateToProps
)(App);

export default AppConnect;