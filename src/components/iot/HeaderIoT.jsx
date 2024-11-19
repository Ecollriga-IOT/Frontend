import React, { useState, useEffect } from 'react';
import { fetchSensorData, openSensor, closeSensor } from '../../utils/sensorApi';

export const HeaderIoT = () => {
    const [humidity, setHumidity] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [isSensorOpen, setIsSensorOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getSensorData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchSensorData();
            if (data.statusCode && data.statusCode !== 200) {
                setError(data.message || 'Error al obtener los datos del sensor');
            } else {
                setHumidity(data.humidity);
                setTemperature(data.temperature);
            }
        } catch (err) {
            setError('Error al obtener los datos del sensor');
        }
        setLoading(false);
    };

    const handleOpenSensor = async () => {
        setError(null);
        try {
            const response = await openSensor();
            if (response.statusCode && response.statusCode !== 200) {
                setError(response.message || 'Error al abrir el sensor');
            } else {
                setIsSensorOpen(true);
            }
        } catch (err) {
            setError('Error al abrir el sensor');
        }
    };

    const handleCloseSensor = async () => {
        setError(null);
        try {
            const response = await closeSensor();
            if (response.statusCode && response.statusCode !== 200) {
                setError(response.message || 'Error al cerrar el sensor');
            } else {
                setIsSensorOpen(false);
            }
        } catch (err) {
            setError('Error al cerrar el sensor');
        }
    };

    useEffect(() => {
        getSensorData();
        const interval = setInterval(getSensorData, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header>
            <h1>IoT Dashboard</h1>

            {loading ? (
                <p>Cargando datos...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div>
                    <p>Humedad: {humidity !== null ? `${humidity}%` : 'Sin datos'}</p>
                    <p>Temperatura: {temperature !== null ? `${temperature}°C` : 'Sin datos'}</p>
                </div>
            )}

            <div style={{ marginTop: '10px' }}>
                <button onClick={handleOpenSensor} disabled={isSensorOpen}>
                    Abrir Sensor
                </button>
                <button onClick={handleCloseSensor} disabled={!isSensorOpen}>
                    Cerrar Sensor
                </button>
            </div>
        </header>
    );
};