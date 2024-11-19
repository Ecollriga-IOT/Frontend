import { setSensorData, toggleSensor, setLoading, setError } from '../slices/sensorSlices';
import api from '../../utils/api'; 

export const fetchSensorData = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await api.get('/mqtt-controller/sensor-data');
        dispatch(setSensorData(response.data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError('Error al obtener los datos del sensor.'));
        dispatch(setLoading(false));
    }
};

export const openSensor = () => async (dispatch) => {
    try {
        await api.post('/mqtt-controller/control/open');
        dispatch(toggleSensor(true));
    } catch (error) {
        dispatch(setError('Error al abrir el sensor.'));
    }
};

export const closeSensor = () => async (dispatch) => {
    try {
        await api.post('/mqtt-controller/control/close');
        dispatch(toggleSensor(false));
    } catch (error) {
        dispatch(setError('Error al cerrar el sensor.'));
    }
};
