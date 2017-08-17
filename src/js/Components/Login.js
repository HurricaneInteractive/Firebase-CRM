import React , { Component } from 'react';
import PropTypes from 'prop-types';

import firebase from '../Firebase/initialize';
import { auth } from '../Firebase/helpers';
import { Redirect } from 'react-router-dom';

import { loginUser } from '../Redux/Actions/userActions';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };

        this.updateStateOnInput = this.updateStateOnInput.bind(this);
        this.loginInUser = this.loginInUser.bind(this);
    }

    updateStateOnInput(e) {
        this.setState({
           [e.target.name]: e.target.value 
        });
    }

    loginInUser(e) {
        e.preventDefault();

        let email = this.state.email,
            password = this.state.password,
            _this = this;

        auth().setPersistence(auth.Auth.Persistence.SESSION).then(function() {
            _this.props.login(email, password);
        })
        .catch(function(error) {
            alert(error.message);
        });
    }

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