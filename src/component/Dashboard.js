export default function Dashboard ({ tickets }) {
    return (
        <div className="container mt-4">
            <h3 className="mb-3">Dashboard</h3>
            <p className="lead">View existing tickets or create a new one</p>
            <table className="table table-striped">
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
                    <tr key={ticket.id}>
                        <th scope="row">{ticket.id}</th>
                        <td>{ticket.title}</td>
                        <td>{ticket.description}</td>
                        <td>{ticket.status}</td>
                        <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
