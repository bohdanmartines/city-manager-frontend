import * as React from "react";
import {request} from "../helper/backend_client";
import {useState, useEffect } from "react";

export default function ProtectedContent() {

    const [data, setData] = useState([]);

    useEffect(() => {
        request(
            "mock/messages",
            "GET",
            {}
        ).then(response => {
            setData(response.data);
        });
    }, [])

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
