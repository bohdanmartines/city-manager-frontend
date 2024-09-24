import * as React from "react";
import {useEffect, useState} from "react";
import {request} from "../helper/backend_client";
import {isAuthenticated} from "../helper/session_state_helper";
import {useNavigate} from "react-router-dom";
import {LOGIN} from "../helper/path";
import Dashboard from "./Dashboard";

export default function ProtectedContent() {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate(LOGIN)
        } else {
            request(
                "mock/messages",
                "GET",
                {}
            ).then(response => {
                setData(response.data);
            });
        }
    }, [navigate])

    const sampleTickets = [
        { id: 1, title: 'Issue with login', description: 'Cannot login to the system', status: 'Open', createdAt: '2024-09-23T10:00:00Z' },
        { id: 2, title: 'Page not loading', description: 'Dashboard page is not loading', status: 'In Progress', createdAt: '2024-09-22T12:30:00Z' },
        { id: 3, title: 'Error in console', description: 'Getting error in console on clicking submit', status: 'Closed', createdAt: '2024-09-21T14:45:00Z' },
    ];

    return (
        <div className="row justify-content-md-center">
            <div className="col-6">
                <Dashboard tickets={sampleTickets}/>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Response from the backend</h5>
                        <ul>
                            {data && data.map((line) => <li key={line}>{line}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
