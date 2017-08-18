import React, { Component } from 'react';

class Profile extends Component {
    render() {
        return (
            <div className="user-inner">
                <h2>Profile</h2>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card text-center">
                            <img class="card-img-top" src="https://source.unsplash.com/WLUHO9A_xik/500x175" alt="Card image cap" />
                            <div class="card-body">
                                <h4 class="card-title">Company Name</h4>
                                <p class="card-text">company@email.com</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        Other information
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;