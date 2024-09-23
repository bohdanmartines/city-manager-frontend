import axios from 'axios';
import {getAccessToken} from "./session_state_helper";

axios.defaults.baseURL = 'http://localhost:8080/api/';
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
        data: data
    })
};