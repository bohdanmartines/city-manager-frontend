import * as React from 'react';
import {clearAuthTokens} from "../helper/session_state_helper";
import {Link, useNavigate} from "react-router-dom";
import {HOME, LOGIN} from "../helper/path";

export default function Header({logoSrc, pageTitle, loggedIn, setLoggedIn}) {

    const navigate = useNavigate();

    const logout = () => {
        setLoggedIn(false);
        navigate(LOGIN);
        clearAuthTokens();
    }

    return (
        <header className="App-header">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4 text-center clickable" onClick={() => navigate(HOME)}>
                    <img src={logoSrc} alt="logo" className="App-logo"/>
                    <h1 className="App-title">{pageTitle}</h1>
                </div>
                <div className="col-3"></div>
                <div className="col-1 d-flex align-items-center">
                    {loggedIn && <button className="btn btn-outline-info" onClick={logout}>Logout</button>}
                </div>
            </div>
        </header>
    );
}
