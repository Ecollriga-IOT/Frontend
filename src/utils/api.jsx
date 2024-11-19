import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-1-lkvf.onrender.com/swagger-ui/index.html#', // Cambia según tu backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;