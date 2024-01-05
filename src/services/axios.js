import axios from 'axios';
import env from '../config/env';

export default axios.create({
    baseURL: env.api.baseUrl,
    headers: {},
});

console.warn("process.env.NODE_ENV" ,process.env.NODE_ENV);
