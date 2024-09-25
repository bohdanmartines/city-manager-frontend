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
        console.log("Showing details for ticket ID: " + ticketId)
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

    function formatDateTime(date) {
        if (date === undefined) {
            return date;
        }
        if (date.indexOf('.') !== -1) {
            date = date.split('.')[0];
        }
        if (date.indexOf('T') !== -1) {
            const splitDate = date.split('T');
            return splitDate[0] + " " + splitDate[1];
        }
        return date;
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
                                <td>{ticket.status}</td>
                            </tr>
                            <tr key="createdAt">
                                <th scope="row">Creation time</th>
                                <td>{formatDateTime(ticket.createdAt)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};