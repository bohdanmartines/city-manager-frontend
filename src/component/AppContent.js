import ErrorComponent from "./ErrorComponent";
import DashboardComponent from "./DashboardComponent";
import AuthComponent from "./AuthComponent";
import {Navigate, Route, Routes} from "react-router-dom";
import {ERROR, HOME, LOGIN, NEW_TICKET, ROOT, TICKET_DETAILS_FULL_PATH} from "../helper/path";
import NewTicketComponent from "./NewTicketComponent";
import TicketDetails from "./TicketDetailsComponent";

export default function AppContent({setLoggedIn}) {

    return (
        <Routes>
            <Route path={ROOT} element={<Navigate to={HOME}/>}/>
            <Route path={HOME} element={<DashboardComponent/>}/>
            <Route path={NEW_TICKET} element={<NewTicketComponent/>}/>
            <Route path={TICKET_DETAILS_FULL_PATH} element={<TicketDetails/>} />
            <Route path={LOGIN} element={<AuthComponent setLoggedIn={setLoggedIn}/>}/>
            <Route path={ERROR} element={<ErrorComponent/>}/>
            <Route path="*" element={<ErrorComponent message="Page not found"/>}/>
        </Routes>
    );
}