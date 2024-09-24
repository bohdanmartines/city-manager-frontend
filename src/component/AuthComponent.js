import {useState, useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";
import {isAuthenticated, setAuthTokens} from "../helper/session_state_helper";
import {ERROR, HOME} from "../helper/path";
import {request} from "../helper/backend_client";

export default function AuthComponent({setLoggedIn, onRegister}) {

    const [active, setActive] = useState("login");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate(HOME);
        }
    }, [navigate]);

    const onSubmitLogin = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            callLogin();
        }
        setValidated(true);
    }

    function callLogin() {
        request("auth/login",
            "POST",
            {email: email, password: password}
        ).then((response) => {
            setLoggedIn(true);
            navigate(HOME);
            setAuthTokens(response.data.accessToken, response.data.refreshToken);
        }).catch((error) => {
            navigate(ERROR);
        });
    }

    const onSubmitRegister = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true && doesPasswordConfirmationMatch()) {
            callRegister();
        }
        setValidated(true);

    }

    function callRegister() {
        request("auth/register",
            "POST",
            {
                name: name,
                surname: surname,
                email: email,
                password: password,
                confirmPassword: passwordConfirm
            }
        ).then((response) => {
            setLoggedIn(true);
            navigate(HOME);
            setAuthTokens(response.data.accessToken, response.data.refreshToken);
        }).catch((error) => {
            navigate(ERROR);
        });
    }

    function doesPasswordConfirmationMatch() {
        return password === passwordConfirm;
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
                        <Form noValidate validated={validated} onSubmit={onSubmitLogin}>
                            <Form.Group controlId="loginEmail">
                                <Form.Label className="mb-0">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mb-2"
                                />
                                <Form.Control.Feedback type="invalid">Please provide a valid
                                    email.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="loginPassword">
                                <Form.Label className="mb-0">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={8}
                                    className="mb-2"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Password must be minimum 8 characters long.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit" className="btn btn-primary btn-block form-button">Sign in</Button>
                        </Form>
                    </div>

                    <div
                        className={classNames("tab-pane", "fade", active === "register" ? "show active" : "")}
                        id="pills-register">
                        <Form noValidate validated={validated} onSubmit={onSubmitRegister}>
                            <Form.Group controlId="regName">
                                <Form.Label className="mb-0">Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="mb-2"
                                />
                                <Form.Control.Feedback type="invalid">Please provide your name.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="regSurname">
                                <Form.Label className="mb-0">Surname</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Surname"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                    required
                                    className="mb-2"
                                />
                                <Form.Control.Feedback type="invalid">Please provide your surname.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="regEmail">
                                <Form.Label className="mb-0">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mb-2"
                                />
                                <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="regPassword">
                                <Form.Label className="mb-0">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={8}
                                    className="mb-2"
                                />
                                <Form.Control.Feedback type="invalid">Password must be minimum 8 characters
                                    long.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="regConfirmPassword">
                                <Form.Label className="mb-0">Confirm password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm password"
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    required
                                    isInvalid={!doesPasswordConfirmationMatch()}
                                    isValid={doesPasswordConfirmationMatch()}
                                    className="mb-2"
                                />
                                <Form.Control.Feedback type="invalid">Password confirmation does not match.</Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit" className="btn btn-primary btn-block form-button">Sign up</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}