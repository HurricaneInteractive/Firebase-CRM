import React, { Component } from 'react';
import PropTypes from 'prop-types';

import firebase from '../../Firebase/initialize';

import { Employees } from './Profile/Employees';
import { CompanyInformation } from './Profile/CompanyInformation';
import { Loading } from '../../UI';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            user: '',
            editingCompanyInformation: false,
            metadata: {
                phone: '',
                address: ''
            }
        }

        this.toggleCompanyInformationEditing = this.toggleCompanyInformationEditing.bind(this);
        this.handleCompanyInfoChange = this.handleCompanyInfoChange.bind(this);
        this.handleUpdatingUserMeta = this.handleUpdatingUserMeta.bind(this);
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
            userRef.on('value', (snap) => {
                // console.log('Snap: ', snap.val());
                let user = snap.val();
                let phone = '', address = '';
                
                typeof user.metadata.address === 'undefined' ? '' : address = user.metadata.address;
                typeof user.metadata.phone === 'undefined' ? '' : phone = user.metadata.phone;

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

    componentWillUnmount() {
        firebase.database().ref().off();
    }

    toggleCompanyInformationEditing(state) {
        this.setState({
            editingCompanyInformation: state
        });
        
        if (state === false) {
            let meta = this.state.metadata,
                userMeta = this.state.user.metadata,
                address = '', phone = '';
            
            typeof userMeta.address === 'undefined' ? '' : address = userMeta.address;
            typeof userMeta.phone === 'undefined' ? '' : phone = userMeta.phone;

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

    handleUpdatingUserMeta(name, value) {
        let uid = this.state.user.metadata.uid;
        this.props.updateUserMetadata(uid, name, value);
    }

    render() {

        let user = this.state.user,
            metadata = user.metadata,
            employees = user.employees,
            companyInformation = {
                email: '',
                address: '',
                phone: ''
            }
        
        if (user === '' || user === null) {
            return (
                <Loading />
            )
        }
        
        if (user) {
            companyInformation = {
                email: metadata.email,
                address: this.state.metadata.address,
                phone: this.state.metadata.phone
            };
        }

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