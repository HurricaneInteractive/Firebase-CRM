import React, { Component } from 'react';
import firebase from '../../../Firebase/initialize';

// PROPS
/*
*   information                         : Company information       (object)
*   editing                             : Editing state             (boolean)
*   toggleCompanyInformationEditing     : Toggle editing state      (func)
*   handleChange                        : Input on change method    (func)
*   submitUserChanges                   : Submit user change        (func)
*/

export const CompanyInformation = (props) => {

    // Set default variable values
    let info = props.information,
        phone = info.phone,
        address = info.address,
        editing = props.editing;

    // Prevent undefined error from running
    typeof info.phone === 'undefined' ? '' : phone = info.phone;
    typeof info.address === 'undefined' ? '' : address = info.address;
    
    // On Change run function to update database
    const submitChange = (e, key, value) => {
        e.preventDefault();
        props.submitUserChanges(key, value);
    }

    // Function to render all inputs used under the Company information card
    /*
    *
    *   icon: icon class for iconic
    *   type: input type
    *   placeholder: Placeholder text for empty inputs
    *   name: value attr of inputs (name as Profile componenet state)
    *   value: Input value
    */
    const informationInputs = (icon, type, placeholder, name, value) => {
        // Sets readonly class if editing is false
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

    // Render function for component
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