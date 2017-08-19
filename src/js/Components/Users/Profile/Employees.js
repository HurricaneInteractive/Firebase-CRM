import React, { Component } from 'react';

export const Employees = (props) => {
    // console.log(props);

    let employees = props.employees;
    let numEmployees = 0;

    typeof employees === 'undefined' || employees === null || employees === '' ? '' : numEmployees = employees.length;

    const CardBody = () => {
        // console.log(employees);
        if (employees === null || typeof employees === 'undefined' || employees === '') {
            return (
                <div className="card-body text-center">
                    <button type="button" class="btn btn-outline-primary">Add Employee</button>
                </div>
            )
        }
        else {
            return (
                <div className="card-body text-right">
                    <div className="employee-profiles">
                    
                    </div>
                    <a href="#" class="btn btn-link">View All</a>
                </div>
            )
        }
    }

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