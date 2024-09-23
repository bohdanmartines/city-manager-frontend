import ErrorComponent from "./ErrorComponent";
import ProtectedContent from "./ProtectedContent";
import AuthComponent from "./AuthComponent";
import {request} from "../helper/backend_client";
import {setAuthTokens} from "../helper/session_state_helper";

export default function AppContent({activeComponent, setActiveComponent}) {

    const onLogin = (e, email, password) => {
        e.preventDefault();
        request("auth/login",
            "POST",
            {email: email, password: password}
        ).then((response) => {
            setActiveComponent("protected");
            setAuthTokens(response.data.accessToken, response.data.refreshToken);
        }).catch((error) => {
            setActiveComponent("error");
        });
    }

    const onRegister = (e, name, surname, email, password, passwordConfirmation) => {
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
            setActiveComponent("protected");
            setAuthTokens(response.data.accessToken, response.data.refreshToken);
        }).catch((error) => {
            setActiveComponent("error");
        });
    }

    return (
        <div>
            {activeComponent === "error" && <ErrorComponent/>}
            {activeComponent === "protected" && <ProtectedContent/>}
            {activeComponent === "login" && <AuthComponent onLogin={onLogin} onRegister={onRegister}/>}
        </div>
    );
}