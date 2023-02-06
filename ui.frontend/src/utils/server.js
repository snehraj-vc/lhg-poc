import axios from 'axios';
import { X_API_KEY } from './constants';

export const getData = (url) => {
    return axios.get(url)
};

export const postData = (url, payload, headers = {}) => {
    headers['x-api-key'] = headers['x-api-key'] || X_API_KEY;
    return axios.post(url, payload, {headers: headers});
};
