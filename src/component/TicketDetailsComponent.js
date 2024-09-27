import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {isAuthenticated} from "../helper/session_state_helper";
import {ERROR, HOME, LOGIN} from "../helper/path";
import {request} from "../helper/backend_client";
import {toLocaleDatetimeString} from "../helper/date_utils";
import {Button} from "react-bootstrap";
import TicketStatusBadge from "./TicketStatusBadge";

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
            <div className="row justify-content-md-center">
                <div className="col-6">
                    <div className="container mt-4">
                        <h3 className="mb-3">Ticket Details</h3>
                        <table className="table table-striped table-hover">
                            <tbody>
                            <tr key="id">
                                <th scope="row">Ticket ID</th>
                                <td>{ticket.id}</td>
                            </tr>
                            <tr key="title">
                                <th scope="row">Title</th>
                                <td>{ticket.title}</td>
                            </tr>
                            <tr key="description">
                                <th scope="row">Description</th>
                                <td>{ticket.description}</td>
                            </tr>
                            <tr key="status">
                                <th scope="row">Status</th>
                                <td><TicketStatusBadge status={ticket.status}/></td>
                            </tr>
                            <tr key="creator">
                                <th scope="row">Creator</th>
                                <td>{ticket.creatorEmail}</td>
                            </tr>
                            <tr key="assignee">
                                <th scope="row">Assignee</th>
                                <td>{ticket.assigneeEmail}</td>
                            </tr>
                            <tr key="createdAt">
                                <th scope="row">Creation time</th>
                                <td>{toLocaleDatetimeString(ticket.createdAt)}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="button-container-right">
                            <Button variant="secondary" type="button" onClick={() => navigate(HOME)}>Back to
                                Dashboard</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};