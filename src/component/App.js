import './App.css';

import logo from '../logo.jpg';
import Header from './Header';
import AppContent from "./AppContent";
import {isAuthenticated} from "../helper/session_state_helper";
import {useState} from "react";

export default function App() {

    const [loggedIn, setLoggedIn] = useState(() => {
        return isAuthenticated();
    });

    const updateLoggedIn = (loggedIn) => {
        setLoggedIn(loggedIn);
    }

    return (
        <div>
            <Header pageTitle="City Manager" logoSrc={logo} loggedIn={loggedIn} setLoggedIn={updateLoggedIn}/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <AppContent setLoggedIn={updateLoggedIn}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
