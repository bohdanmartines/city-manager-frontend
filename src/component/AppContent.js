import * as React from "react";

import WelcomeContent from "./WelcomeContent";
import ProtectedContent from "./ProtectedContent";
import AuthComponent from "./AuthComponent";
import {request} from "../backend_client";
import Buttons from "./Buttons";

export default class AppContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeComponent: "welcome"
        }
    }

    login = () => {
        this.setState({activeComponent: "login"});
    }

    logout = () => {
        this.setState({activeComponent: "welcome"});
    }

    onLogin = (e, username, password) => {
        e.preventDefault();
        request("auth/login",
            "POST",
            {username: username, password: password}
        ).then((response) =>
            this.setState({activeComponent: "login"})
        ).catch((error) => {
            this.setState({activeComponent: "welcome"});
        });
    }

    onRegister = (e, name, surname, username, password, passwordConfirmation) => {
        e.preventDefault();
        request("auth/register",
            "POST",
            {
                name: name,
                surname: surname,
                username: username,
                password: password,
                passwordConfirmation: passwordConfirmation
            }
        ).then((response) =>
            this.setState({activeComponent: "login"})
        ).catch((error) => {
            this.setState({activeComponent: "welcome"});
        });
    }

    render() {
        return (
            <div>
                <Buttons login={this.login} logout={this.logout}/>
                {this.state.activeComponent === "welcome" && <WelcomeContent/>}
                {this.state.activeComponent === "protected" && <ProtectedContent/>}
                {this.state.activeComponent === "login" &&
                    <AuthComponent onLogin={this.onLogin} onRegister={this.onRegister}/>}
            </div>
        );
    }
}