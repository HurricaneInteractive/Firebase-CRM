import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import firebase from '../../Firebase/initialize';

import { Loading } from '../../UI';

class Customers extends Component {

    constructor() {
        super();

        this.state = {
            user: ''
        }
    }

    // On Mount
    componentDidMount() {
        // If there is no currentUser
        // Fetch user record from the db
        if (this.props.currentUser === null) {
            firebase.auth().onAuthStateChanged((user) => {
                this.props.getCurrentUser(user);
            })
        }
        //Otherwise fetch record from the db using the currentUser uid
        else {
            const uid = this.props.currentUser.uid;
            const userRef = firebase.database().ref().child('users/' + uid);
            // When value is found
            userRef.on('value', (snap) => {
                // Set user state to db return 
                this.setState({ 
                    user: snap.val()
                });
            });
        }
    }

    // Stop listening to database changes
    componentWillUnmount() {
        firebase.database().ref().off();
    }

    renderTableRows(customers) {
        let customerRows = Object.keys(customers).map((key, index) => {
            let uid = customers[key].uid;
            console.log(customers[key]);
            return (
                <tr key={index}>
                    <td scope="row">{index + 1}</td>
                    <td>{customers[key].company_name}</td>
                    <td>{customers[key].email}</td>
                    <td>{customers[key].phone}</td>
                    <td>{customers[key].address}</td>
                    <td><Link to={`/customer/${uid}`}>View</Link></td>
                </tr>
            )
        });

        return customerRows;
    }

    render() {
        let user = this.state.user,
            customers = '';
        
        if (typeof user.customers === 'undefined' || user.customers === '' || user.customers === null) {
            customers = [];
        } else {
            customers = user.customers;
        }

        console.log(customers);

        // If there is no user show Loading screen
        if (user === '' || user === null) {
            return (
                <Loading />
            )
        }

        return(
            <div className="user-inner">
                <h2>Customers</h2>
                <div className="row">
                    {
                        customers.length < 1 ? (
                            <div className="col-sm-12 no-results">
                                <h4>There are no records here...</h4>
                                <Link to="/customers/new" class="btn btn-primary">Add Customer</Link>
                                <img src="/dist/img/sadface.png" />
                            </div>
                        ) : (
                            <div className="col-sm-12">
                                <table className="table table-striped table-bordered table-responsive">
                                    <thead>
                                        <tr className="bg-primary">
                                            <th>#</th>
                                            <th>Company Name</th>
                                            <th>Email</th>
                                            <th>Phone Number</th>
                                            <th>Address</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { this.renderTableRows(customers) }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

Customers.propTypes = {
    currentUser: PropTypes.object,
    getCurrentUser: PropTypes.func.isRequired
}

export default Customers;