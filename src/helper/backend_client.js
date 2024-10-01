import axios from 'axios';
import {getAccessToken} from "./session_state_helper";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL + '/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';


export const request = (url, method, data) => {
    let headers = {};
    let accessToken = getAccessToken();
    if (accessToken !== null && accessToken !== "null") {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return axios({
        url: url,
        method: method,
        headers: headers,
        data: data
    })
};