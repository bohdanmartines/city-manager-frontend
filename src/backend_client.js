import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (url, method, data) => {
    return axios({
        url: url,
        method: method,
        data: data
    })
};