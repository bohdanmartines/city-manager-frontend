import { useState } from 'react';

export default function NewTicketComponent() {

        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');

    const onCreate = (newTicket) => {
        console.log("About to create a new ticket", newTicket);
    };

    const handleSubmit = (e) => {
            e.preventDefault();
            const newTicket = {
                title,
                description,
            };
            onCreate(newTicket);
            setTitle('');
            setDescription('');
        };

    return (
        <div className="row justify-content-md-center">
            <div className="col-6">
                <div className="container mt-5">
                    <h2 className="mb-4">Create New Ticket</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Create Ticket</button>
                    </form>
                </div>
            </div>
        </div>
    )
}