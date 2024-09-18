import * as React from 'react';
import {clearAuthTokens} from "../backend_client";

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logoSrc: props.logoSrc,
            pageTitle: props.pageTitle,
            getActiveComponent: props.getActiveComponent,
            setActiveComponent: props.setActiveComponent
        }
    }

    logout = () => {
        this.state.setActiveComponent("login");
        clearAuthTokens();
    }

    render() {
        return (
            <header className="App-header">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4 text-center">
                        <img src={this.state.logoSrc} alt="logo" className="App-logo"/>
                        <h1 className="App-title">{this.state.pageTitle}</h1>
                    </div>
                    <div className="col-3"></div>
                    {this.state.getActiveComponent() === "protected" &&
                        <button className="btn btn-outline-info col-1 my-4" onClick={this.logout}>Logout</button>}
                </div>
            </header>
        );
    }

}