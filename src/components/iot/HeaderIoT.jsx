import React, { useState, useEffect } from 'react';
import { fetchSensorData, openSensor, closeSensor } from '/src/utils/sensorApi';

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
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };
    const handleCloseSensor = async () => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getSensorData().then(r => {});
        const interval = setInterval(getSensorData, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header style={styles.header}>
            <h1>IoT Dashboard</h1>

            {loading ? (
                <p style={styles.loadingText}>Cargando datos...</p>
            ) : error ? (
                <p style={styles.errorText}>{error}</p>
            ) : (
                <div style={styles.sensorDataContainer}>
                    <p style={styles.dataText}>Humidity: {humidity !== null ? `${humidity}%` : 'Sin datos'}</p>
                    <p style={styles.dataText}>Temperature: {temperature !== null ? `${temperature}°C` : 'Sin datos'}</p>
                </div>
            )}

            <div style={styles.buttonsContainer}>
                <button
                    onClick={handleOpenSensor}
                    disabled={isSensorOpen}
                    style={isSensorOpen ? styles.disabledButton : styles.activeButton}
                >
                    Activar Sensor
                </button>
                <button
                    onClick={handleCloseSensor}
                    disabled={!isSensorOpen}
                    style={!isSensorOpen ? styles.disabledButton : styles.activeButton}
                >
                    Desactivar Sensor
                </button>
            </div>
        </header>
    );
};

const styles = {
    header: {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f1f1f1',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '0 auto',
    },
    loadingText: {
        fontSize: '16px',
        color: '#666',
    },
    errorText: {
        fontSize: '16px',
        color: 'red',
    },
    sensorDataContainer: {
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        display: 'inline-block',
        textAlign: 'left',
        minWidth: '200px',
    },
    dataText: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
    },
    buttonsContainer: {
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'space-around',
    },
    activeButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    },
    disabledButton: {
        backgroundColor: '#cccccc',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'not-allowed',
        borderRadius: '5px',
    },
};
