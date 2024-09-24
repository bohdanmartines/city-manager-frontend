import ErrorComponent from "./ErrorComponent";
import ProtectedContent from "./ProtectedContent";
import AuthComponent from "./AuthComponent";
import {Navigate, Route, Routes} from "react-router-dom";
import {ERROR, HOME, LOGIN, ROOT} from "../helper/path";

export default function AppContent({setLoggedIn}) {

    return (
        <div>
            <Routes>
                <Route path={ROOT} element={<Navigate to={HOME}/>}/>
                <Route path={HOME} element={<ProtectedContent/>}/>
                <Route path={LOGIN} element={<AuthComponent setLoggedIn={setLoggedIn}/>}/>
                <Route path={ERROR} element={<ErrorComponent/>}/>
                <Route path="*" element={<ErrorComponent message="Page not found"/>}/>
            </Routes>
        </div>
    );
}