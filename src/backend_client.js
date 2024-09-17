import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const ACCESS_TOKEN_NAME = 'access_token';
const REFRESH_TOKEN_NAME = 'refresh_token';

export const getAccessToken = () => {
    return window.localStorage.getItem(ACCESS_TOKEN_NAME);
}

export const setAuthTokens = (accessToken, refreshToken) => {
    window.localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
    window.localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken);
}

export const clearAuthTokens = () => {
    window.localStorage.removeItem(ACCESS_TOKEN_NAME);
    window.localStorage.removeItem(REFRESH_TOKEN_NAME);
}

export const request = (url, method, data) => {
    let headers = {};
    let accessToken = getAccessToken();
    if (accessToken !== null && accessToken !== "null") {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return axios({
        url: url,
        method: method,
        data: data
    })
};