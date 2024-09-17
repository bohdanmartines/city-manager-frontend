import * as React from "react";
import {request} from "../backend_client";

export default class ProtectedContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        request(
            "mock/messages",
            "GET",
            {}
        ).then(response => {
            this.setState({data: response.data});
        });
    }

    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Response from the backend</h5>
                            <ul>
                                {this.state.data && this.state.data.map((line) => <li>{line}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}