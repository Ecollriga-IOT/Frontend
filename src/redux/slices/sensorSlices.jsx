// sensorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const sensorSlice = createSlice({
    name: 'sensor',
    initialState: {
        humidity: null,
        temperature: null,
        isSensorOpen: false,
        loading: false,
        error: null,
    },
    reducers: {
        setSensorData(state, action) {
            state.humidity = action.payload.humidity;
            state.temperature = action.payload.temperature;
        },
        toggleSensor(state, action) {
            state.isSensorOpen = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setSensorData, toggleSensor, setLoading, setError } = sensorSlice.actions;
export default sensorSlice.reducer;
