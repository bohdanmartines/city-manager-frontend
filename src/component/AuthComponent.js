import * as React from 'react';
import classNames from "classnames";

export default class AuthComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: "login",
            name: "",
            surname: "",
            username: "",
            password: "",
            passwordConfirm: "",
            onLogin: props.onLogin,
            onRegister: props.onRegister
        }
    }

    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value})
    }

    onSubmitLogin = (event) => {
        this.state.onLogin(event, this.state.email, this.state.password);
    }

    onSubmitRegister = (event) => {
        this.state.onRegister(
            event,
            this.state.name,
            this.state.surname,
            this.state.email,
            this.state.password,
            this.state.passwordConfirm
        );
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-4 mt-3">
                    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className={classNames("nav-link", this.state.active === "login" ? "active" : "")}
                                    id="tab-login" onClick={() => this.setState({active: "login"})}>Login
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={classNames("nav-link", this.state.active === "register" ? "active" : "")}
                                    id="tab-register" onClick={() => this.setState({active: "register"})}>Register
                            </button>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div
                            className={classNames("tab-pane", "fade", this.state.active === "login" ? "show active" : "")}
                            id="pills-login">
                            <form onSubmit={this.onSubmitLogin} id="login-form">
                                <div className="form-outline">
                                    <input type="text" id="loginEmail" name="email" placeholder="Email"
                                           className="form-control" onChange={this.onChangeHandler}/>
                                    <label htmlFor="loginEmail" className="form-label">Email</label>
                                </div>
                                <div className="form-outline">
                                    <input type="password" id="loginPassword" name="password" placeholder="Password"
                                           className="form-control" onChange={this.onChangeHandler}/>
                                    <label htmlFor="loginPassword" className="form-label">Password</label>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                            </form>
                        </div>

                        <div
                            className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")}
                            id="pills-register">
                            <form onSubmit={this.onSubmitRegister} id="register-form">
                                <div className="form-outline">
                                    <input type="text" id="name" name="name" placeholder="Name"
                                           className="form-control" onChange={this.onChangeHandler}/>
                                    <label htmlFor="name" className="form-label">First name</label>
                                </div>
                                <div className="form-outline">
                                    <input type="text" id="surname" name="surname" placeholder="Surname"
                                           className="form-control" onChange={this.onChangeHandler}/>
                                    <label htmlFor="surname" className="form-label">Surname</label>
                                </div>
                                <div className="form-outline">
                                    <input type="text" id="email" name="email" placeholder="Email"
                                           className="form-control" onChange={this.onChangeHandler}/>
                                    <label htmlFor="email" className="form-label">Email</label>
                                </div>
                                <div className="form-outline">
                                    <input type="password" id="password" name="password" placeholder="Password"
                                           className="form-control" onChange={this.onChangeHandler}/>
                                    <label htmlFor="password" className="form-label">Password</label>
                                </div>
                                <div className="form-outline">
                                    <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm password"
                                           className="form-control" onChange={this.onChangeHandler}/>
                                    <label htmlFor="passwordConfirm" className="form-label">Confirm password</label>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Sign up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}