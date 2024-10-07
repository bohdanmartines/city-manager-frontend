import * as React from 'react';
import {clearAuthTokens} from "../helper/session_state_helper";
import {useNavigate} from "react-router-dom";
import {HOME, LOGIN} from "../helper/path";
import {RiLogoutBoxRLine} from "react-icons/ri";

export default function Header({logoSrc, pageTitle, loggedIn, setLoggedIn}) {

    const navigate = useNavigate();

    const logout = () => {
        setLoggedIn(false);
        navigate(LOGIN);
        clearAuthTokens();
    }

    return (
        <header className="App-header">
            <div className="row justify-content-between justify-content-md-around">
                <div className="col-4 text-center clickable" onClick={() => navigate(HOME)}>
                    <div className="d-flex align-items-center">
                        <img src={logoSrc} alt="logo" className="App-logo"/>
                        <h1 className="App-title">{pageTitle}</h1>

                    </div>
                </div>
                <div className="col-2 d-flex align-items-center justify-content-end logout-sign" onClick={logout}>
                    {loggedIn && <div className="d-flex align-items-center">
                        <RiLogoutBoxRLine size={28}/>
                        <div className="d-none d-md-block ms-2">Logout</div>
                    </div>}

                </div>
            </div>
        </header>
    );
}
