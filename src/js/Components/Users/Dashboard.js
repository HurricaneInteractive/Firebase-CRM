import React , { Component } from 'react';
import PropTypes from 'prop-types';

import firebase from '../../Firebase/initialize';

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        if (this.props.currentUser === null) {
            firebase.auth().onAuthStateChanged((user) => {
                this.props.getCurrentUser(user);
            })
        }
        else {
            const uid = this.props.currentUser.uid;
            const userRef = firebase.database().ref().child('users/' + uid);
            userRef.on('value', snap => this.setState({ user: snap.val() }));
        }
    }

    componentWillUnmount() {
        firebase.database().ref().off();
    }

    render() {
        const user = this.state.user;
        if (user !== '' && user !== null) { 
            return (
                <h2>Welcome {user.metadata.company_name}</h2>
            )
        }
        else {
            return (
                <h2>Loading...</h2>
            )
        }
        
    }
}

Dashboard.propTypes = {
    currentUser: PropTypes.object,
    getCurrentUser: PropTypes.func.isRequired
}

export default Dashboard;