import * as React from "react";

export default function ErrorComponent() {
    return (
        <div className="row justify-content-md-center">
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Error page</h1>
                    <p className="lead">Looks like something went wrong, please try again...</p>
                </div>
            </div>
        </div>
    );
}