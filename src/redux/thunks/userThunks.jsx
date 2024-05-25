import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../../provider/userProvider";
import UserModel from "../../models/UserDto";


export const fetchUser = createAsyncThunk(
    "user/getUser",
    async(_, thunkAPI) => {
        try {
            const response = await getUser();
            const userModel = UserModel.fromJson(response);
            return userModel.toJson();
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);