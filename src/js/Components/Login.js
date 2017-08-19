import React , { Component } from 'react';
import PropTypes from 'prop-types';

import firebase from '../Firebase/initialize';
import { auth } from '../Firebase/helpers';

import { loginUser } from '../Redux/Actions/userActions';

class Login extends Component {
    constructor() {
        super();

        // Initial state
        this.state = {
            email: '',
            password: ''
        };

        // Bind events
        this.updateStateOnInput = this.updateStateOnInput.bind(this);
        this.loginInUser = this.loginInUser.bind(this);
    }

    // On Change Method to change state
    updateStateOnInput(e) {
        this.setState({
           [e.target.name]: e.target.value 
        });
    }

    // Form Submit method to log a user into the website
    loginInUser(e) {
        e.preventDefault();

        // Get state values
        let email = this.state.email,
            password = this.state.password,
            _this = this;

        // Set authentication persistence
        auth().setPersistence(auth.Auth.Persistence.SESSION).then(function() {
            // Run login function in <App />
            _this.props.login(email, password);
        })
        .catch(function(error) {
            // Catch and alert any errors
            alert(error.message);
        });
    }

    // Display Login form
    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col col-sm-6">
                    <h3 className="heading-pullout">Login</h3>
                    <form onSubmit={this.loginInUser}>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <input type="text" name="email" className="form-control" placeholder="Email" autoFocus value={this.state.email} onChange={this.updateStateOnInput} />
                            </div>
                            <div className="form-group col-md-12">
                                <input type="password" name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.updateStateOnInput} />
                            </div>
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired
}

export default Login;