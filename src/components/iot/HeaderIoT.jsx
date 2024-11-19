import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSensorData, openSensor, closeSensor } from '../../redux/thunks//sensorThunks';

const HeaderIot = () => {
    const dispatch = useDispatch();
    const { humidity, temperature, isSensorOpen, loading, error } = useSelector((state) => state.sensor);

    useEffect(() => {
        dispatch(fetchSensorData());
        const interval = setInterval(() => dispatch(fetchSensorData()), 5000);
        return () => clearInterval(interval);
    }, [dispatch]);

    return (
        <header>
            <h1>IoT Dashboard</h1>
            {loading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    <p>Humedad: {humidity !== null ? `${humidity}%` : 'Sin datos'}</p>
                    <p>Temperatura: {temperature !== null ? `${temperature}°C` : 'Sin datos'}</p>
                </div>
            )}
            <div>
                <button onClick={() => dispatch(openSensor())} disabled={isSensorOpen}>
                    Abrir Sensor
                </button>
                <button onClick={() => dispatch(closeSensor())} disabled={!isSensorOpen}>
                    Cerrar Sensor
                </button>
            </div>
        </header>
    );
};

export default HeaderIot;
