import React , { Component } from 'react';

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
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col col-sm-6">
                    <h3 className="heading-pullout">Register</h3>
                    <form>
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