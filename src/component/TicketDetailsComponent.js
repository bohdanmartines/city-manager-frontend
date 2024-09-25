import {useParams} from "react-router-dom";

export default function TicketDetails() {

    const {ticketId} = useParams();

    if (!ticketId) {
        return <div>No ticket selected</div>;
    }

    return (
        <div>
            <h2>Ticket Details</h2>
            <p>Ticket ID: {ticketId}</p>
        </div>
    );
};