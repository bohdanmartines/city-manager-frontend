import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {isAuthenticated} from "../helper/session_state_helper";
import {ERROR, HOME, LOGIN, TICKET_DETAILS_BASE_PATH} from "../helper/path";
import {request} from "../helper/backend_client";

export default function NewTicketComponent() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate(LOGIN)
        }
    }, [navigate])

    const onCreate = (newTicket) => {
        request(
            "ticket/new",
            "POST",
            newTicket
        ).then(response => {
            navigate(`${TICKET_DETAILS_BASE_PATH}/${response.data}`);
        }).catch(() => {
            navigate(ERROR);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            const newTicket = {
                title,
                description,
            };
            onCreate(newTicket);
        }
        setValidated(true);
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-11 col-md-6">
                    <div className="container mt-4">
                        <h3 className="mb-4">Create New Ticket</h3>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Please provide ticket
                                    title.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Please provide ticket
                                    description.</Form.Control.Feedback>
                            </Form.Group>
                            <div className="button-container-two-sides">
                                <Button variant="primary" type="submit">Create Ticket</Button>
                                <Button variant="secondary" type="button" onClick={() => navigate(HOME)}>Back to
                                    Dashboard</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}