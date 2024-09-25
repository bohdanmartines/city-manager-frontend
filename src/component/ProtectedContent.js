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
                "ticket",
                "GET",
                {}
            ).then(response => {
                setData(response.data);
            });
        }
    }, [navigate])

    return (
        <div className="row justify-content-md-center">
            <div className="col-6">
                <Dashboard tickets={data}/>
            </div>
        </div>
    );
}
