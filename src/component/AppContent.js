import ErrorComponent from "./ErrorComponent";
import ProtectedContent from "./ProtectedContent";
import AuthComponent from "./AuthComponent";
import {request} from "../helper/backend_client";
import {setAuthTokens} from "../helper/session_state_helper";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {HOME, LOGIN, ROOT} from "../helper/path";

export default function AppContent({setLoggedIn}) {

    const navigate = useNavigate();

    const onLogin = (e, email, password) => {
        e.preventDefault();
        request("auth/login",
            "POST",
            {email: email, password: password}
        ).then((response) => {
            setLoggedIn(true);
            navigate(HOME);
            setAuthTokens(response.data.accessToken, response.data.refreshToken);
        }).catch((error) => {
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
            setLoggedIn(true);
            navigate(HOME);
            setAuthTokens(response.data.accessToken, response.data.refreshToken);
        }).catch((error) => {
            navigate("error");
        });
    }

    return (
        <div>
            <Routes>
                <Route path={ROOT} element={<Navigate to={HOME} />}></Route>
                <Route path={HOME} element={<ProtectedContent/>}></Route>
                <Route path={LOGIN} element={<AuthComponent onLogin={onLogin} onRegister={onRegister}/>}></Route>
                <Route path="/error" element={<ErrorComponent/>}></Route>
                <Route path="*" element={<ErrorComponent message="Page not found"/>}></Route>
            </Routes>
        </div>
    );
}