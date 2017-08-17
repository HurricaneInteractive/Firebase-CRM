import React , { Component } from 'react';

class Register extends Component {
    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col col-sm-6">
                    <h3 className="heading-pullout">Register</h3>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <input type="text" className="form-control" placeholder="First name" autoFocus autoCapitalize />
                            </div>
                            <div className="form-group col-md-6">
                                <input type="text" className="form-control" placeholder="Last name" autoFocus autoCapitalize />
                            </div>
                            <div className="form-group col-md-12">
                                <input type="text" className="form-control" placeholder="Email" />
                            </div>
                            <div className="form-group col-md-12">
                                <input type="password" className="form-control" placeholder="Password" />
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