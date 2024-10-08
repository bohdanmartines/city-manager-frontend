import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {isAuthenticated} from "../helper/session_state_helper";
import {ERROR, HOME, LOGIN} from "../helper/path";
import {request} from "../helper/backend_client";
import {toLocaleDatetimeString} from "../helper/date_utils";
import {Button} from "react-bootstrap";
import TicketStatusBadge from "./TicketStatusBadge";
import {FaHeart, FaRegHeart} from "react-icons/fa";

export default function TicketDetails() {

    const {ticketId} = useParams();
    const [ticket, setTicket] = useState({});
    const navigate = useNavigate();

    function getTicketData() {
        request(
            "ticket/" + ticketId,
            "GET",
            {}
        ).then(response => {
            setTicket(response.data);
        }).catch(() => {
            navigate(ERROR);
        });
    }

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate(LOGIN)
        } else {
            getTicketData();
        }
    }, [navigate])

    function handleVote(ticketId) {
        console.log(`Vote for ticket: ${ticketId}!`);
        callVote(true);
    }

    function handleUnvote(ticketId) {
        console.log(`Un-vote for ticket: ${ticketId}!`);
        callVote(false);
    }

    function callVote(shouldVote) {
        if (typeof shouldVote !== 'boolean') {
            throw new Error('Parameter of callVote() must be a boolean specifying whether the user wants to vote or un-vote.');
        }
        request(
            "ticket/" + ticketId + (shouldVote ? "/vote" : "/unvote"),
            "POST",
            {}
        ).then(() => {
            getTicketData();
        }).catch(() => {
            navigate(ERROR);
        });
    }

    if (!ticketId) {
        return <div>No ticket selected</div>;
    }

    function renderVoteSign() {
        return (
            <div className="d-flex align-items-center clickable" onClick={() => callVote(!ticket.iVoted)}>
                <div className="me-1">
                    {ticket.iVoted ? <FaHeart className="heart-voted"/> : <FaRegHeart className="heart-not-voted"/>}
                </div>
                <span className="fw-bold text-muted">Vote</span>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-11 col-md-6">
                    <div className="mt-4">
                        <h3 className="mb-3">Ticket Details</h3>
                        <table className="table table-striped">
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
                            <tr key="votes">
                                <th scope="row">Votes</th>
                                <td>
                                    <div className="d-flex">
                                        <p className="me-4"><span>{ticket.votes}</span> votes</p>
                                        <div>
                                            {renderVoteSign()}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="button-container-right mb-5">
                            <Button variant="secondary" type="button" onClick={() => navigate(HOME)}>Back to
                                Dashboard</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};