// redux/slices/sensorSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Acción para obtener los datos del sensor (temperatura y humedad)
export const fetchSensorData = createAsyncThunk('sensor/fetchSensorData', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/sensorDevice');
        return response.data; // Suponiendo que la respuesta tiene un formato { humidity, temperature }
    } catch (error) {
        return rejectWithValue('Error al obtener los datos del sensor.');
    }
});

// Acción para abrir el dispositivo
export const openSensor = createAsyncThunk('sensor/openSensor', async (_, { rejectWithValue }) => {
    try {
        await api.post('/openDevice');
        return true;
    } catch (error) {
        return rejectWithValue('Error al abrir el sensor.');
    }
});

// Acción para cerrar el dispositivo
export const closeSensor = createAsyncThunk('sensor/closeSensor', async (_, { rejectWithValue }) => {
    try {
        await api.post('/closeDevice');
        return false;
    } catch (error) {
        return rejectWithValue('Error al cerrar el sensor.');
    }
});

const sensorSlice = createSlice({
    name: 'sensor',
    initialState: {
        humidity: null,
        temperature: null,
        isSensorOpen: false,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Maneja las acciones asíncronas
            .addCase(fetchSensorData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSensorData.fulfilled, (state, action) => {
                state.loading = false;
                state.humidity = action.payload.humidity;
                state.temperature = action.payload.temperature;
            })
            .addCase(fetchSensorData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(openSensor.fulfilled, (state) => {
                state.isSensorOpen = true;
            })
            .addCase(openSensor.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(closeSensor.fulfilled, (state) => {
                state.isSensorOpen = false;
            })
            .addCase(closeSensor.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default sensorSlice.reducer;
