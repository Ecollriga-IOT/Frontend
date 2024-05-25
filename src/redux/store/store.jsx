import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../slices/loginSlice";
import registerSlice from "../slices/registerSlice";
import sidebarReducer from "../slices/sidebarSlice";
import userSlice from "../slices/userSlice";

const store = configureStore({
    reducer: {
        login: loginSlice,
        register: registerSlice,
        sidebar: sidebarReducer,
        user: userSlice,
    },
});

export default store;
