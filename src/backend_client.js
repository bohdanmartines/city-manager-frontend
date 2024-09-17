import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
}

export const setAuthToken = (token) => {
    window.localStorage.setItem('auth_token', token);
}

export const request = (url, method, data) => {
    let headers = {};
    let authToken = getAuthToken();
    if (authToken !== null && authToken !== "null") {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    return axios({
        url: url,
        method: method,
        data: data
    })
};