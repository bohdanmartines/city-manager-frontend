import * as React from "react";

import WelcomeContent from "./WelcomeContent";
import ProtectedContent from "./ProtectedContent";
import AuthComponent from "./AuthComponent";
import {request, setAuthToken} from "../backend_client";
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

    onLogin = (e, email, password) => {
        e.preventDefault();
        request("auth/login",
            "POST",
            {email: email, password: password}
        ).then((response) => {
                this.setState({activeComponent: "protected"});
                setAuthToken(response.data.token);
            }
        ).catch((error) => {
            this.setState({activeComponent: "welcome"});
        });
    }

    onRegister = (e, name, surname, email, password, passwordConfirmation) => {
        e.preventDefault();
        request("auth/register",
            "POST",
            {
                name: name,
                surname: surname,
                email: email,
                password: password,
                confirmPassword: passwordConfirmation
            }
        ).then((response) =>
            this.setState({activeComponent: "protected"})
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