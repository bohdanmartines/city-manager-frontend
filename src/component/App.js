import './App.css';

import logo from '../logo.jpg';
import Header from './Header';
import AppContent from "./AppContent";
import {isAuthenticated} from "../helper/session_state_helper";
import {useState} from "react";

export default function App() {

    const [activeComponent, setActiveComponent] = useState(() => {
        let authenticated = isAuthenticated();
        return authenticated ? "protected" : "login";
    });

    const updateActiveComponent = (activeComponent) => {
        setActiveComponent(activeComponent);
    }

    return (
        <div>
            <Header pageTitle="City Manager" logoSrc={logo} activeComponent={activeComponent}
                    setActiveComponent={updateActiveComponent}/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <AppContent setActiveComponent={updateActiveComponent}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
