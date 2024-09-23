import * as React from 'react';
import {clearAuthTokens} from "../helper/session_state_helper";
import {useNavigate} from "react-router-dom";

export default function Header({logoSrc, pageTitle, activeComponent, setActiveComponent}) {

    const navigate = useNavigate();

    const logout = () => {
        setActiveComponent("login");
        navigate("login");
        clearAuthTokens();
    }

    return (
        <header className="App-header">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4 text-center">
                    <img src={logoSrc} alt="logo" className="App-logo"/>
                    <h1 className="App-title">{pageTitle}</h1>
                </div>
                <div className="col-3"></div>
                <div className="col-1 d-flex align-items-center">
                    {activeComponent === "protected" &&
                        <button className="btn btn-outline-info" onClick={logout}>Logout</button>}
                </div>
            </div>
        </header>
    );
}
