export const toLocaleDateString = (date) => {
    if (date === undefined || date === null) {
        return date;
    }
    return new Date(date).toLocaleDateString();
}

export const toLocaleDatetimeString = (date) => {
    if (date === undefined || date === null) {
        return date;
    }
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString() + " " + dateObject.toLocaleTimeString();
}
