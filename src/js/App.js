import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
    BrowserRouter as Router, 
    Route, 
    HashRouter, 
    Redirect, 
    Switch
} from 'react-router-dom';

import firebase from './Firebase/initialize';
import { isAuthed, auth } from './Firebase/helpers';

import Navbar from'./Navbar';

import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

import Dashboard from './Components/Users/Dashboard';
import Profile from './Components/Users/Profile';

import { 
    Loading,
    UserSidebar
} from './UI';

import { 
    loginUser, 
    checkAuthStatus,
    changeUserState,
    updateUserMetadata
} from './Redux/Actions/userActions';

class App extends Component {
    constructor() {
        super();
        
        this.state = {
            userAuthed: false,
            checkingAuth: true
        }

        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.updateUserMetadataFunc = this.updateUserMetadataFunc.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    userAuthed: true,
                    checkingAuth: false
                });
                //TODO Try to reduce url jumping
            }
            else {
                this.setState({
                    userAuthed: false,
                    checkingAuth: false
                });
                //TODO Try to reduce url jumping
            }
        });
    }

    logInUser(email, password) {
        this.props.dispatch(loginUser(email, password));
        this.props.dispatch(checkAuthStatus());
    }

    setCurrentUser(user) {
        this.props.dispatch(changeUserState(user));
    }

    updateUserMetadataFunc(uid, name, value) {
        this.props.dispatch(updateUserMetadata(uid, name, value));
    }

    render() {
        const _this = this;
        // let loggedIn = false;
        
        // firebase.auth().onAuthStateChanged(function(user) {
        //     if (user) {
        //         _this.setCurrentUser(user);
        //     }
        //     else {
        //         _this.setCurrentUser(user);
        //     }
        // });

        // if (this.props.user !== null) {
        //     loggedIn = true;
        // } else {
        //     loggedIn = false;
        // }

        const PublicRoutes = () => (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" render={() => ( <Login login={this.logInUser.bind(this)} /> ) } />
                <Route path="/register" component={Register} />
                <Redirect from="/dashboard" to="/login" />
                <Redirect from="/profile" to="/login" />
            </Switch>
        )

        const PrivateRoutes = () => (
            <Switch>
                <Route path="/dashboard" render={() => (
                    <Dashboard 
                        currentUser={this.props.user}
                        getCurrentUser={this.setCurrentUser}
                    />
                )} />
                <Route path="/profile" render={() => ( 
                    <Profile
                        currentUser={this.props.user}
                        getCurrentUser={this.setCurrentUser}
                        updateUserMetadata={this.updateUserMetadataFunc}
                    /> 
                )} />
                <Redirect from="/login" to="/dashboard" />
                <Redirect from="/register" to="/dashboard" />
            </Switch>
        )

        if (this.state.checkingAuth === false) {
            return (
                <Router>
                    <div className={ this.state.userAuthed ? ( 'user' ) : ( 'public' ) }>
                        <Navbar />
                        <main>
                            <div className="container-fluid">
                                {
                                    this.state.userAuthed === false ? (
                                        <PublicRoutes />
                                    ) : (
                                        <div className="row">
                                            <aside>
                                                <UserSidebar />
                                            </aside>
                                            <div className="user-content">
                                                <PrivateRoutes />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </main>
                    </div>
                </Router>
            )
        }
        else {
            return (
                <Loading />
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

const AppConnect = connect(
    mapStateToProps
)(App);

export default AppConnect;