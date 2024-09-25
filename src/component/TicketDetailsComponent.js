import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {isAuthenticated} from "../helper/session_state_helper";
import {LOGIN} from "../helper/path";

export default function TicketDetails() {

    const {ticketId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate(LOGIN)
        }
    }, [navigate])

    if (!ticketId) {
        return <div>No ticket selected</div>;
    }

    return (
        <div>
            <h2>Ticket Details</h2>
            <p>Ticket ID: {ticketId}</p>
        </div>
    );
};