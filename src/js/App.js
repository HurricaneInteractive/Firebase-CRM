import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
    BrowserRouter as Router, 
    Route, 
    HashRouter, 
    Redirect, 
    Switch
} from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

import firebase from './Firebase/initialize';
import { isAuthed, auth } from './Firebase/helpers';

import Navbar from'./Navbar';

import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

import Dashboard from './Components/Users/Dashboard';
import Profile from './Components/Users/Profile';
import Customers from './Components/Users/Customers';
import NewCustomer from './Components/Users/Customers/NewCustomer';
import { CustomerSingle } from './Components/Users/Customers/CustomerSingle';

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
        
        // Initial state
        this.state = {
            userAuthed: false,
            checkingAuth: true,
            user: ''
        }

        // bind events
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.updateUserMetadataFunc = this.updateUserMetadataFunc.bind(this);
    }

    // Sets the state of the app based on auth status
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    userAuthed: true,
                    checkingAuth: false,
                    user: user
                });
            }
            else {
                this.setState({
                    userAuthed: false,
                    checkingAuth: false,
                    user: user
                });
            }
        });
    }

    // Log a user in
    logInUser(email, password) {
        this.props.dispatch(loginUser(email, password));
        this.props.dispatch(checkAuthStatus());
    }

    // Sets the current user
    setCurrentUser(user) {
        this.props.dispatch(changeUserState(user));
    }

    // Updates the users metadata
    updateUserMetadataFunc(uid, key, value) {
        this.props.dispatch(updateUserMetadata(uid, key, value));
    }

    // render
    render() {
        const _this = this;
        console.log(this.state.user);

        // Define the websites public routes
        const PublicRoutes = () => (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" render={() => ( <Login login={this.logInUser.bind(this)} /> ) } />
                <Route path="/register" component={Register} />
                <Redirect from="/dashboard" to="/login" />
                <Redirect from="/profile" to="/login" />
                <Redirect from="/customers" to="/login" />
            </Switch>
        )

        // Define the websites private routes
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
                <Route exact path="/customers" render={() => (
                    <Customers 
                        currentUser={this.props.user}
                        getCurrentUser={this.setCurrentUser}
                    />
                )} />
                <Route path="/customers/new" render={() => (
                    <NewCustomer userId={this.state.user.uid} />
                )} />
                <Route path="/customer/:uid" component={CustomerSingle} />
                <Redirect from="/" to="/dashboard" />
                <Redirect from="/login" to="/dashboard" />
                <Redirect from="/register" to="/dashboard" />
            </Switch>
        )

        // if authentication checking isn't happening
        // Check auth status
        // Set routes based on auth status
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
        // If auth checking is happening
        // Show loading screen
        else {
            return (
                <Loading />
            )
        }
    }
}

// Map the user state to Component props
const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

// Reduc connect method
const AppConnect = connect(
    mapStateToProps
)(App);

export default AppConnect;