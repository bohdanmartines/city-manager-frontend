import ErrorComponent from "./ErrorComponent";
import ProtectedContent from "./ProtectedContent";
import AuthComponent from "./AuthComponent";
import {request} from "../helper/backend_client";
import {setAuthTokens} from "../helper/session_state_helper";
import {Route, Routes, useNavigate} from "react-router-dom";

export default function AppContent({activeComponent, setActiveComponent}) {

    const navigate = useNavigate();

    const onLogin = (e, email, password) => {
        e.preventDefault();
        request("auth/login",
            "POST",
            {email: email, password: password}
        ).then((response) => {
            setActiveComponent("protected");
            navigate("protected");
            setAuthTokens(response.data.accessToken, response.data.refreshToken);
        }).catch((error) => {
            setActiveComponent("error");
            navigate("error");
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
            navigate("protected");
            setAuthTokens(response.data.accessToken, response.data.refreshToken);
        }).catch((error) => {
            setActiveComponent("error");
            navigate("error");
        });
    }

    return (
        <div>
            <Routes>
                <Route path="/" element={<ProtectedContent/>}></Route>
                <Route path="/protected" element={<ProtectedContent/>}></Route>
                <Route path="/login" element={<AuthComponent onLogin={onLogin} onRegister={onRegister}/>}></Route>
                <Route path="/error" element={<ErrorComponent/>}></Route>
            </Routes>
        </div>
    );
}