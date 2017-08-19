import React, { Component } from 'react';
import firebase from '../../../Firebase/initialize';

export const CompanyInformation = (props) => {

    let info = props.information,
        phone = info.phone,
        address = info.address,
        editing = props.editing;

    typeof info.phone === 'undefined' ? '' : phone = info.phone;
    typeof info.address === 'undefined' ? '' : address = info.address;
    
    const submitChange = (e, name, value) => {
        e.preventDefault();
        props.submitUserChanges(name, value);
    }

    const informationInputs = (icon, type, placeholder, name, value) => {
        let readonly = '';
        editing === false ? readonly = 'form-control form-control-plaintext' : readonly = 'form-control';
        
        const component = (
            <div className="input-group">
                <span className="input-group-addon">
                    <span className={`oi oi-${icon}`}></span>
                </span>
                <input 
                    type={type} 
                    className={readonly}
                    placeholder={placeholder} 
                    aria-label={placeholder} 
                    value={value}
                    name={name}
                    onChange={(e) => (props.handleChange(e))}
                    readOnly={!editing}
                />
                {
                    editing === true ? (
                        <span className="input-group-btn">
                            <button className="btn btn-outline-primary" type="button" onClick={(e) => (submitChange(e, name, value))}>Update</button>
                        </span>
                    ) : (
                        ''
                    )
                }
            </div>
        )
        return component;
    }

    return (
        <div className="card">
            <div className="card-header">
                Company Information
                { 
                    editing === false ? (
                        <span onClick={ () => (props.toggleCompanyInformationEditing(true)) } class="oi oi-pencil"></span>
                    ) : (
                        <span onClick={ () => (props.toggleCompanyInformationEditing(false)) } class="oi oi-x"></span>
                    ) 
                }
            </div>
            <div className="card-body">
                { informationInputs('phone', 'number', 'Phone Number', 'phone', phone) }
                { informationInputs('map-marker', 'text', 'Address', 'address', address) }
            </div>
        </div>
    )
}