import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://api.rental.hub.ke/',
    timeout: 4000,
    headers: {'content-type': 'application/json'}
});