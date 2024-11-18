// utils/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-1-lkvf.onrender.com',
});

export default api;
