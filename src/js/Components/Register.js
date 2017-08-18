import React , { Component } from 'react';
import PropTypes from 'prop-types';

import firebase from '../Firebase/initialize';
import { auth } from '../Firebase/helpers';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            company_name: '',
            email: '',
            password: '',
            confirm_password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.registerNewUser = this.registerNewUser.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    registerNewUser(e) {
        e.preventDefault();

        const _this = this;
        if (this.state.password !== this.state.confirm_password) {
            alert('Passwords do not match');
            return false;
        }

        //TODO: further password validation

        const email = this.state.email;
        const password  = this.state.password;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
            _this.saveUser(user, _this);
        }).catch(function(error) {
            alert(error.message);
        });
    }

    saveUser(user, _this) {
        const company_name = _this.state.company_name;
        return firebase.database().ref().child(`users/${user.uid}/metadata`)
            .set({
                company_name: company_name,
                email: user.email,
                uid: user.uid
            })
            .then(() => user)
    }

    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col col-sm-6">
                    <h3 className="heading-pullout">Register</h3>
                    <form onSubmit={this.registerNewUser}>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <input name="company_name" type="text" className="form-control" placeholder="Company name" autoFocus autoCapitalize onChange={this.handleInputChange} value={this.state.company_name} />
                            </div>
                            <div className="form-group col-md-12">
                                <input name="email" type="text" className="form-control" placeholder="Email" onChange={this.handleInputChange} value={this.state.email} />
                            </div>
                            <div className="form-group col-md-12">
                                <input name="password" type="password" className="form-control" placeholder="Password" onChange={this.handleInputChange} value={this.state.password} />
                            </div>
                            <div className="form-group col-md-12">
                                <input name="confirm_password" type="password" className="form-control" placeholder="Confirm Password" onChange={this.handleInputChange} value={this.state.confirm_password} />
                            </div>
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;