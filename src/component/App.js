import * as React from "react";

import './App.css';

import logo from '../logo.jpg';
import Header from './Header';
import AppContent from "./AppContent";
import {isAuthenticated} from "../helper/session_state_helper";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        let authenticated = isAuthenticated();
        this.state = {
            activeComponent: authenticated ? "protected" : "login"
        }
    }

    getActiveComponent = () => {
        return this.state.activeComponent;
    }

    setActiveComponent = (activeComponent) => {
        this.setState({activeComponent: activeComponent});
    }

    render() {
        return (
            <div>
                <Header pageTitle="City Manager" logoSrc={logo} getActiveComponent={this.getActiveComponent}
                        setActiveComponent={this.setActiveComponent}>Placeholder</Header>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <AppContent getActiveComponent={this.getActiveComponent}
                                        setActiveComponent={this.setActiveComponent}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
