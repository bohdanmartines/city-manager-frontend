import * as React from "react";
import {useEffect, useState} from "react";
import {request} from "../helper/backend_client";
import {isAuthenticated} from "../helper/session_state_helper";
import {useNavigate} from "react-router-dom";
import {LOGIN} from "../helper/path";

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

    return (
        <div className="row justify-content-md-center">
            <div className="col-4">
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
