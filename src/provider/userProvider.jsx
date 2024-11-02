import UserModel from "../pages/models/UserDto";
import axiosInstance from "./axiosConfig";

export const getUser = async () => {
    const userId = localStorage.getItem("user_id");
    const response = await axiosInstance.get(`/users/${userId}`);
    return UserModel.fromJson(response.data);
}

export const updateUser = async (user) => {
    const userId = localStorage.getItem("user_id");
    const response = await axiosInstance.put(`/users/${userId}`, user);
    return UserModel.fromJson(response.data);
}