import * as React from "react";

import WelcomeContent from "./WelcomeContent";
import ProtectedContent from "./ProtectedContent";
import AuthComponent from "./AuthComponent";
import {request, setAuthTokens} from "../backend_client";

export default class AppContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            getActiveComponent: props.getActiveComponent,
            setActiveComponent: props.setActiveComponent
        }
    }

    onLogin = (e, email, password) => {
        e.preventDefault();
        request("auth/login",
            "POST",
            {email: email, password: password}
        ).then((response) => {
            this.state.setActiveComponent("protected");
            setAuthTokens(response.data.accessToken, response.data.refreshToken);
        }).catch((error) => {
            this.state.setActiveComponent("welcome");
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
        ).then((response) => {
            this.state.setActiveComponent("protected");
            setAuthTokens(response.data.accessToken, response.data.refreshToken);
        }).catch((error) => {
            this.state.setActiveComponent("welcome");
        });
    }

    render() {
        return (
            <div>
                {this.state.getActiveComponent() === "welcome" && <WelcomeContent/>}
                {this.state.getActiveComponent() === "protected" && <ProtectedContent/>}
                {this.state.getActiveComponent() === "login" &&
                    <AuthComponent onLogin={this.onLogin} onRegister={this.onRegister}/>}
            </div>
        );
    }
}