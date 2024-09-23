import * as React from 'react';
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";
import {isAuthenticated} from "../helper/session_state_helper";

export default function AuthComponent({onLogin, onRegister}) {

    const [active, setActive] = useState("login");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/protected");
        }
    }, [navigate]);

    const onSubmitLogin = (event) => {
        onLogin(event, email, password);
    }

    const onSubmitRegister = (event) => {
        onRegister(
            event,
            name,
            surname,
            email,
            password,
            passwordConfirm
        );
    }

    return (
        <div className="row justify-content-center">
            <div className="col-4 mt-3">
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className={classNames("nav-link", active === "login" ? "active" : "")}
                                id="tab-login" onClick={() => setActive("login")}>Login
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={classNames("nav-link", active === "register" ? "active" : "")}
                                id="tab-register" onClick={() => setActive("register")}>Register
                        </button>
                    </li>
                </ul>

                <div className="tab-content">
                    <div
                        className={classNames("tab-pane", "fade", active === "login" ? "show active" : "")}
                        id="pills-login">
                        <form onSubmit={onSubmitLogin} id="login-form">
                            <div className="form-outline">
                                <label htmlFor="loginEmail">Email</label>
                                <input type="text" id="loginEmail" name="email" placeholder="Email"
                                       className="form-control" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="form-outline">
                                <label htmlFor="loginPassword">Password</label>
                                <input type="password" id="loginPassword" name="password" placeholder="Password"
                                       className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block form-button">Sign in</button>
                        </form>
                    </div>

                    <div
                        className={classNames("tab-pane", "fade", active === "register" ? "show active" : "")}
                        id="pills-register">
                        <form onSubmit={onSubmitRegister} id="register-form">
                            <div className="form-outline">
                                <label htmlFor="name">First name</label>
                                <input type="text" id="name" name="name" placeholder="Name"
                                       className="form-control" onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="form-outline">
                                <label htmlFor="surname">Surname</label>
                                <input type="text" id="surname" name="surname" placeholder="Surname"
                                       className="form-control" onChange={(e) => setSurname(e.target.value)}/>
                            </div>
                            <div className="form-outline">
                                <label htmlFor="email">Email</label>
                                <input type="text" id="email" name="email" placeholder="Email"
                                       className="form-control" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="form-outline">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" placeholder="Password"
                                       className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="form-outline">
                                <label htmlFor="passwordConfirm">Confirm password</label>
                                <input type="password" id="passwordConfirm" name="passwordConfirm"
                                       placeholder="Confirm password"
                                       className="form-control" onChange={(e) => setPasswordConfirm(e.target.value)}/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block form-button">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}