import * as React from "react";
import {useEffect, useState} from "react";
import {request} from "../helper/backend_client";
import {isAuthenticated} from "../helper/session_state_helper";
import {Link, useNavigate} from "react-router-dom";
import {ERROR, LOGIN, NEW_TICKET, TICKET_DETAILS_BASE_PATH} from "../helper/path";
import {toLocaleDateString} from "../helper/date_utils";

export default function DashboardComponent() {

    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate(LOGIN)
        } else {
            request(
                "ticket",
                "GET",
                {}
            ).then(response => {
                setTickets(response.data);
            }).catch(() => {
                navigate(ERROR);
            });
        }
    }, [navigate])

    return (
        <div className="row justify-content-md-center">
            <div className="col-6">
                <div className="container mt-4">
                    <h3 className="mb-3">Dashboard</h3>
                    <p className="lead">View existing tickets or create a new one <Link to={NEW_TICKET}>here</Link>.</p>
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Ticket ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created At</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket.id} className="clickable"
                                onClick={() => navigate(`${TICKET_DETAILS_BASE_PATH}/${ticket.id}`)}>
                                <th scope="row">{ticket.id}</th>
                                <td>{ticket.title}</td>
                                <td>{ticket.description}</td>
                                <td>{ticket.status}</td>
                                <td>{toLocaleDateString(ticket.createdAt)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
