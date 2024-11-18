import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../slices/loginSlice";
import registerSlice from "../slices/registerSlice";
import sidebarReducer from "../slices/sidebarSlice";
import userSlice from "../slices/userSlice";
import cropFieldSlice from "../slices/cropFieldSlice";
import updateCropFieldSlice from "../slices/updateCropFieldSlice";
import cardSlice from "../slices/cardSlice";
import sensorReducer from '../slices/sensorSlices';

const store = configureStore({
    reducer: {
        login: loginSlice,
        register: registerSlice,
        sidebar: sidebarReducer,
        sensor: sensorReducer,
        user: userSlice,
        cropfield: cropFieldSlice,
        updateCropField: updateCropFieldSlice,
        cards: cardSlice,
    },
});

export default store;
