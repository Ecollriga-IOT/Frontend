import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-1-lkvf.onrender.com/api/mqtt/control', // Ajusta tu base URL si es necesario
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;