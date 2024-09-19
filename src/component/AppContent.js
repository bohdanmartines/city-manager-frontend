import * as React from "react";

import ErrorComponent from "./ErrorComponent";
import ProtectedContent from "./ProtectedContent";
import AuthComponent from "./AuthComponent";
import {request} from "../backend_client";
import {setAuthTokens} from "./session_state_helper";

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
            this.state.setActiveComponent("error");
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
            this.state.setActiveComponent("error");
        });
    }

    render() {
        return (
            <div>
                {this.state.getActiveComponent() === "error" && <ErrorComponent/>}
                {this.state.getActiveComponent() === "protected" && <ProtectedContent/>}
                {this.state.getActiveComponent() === "login" &&
                    <AuthComponent onLogin={this.onLogin} onRegister={this.onRegister}/>}
            </div>
        );
    }
}