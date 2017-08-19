import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Loading = (props) => {
    return (
        <div id="site-loading">
            <h3>Loading
                <svg width="120" height="30" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#fff">
                    <circle cx="15" cy="15" r="15">
                        <animate attributeName="r" from="15" to="15"
                                begin="0s" dur="0.8s"
                                values="15;9;15" calcMode="linear"
                                repeatCount="indefinite" />
                        <animate attributeName="fillOpacity" from="1" to="1"
                                begin="0s" dur="0.8s"
                                values="1;.5;1" calcMode="linear"
                                repeatCount="indefinite" />
                    </circle>
                    <circle cx="60" cy="15" r="9" fillOpacity="0.3">
                        <animate attributeName="r" from="9" to="9"
                                begin="0s" dur="0.8s"
                                values="9;15;9" calcMode="linear"
                                repeatCount="indefinite" />
                        <animate attributeName="fillOpacity" from="0.5" to="0.5"
                                begin="0s" dur="0.8s"
                                values=".5;1;.5" calcMode="linear"
                                repeatCount="indefinite" />
                    </circle>
                    <circle cx="105" cy="15" r="15">
                        <animate attributeName="r" from="15" to="15"
                                begin="0s" dur="0.8s"
                                values="15;9;15" calcMode="linear"
                                repeatCount="indefinite" />
                        <animate attributeName="fillOpacity" from="1" to="1"
                                begin="0s" dur="0.8s"
                                values="1;.5;1" calcMode="linear"
                                repeatCount="indefinite" />
                    </circle>
                </svg>
            </h3>
        </div>
    )
}

export const UserSidebar = (props) => {
    return (
        <ul className="sidebar-nav">
            <li>
                <span class="oi oi-dashboard"></span>
                <NavLink to="/dashboard" activeClassName="selected">Dashboard</NavLink>
            </li>
            <li>
                <span class="oi oi-person"></span>
                <NavLink to="/profile" activeClassName="selected">Profile</NavLink>
            </li>
            <li>
                <span class="oi oi-spreadsheet"></span>
                <a href="#">Customers</a>
            </li>
            <li>
                <span class="oi oi-chat"></span>
                <a href="#">Messages</a>
            </li>
        </ul>
    )
}