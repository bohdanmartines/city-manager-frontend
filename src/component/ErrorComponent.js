import * as React from "react";

export default function ErrorComponent({message}) {

    const DEFAULT_MESSAGE = "Looks like something went wrong, please try again...";

    return (
        <div className="row justify-content-md-center">
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Error page</h1>
                    <p className="lead">{message ? message : DEFAULT_MESSAGE}</p>
                </div>
            </div>
        </div>
    );
}