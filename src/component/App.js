import * as React from "react";

import './App.css';

import logo from '../logo.jpg';
import Header from './Header';
import AppContent from "./AppContent";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeComponent: "welcome"
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
                <Header pageTitle="City Manager" logoSrc={logo}>Placeholder</Header>
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
