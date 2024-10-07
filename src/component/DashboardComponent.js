import * as React from "react";
import {useEffect, useState} from "react";
import {request} from "../helper/backend_client";
import {isAuthenticated} from "../helper/session_state_helper";
import {Link, useNavigate} from "react-router-dom";
import {ERROR, LOGIN, NEW_TICKET, TICKET_DETAILS_BASE_PATH} from "../helper/path";
import {toLocaleDateString} from "../helper/date_utils";
import {Pagination} from "react-bootstrap";
import TicketStatusBadge from "./TicketStatusBadge";

export default function DashboardComponent() {

    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const maxPages = 10;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate(LOGIN)
        } else {
            request(
                `ticket?page=${page}&size=${size}`,
                "GET",
                {}
            ).then(response => {
                setTickets(response.data.content);
                setTotalPages(response.data.totalPages);
            }).catch(() => {
                navigate(ERROR);
            });
        }
    }, [page, size, navigate])

    function handlePageSizeChange(e) {
        setSize(Number(e.target.value));
        setPage(0);
    }

    const handleJump = (offset) => {
        const newPage = Math.min(Math.max(page + offset, 0), totalPages - 1);
        setPage(newPage);
    };

    function getRelevantPages() {
        if (totalPages <= maxPages) {
            return [...Array(totalPages)].map((value, index) => index);
        }
        const startPage = Math.floor(page/maxPages) * maxPages;
        const endPage = Math.min(totalPages - 1, startPage + maxPages - 1);
        return Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);
    }

    return (
        <div className="row justify-content-md-center">
            <div className="col-7">
                <div className="container mt-4 table-responsive">
                    <h3 className="mb-2">Dashboard</h3>
                    <p className="lead">View existing tickets or create a new one <Link to={NEW_TICKET}>here</Link>.</p>
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 mb-3">
                        <Pagination className="m-0">
                            <Pagination.First onClick={() => setPage(0)} disabled={page === 0}/>
                            <Pagination.Item onClick={() => handleJump(-10)} disabled={page < maxPages}>-10</Pagination.Item>
                            <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 0}/>
                            {getRelevantPages().map((value) => (
                                <Pagination.Item
                                    key={value}
                                    active={value === page}
                                    onClick={() => setPage(value)}
                                >
                                    {value + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === totalPages - 1}/>
                            <Pagination.Item onClick={() => handleJump(10)} disabled={page > totalPages - (maxPages + 1)}>+10</Pagination.Item>
                            <Pagination.Last onClick={() => setPage(totalPages - 1)}
                                             disabled={page === totalPages - 1}/>
                        </Pagination>
                        <div className="d-flex justify-content-end align-items-center">
                            <label htmlFor="ticketsPerPage" className="text-nowrap me-3">Tickets per page:</label>
                            <select
                                id="ticketsPerPage"
                                className="form-select"
                                value={size}
                                onChange={(e) => handlePageSizeChange(e)}
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                    </div>
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
                                <td className="dashboard-text">{ticket.title}</td>
                                <td className="dashboard-text">{ticket.description}</td>
                                <td><TicketStatusBadge status={ticket.status}/></td>
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
