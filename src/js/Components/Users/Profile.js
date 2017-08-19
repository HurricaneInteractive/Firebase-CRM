import React, { Component } from 'react';
import PropTypes from 'prop-types';

import firebase from '../../Firebase/initialize';

import { Employees } from './Profile/Employees';
import { CompanyInformation } from './Profile/CompanyInformation';
import { Loading } from '../../UI';

class Profile extends Component {

    constructor() {
        super();
        // Set default state
        this.state = {
            user: '',
            editingCompanyInformation: false,
            metadata: {
                phone: '',
                address: ''
            }
        }

        // Bind events
        this.toggleCompanyInformationEditing = this.toggleCompanyInformationEditing.bind(this);
        this.handleCompanyInfoChange = this.handleCompanyInfoChange.bind(this);
        this.handleUpdatingUserMeta = this.handleUpdatingUserMeta.bind(this);
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
                // Set default value of metadata
                let user = snap.val();
                let phone = '', address = '';
                
                // Remove undefined error & set metadata values to returned user object
                typeof user.metadata.address === 'undefined' ? '' : address = user.metadata.address;
                typeof user.metadata.phone === 'undefined' ? '' : phone = user.metadata.phone;

                // Set state based on returned user metadata
                this.setState({ 
                    user: snap.val(),
                    metadata: Object.assign(
                        {},
                        this.state.metadata,
                        {
                            address: address,
                            phone: phone
                        }
                    )
                });
            });
        }
    }

    // Stop listening to database changes
    componentWillUnmount() {
        firebase.database().ref().off();
    }

    // Toggle company information editing state
    toggleCompanyInformationEditing(state) {
        // Set the state to specified state
        this.setState({
            editingCompanyInformation: state
        });
        
        // If editing is being canceled
        // Set state to either old values or the new values that were updated
        if (state === false) {
            // get state values
            let meta = this.state.metadata,
                userMeta = this.state.user.metadata,
                address = '', phone = '';
            
            // Remove undefined error & set metadata values to returned user object
            typeof userMeta.address === 'undefined' ? '' : address = userMeta.address;
            typeof userMeta.phone === 'undefined' ? '' : phone = userMeta.phone;

            // Set state based on returned user metadata
            this.setState({
                metadata: Object.assign(
                    {},
                    meta,
                    {
                        address: address,
                        phone: phone
                    }
                )
            })
        }
    }

    // Event for when a user changes the value in the input
    // Sets the state value to the input elem value
    handleCompanyInfoChange(e) {
        let type = e.target.name;

        this.setState({
            metadata: Object.assign(
                {},
                this.state.metadata,
                {
                    [type]: e.target.value
                }
            )
        });
    }

    // Passes information to update user metadata function in <App />
    handleUpdatingUserMeta(key, value) {
        let uid = this.state.user.metadata.uid;
        this.props.updateUserMetadata(uid, key, value);
    }

    render() {

        // sets the default variables for render
        let user = this.state.user,
            metadata = user.metadata,
            employees = user.employees,
            companyInformation = {
                email: '',
                address: '',
                phone: ''
            }
        
        // If there is no user show Loading screen
        if (user === '' || user === null) {
            return (
                <Loading />
            )
        }
        
        // If there is a user
        // Set company information to Component State
        if (user) {
            companyInformation = {
                email: metadata.email,
                address: this.state.metadata.address,
                phone: this.state.metadata.phone
            };
        }

        // Display the Profile view
        return (
            <div className="user-inner">
                <h2>Profile</h2>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card text-center company-info">
                            <div className="card-background" style={{ "backgroundImage": "url('https://source.unsplash.com/WLUHO9A_xik/500x175')" }}>
                                { /*<img class="card-img-top" src="https://source.unsplash.com/WLUHO9A_xik/500x175" alt="Card image cap" /> */}
                            </div>
                            <div class="card-body">
                                <h4 class="card-title">
                                    {metadata.company_name}
                                </h4>
                                <p class="card-text">
                                    <strong>Email: </strong>{metadata.email}
                                </p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <Employees employees={employees} />
                    </div>
                    <div className="col-sm-8 company-infomation">
                        <CompanyInformation 
                            information={companyInformation}
                            editing={this.state.editingCompanyInformation}
                            toggleCompanyInformationEditing={this.toggleCompanyInformationEditing}
                            handleChange={this.handleCompanyInfoChange}
                            submitUserChanges={this.handleUpdatingUserMeta}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    currentUser: PropTypes.object,
    getCurrentUser: PropTypes.func.isRequired,
    updateUserMetadata: PropTypes.func.isRequired
}

export default Profile;