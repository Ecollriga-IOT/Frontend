import CropField from "../pages/models/CropFieldDto";
import axiosInstance from "./axiosConfig";

export const getCropFields = async () => {
  const userId = localStorage.getItem("user_id");
  if (!userId) {
      throw new Error("User ID not found. Please log in.");
  }
  const response = await axiosInstance.get(`/cropfield/user/${userId}`);
  return response.data.map((cropField) => CropField.fromJson(cropField));
}

export const getCropFieldById = async (cropFieldId) => {
  const response = await axiosInstance.get(`/cropfield/${cropFieldId}`);
  return CropField.fromJson(response.data);
}

export const updateCropField = async (cropField) => {
  const cropFieldId = cropField.cropFieldId;
  if (!cropFieldId ) {
      throw new Error("User ID not found. Please log in.");
  }
  const response = await axiosInstance.put(`/cropfield/${cropFieldId}`, cropField);
  return CropField.fromJson(response.data);
}

export const createCropField = async (cropField) => {
  const userId = localStorage.getItem("user_id");
  if (!userId) {
      throw new Error("User ID not found. Please log in.");
  }
  const response = await axiosInstance.post(`/cropfield/user/${userId}`, cropField);
  return CropField.fromJson(response.data);
};

export const deleteCropField = async (cropFieldId) => {
  const response = await axiosInstance.delete(`/cropfield/${cropFieldId}`);
  return response.data;
};