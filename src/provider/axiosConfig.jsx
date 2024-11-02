import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://backendiot-v1.onrender.com/api/regadiot/v1';
console.log("URL base de la API:", API_URL);
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token a cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
