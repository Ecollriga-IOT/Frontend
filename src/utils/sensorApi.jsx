import api from './api'; // Axios configurado

// Manejar la apertura del dispositivo
export async function openSensor() {
    try {
        const response = await api.post('https://backend-1-lkvf.onrender.com/swagger-ui/index.html#/mqtt-controller/openDevice');
        if (response.status === 200) {
            return response.data; // Éxito
        }
         new Error(response.data.message || 'Error al abrir el sensor');
    } catch (error) {
        return handleApiError(error); // Manejo del error
    }
}

// Manejar el cierre del dispositivo
export async function closeSensor() {
    try {
        const response = await api.post('https://backend-1-lkvf.onrender.com/swagger-ui/index.html#/mqtt-controller/closeDevice');
        if (response.status === 200) {
            return response.data; // Éxito
        }
        new Error(response.data.message || 'Error al cerrar el sensor');
    } catch (error) {
        return handleApiError(error); // Manejo del error
    }
}

// Obtener datos del sensor
export async function fetchSensorData() {
    try {
        const response = await api.get('https://backend-1-lkvf.onrender.com/swagger-ui/index.html#/mqtt-controller/sensorDevice');
        if (response.status === 200) {
            return response.data; // Devuelve los datos de humedad y temperatura
        }
       new Error(response.data.message || 'Error al obtener los datos del sensor');
    } catch (error) {
        return handleApiError(error); // Manejo del error
    }
}

// Función para manejar errores de API
function handleApiError(error) {
    if (error.response) {
        // Errores enviados por el backend (404, 500, etc.)
        return {
            statusCode: error.response.data.statusCode,
            message: error.response.data.message || 'Error inesperado',
            description: error.response.data.description || 'No se proporcionó una descripción',
            timestamp: error.response.data.timestamp || new Date().toISOString(),
        };
    } else if (error.request) {
        // Error de red o sin respuesta del servidor
        return {
            statusCode: 0,
            message: 'No se pudo conectar con el servidor',
            description: 'Verifica tu conexión a internet o intenta más tarde',
            timestamp: new Date().toISOString(),
        };
    } else {
        // Errores desconocidos
        return {
            statusCode: 0,
            message: error.message || 'Error desconocido',
            description: 'Hubo un problema no especificado',
            timestamp: new Date().toISOString(),
        };
    }
}
