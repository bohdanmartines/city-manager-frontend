import * as React from "react";

export default class WelcomeContent extends React.Component {
    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Welcome to City Manager application</h1>
                        <p className="lead">Would you like to log in?</p>
                    </div>
                </div>
            </div>
        );
    }
}