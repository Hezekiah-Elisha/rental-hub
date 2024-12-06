import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:7000/',
    timeout: 1000,
    headers: {'content-type': 'application/json'}
});