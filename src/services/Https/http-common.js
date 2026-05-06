import axios from 'axios';
import configData from '../../configuration/configData.json'

const http = axios.create({
    baseURL: process.env.REACT_APP_API_BASEURL,
    //  timeout: 300000,
    timeout: 0,
    headers: {},
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    const pan = localStorage.getItem("usertype");

    if (!!token) {
        config.headers["Authorization"] = `Bearer ${token}`;

    }

    return config;
});

http.interceptors.response.use(
    function (response) {
        return response;
    },

    // on Rejected...

    function ({ response }) {
        const res = { ...response.data };
        response.data = res;
        return response;
    }


);

export default http;