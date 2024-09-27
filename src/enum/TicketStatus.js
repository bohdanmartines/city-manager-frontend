export const TicketStatus = {
    OPEN: 'OPEN',
    IN_PROGRESS: 'IN PROGRESS',
    RESOLVED: 'RESOLVED',
    DISCARDED: 'DISCARDED'
};

export const getTicketStatusByKey = (searchKey) => {
    if (searchKey === undefined || searchKey === null) {
        return undefined;
    }
    for (const key of Object.keys(TicketStatus)) {
        if (searchKey.toUpperCase() === key) {
            return TicketStatus[key];
        }
    }
}