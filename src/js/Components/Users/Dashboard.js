import React , { Component } from 'react';
import PropTypes from 'prop-types';

import firebase from '../../Firebase/initialize';

import { Loading } from '../../UI';

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            user: ''
        }
    }

    // If there is no current user
    // Fetch from database
    componentDidMount() {
        if (this.props.currentUser === null) {
            firebase.auth().onAuthStateChanged((user) => {
                this.props.getCurrentUser(user);
            })
        }
        // Otherwise set user state to returned value from db
        else {
            const uid = this.props.currentUser.uid;
            const userRef = firebase.database().ref().child('users/' + uid);
            userRef.on('value', snap => this.setState({ user: snap.val() }));
        }
    }

    // Stop listening for database changes
    componentWillUnmount() {
        firebase.database().ref().off();
    }

    // Render dashboard page
    render() {
        const user = this.state.user;
        
        if (user === '' || user === null) {
            return <Loading />
        }
        
        return (
            <h2>Welcome {user.metadata.company_name}</h2>
        )
    }
}

Dashboard.propTypes = {
    currentUser: PropTypes.object,
    getCurrentUser: PropTypes.func.isRequired
}

export default Dashboard;