import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import firebase from '../../../Firebase/initialize';

class NewCustomer extends Component {
    
    constructor() {
        super();
        this.state = {
            company_name: '',
            email: '',
            phone: '',
            address: '',
            redirect: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createCustomerAccount = this.createCustomerAccount.bind(this);
    }

    handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    createCustomerAccount(e) {
        e.preventDefault();
        const _this = this;
        
        const newCustomer = {
            company_name: this.state.company_name,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address
        };
        
        let customerReference = firebase.database().ref();
        // let key = customerReference.child(`users/${this.props.userId}/customers`).push().getKey();
        customerReference.child(`users/${this.props.userId}/customers`).push(newCustomer).then(function() {
            _this.setState({
                company_name: '',
                email: '',
                phone: '',
                address: '',
                redirect: true
            });
        });
    }

    generateFormInputs(inputs) {
        return inputs.map((input, index) => {
            return (
                <div key={index} className="form-group col-md-6">
                    <input 
                        type={input.type} 
                        name={input.name} 
                        className="form-control" 
                        placeholder={input.placeholder}
                        value={this.state[input.name]}
                        onChange={this.handleInputChange}
                    />
                </div>
            )
        });
    }

    render() {
        
        const form_inputs = [
            {
                name: 'company_name',
                placeholder: 'Company Name',
                type: 'text'
            },
            {
                name: 'email',
                placeholder: 'Email',
                type: 'text'
            },
            {
                name: 'phone',
                placeholder: 'Phone',
                type: 'number'
            },
            {
                name: 'address',
                placeholder: 'Address',
                type: 'text'
            }
        ];

        if (this.state.redirect === true) {
            return <Redirect to="/customers" />
        }

        return(
            <div className="user-inner">
                <h2>New Customers</h2>
                <div className="row">
                    <div className="col-sm-9">
                        <form className="new-customer-form">
                            <div className="form-row">
                                { this.generateFormInputs(form_inputs) }
                                <div className="col-sm-12">
                                    <button onClick={this.createCustomerAccount} type="button" class="btn btn-primary">Create</button>
                                    <Link class="btn btn-outline-danger" to="/customers">Cancel</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

NewCustomer.propTypes = {
    userId: PropTypes.string
}

export default NewCustomer;