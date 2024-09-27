import {Badge} from "react-bootstrap";
import {getTicketStatusByKey} from "../enum/TicketStatus";

export default function TicketStatusBadge({status}) {
    if (status !== undefined && status !== null) {
        status = getTicketStatusByKey(status);
    }

    let variant;
    switch (status) {
        case 'OPEN':
            variant = 'secondary';
            break;
        case 'IN PROGRESS':
            variant = 'primary';
            break;
        case 'RESOLVED':
            variant = 'success';
            break;
        case 'DISCARDED':
            variant = 'dark';
            break;
        default:
            variant = 'warning';
    }

    return <Badge bg={variant}>{status}</Badge>;
}