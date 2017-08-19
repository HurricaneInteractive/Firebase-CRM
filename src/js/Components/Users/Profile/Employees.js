import React, { Component } from 'react';

//PROPS
/*
*   employees : List of employees (object)
*/

export const Employees = (props) => {

    // Set initial variables
    let employees = props.employees;
    let numEmployees = 0;

    // Prevent undefined error from happening
    typeof employees === 'undefined' || employees === null || employees === '' ? '' : numEmployees = employees.length;

    // Method to display the card body
    const CardBody = () => {
        // If there is no employees
        // Render a 'Add Employee' button
        if (employees === null || typeof employees === 'undefined' || employees === '') {
            return (
                <div className="card-body text-center">
                    <button type="button" class="btn btn-outline-primary">Add Employee</button>
                </div>
            )
        }
        else {
            // If there is
            // Render employee list & view all link
            return (
                <div className="card-body text-right">
                    <div className="employee-profiles">
                    
                    </div>
                    <a href="#" class="btn btn-link">View All</a>
                </div>
            )
        }
    }

    // Component return function
    return (
        <div className="card employees">
            <div className="card-header">
                Employees ({numEmployees})
                <span class="oi oi-plus"></span>
            </div>
            { CardBody() }
        </div>
    )
}