import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {isAuthenticated} from "../helper/session_state_helper";
import {ERROR, LOGIN} from "../helper/path";
import {request} from "../helper/backend_client";

export default function TicketDetails() {

    const {ticketId} = useParams();
    const [ticket, setTicket] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate(LOGIN)
        } else {
            request(
                "ticket/" + ticketId,
                "GET",
                {}
            ).then(response => {
                setTicket(response.data);
            }).catch((error) => {
                navigate(ERROR);
            });
        }
    }, [navigate])

    if (!ticketId) {
        return <div>No ticket selected</div>;
    }

    return (
        <div>
            <h2>Ticket Details</h2>
            <p><strong>ID:</strong> {ticket.id}</p>
            <p><strong>Title:</strong> {ticket.title}</p>
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
            <p><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
        </div>
    );
};