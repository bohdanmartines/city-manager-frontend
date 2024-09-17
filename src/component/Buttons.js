import * as React from "react";

export default class Buttons extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-12 mt-3 text-center">
                    <button className="btn btn-primary m-1" onClick={this.props.login}>Login</button>
                    <button className="btn btn-dark m-1" onClick={this.props.logout}>Logout</button>
                </div>
            </div>
        )
    }
}