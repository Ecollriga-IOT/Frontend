import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, updateUser } from "../../provider/userProvider";
import UserModel from "../../pages/models/UserDto";


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

export const updateUserDto = createAsyncThunk(
    "user/updateUser",
    async(user, thunkAPI) => {
        try {
            const response = await updateUser(user);
            const userModel = UserModel.fromJson(response);
            return userModel.toJson();
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);