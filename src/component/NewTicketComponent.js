import { useState } from 'react';
import {Button, Form} from "react-bootstrap";

export default function NewTicketComponent() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [validated, setValidated] = useState(false);

    const onCreate = (newTicket) => {
        console.log("About to create a new ticket", newTicket);
        // TODO implement a call to the backend to create a ticket
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
            setTitle('');
            setDescription('');
        }
        setValidated(true);
    };

    return (
        <div className="row justify-content-md-center">
            <div className="col-6">
                <div className="container mt-5">
                    <h2 className="mb-4">Create New Ticket</h2>
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
                            <Form.Control.Feedback type="invalid">Please provide ticket title.</Form.Control.Feedback>
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
                            <Form.Control.Feedback type="invalid">Please provide ticket description.</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Create Ticket
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}