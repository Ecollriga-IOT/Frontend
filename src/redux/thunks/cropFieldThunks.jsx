import { createAsyncThunk } from "@reduxjs/toolkit";
import CropField from "../../pages/models/CropFieldDto";
import { getCropFieldById, getCropFields, updateCropField } from "../../provider/cropFieldProvider";


export const fetchCropFields = createAsyncThunk(
    "cropField/getCropFields",
    async (_, thunkAPI) => {
        try {
            const response = await getCropFields();
            const cropFields = response.map(cropField => CropField.fromJson(cropField).toJson());
            return cropFields;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchCropFieldById = createAsyncThunk(
    "cropField/getCropFieldById",
    async (cropFieldId, thunkAPI) => {
        try {
            const response = await getCropFieldById(cropFieldId);
            const cropFieldModel = CropField.fromJson(response);
            return cropFieldModel.toJson();
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateCropFieldDto = createAsyncThunk(
    "cropField/updateCropField",
    async (cropField, thunkAPI) => {
        try {
            const response = await updateCropField(cropField);
            const cropFieldModel = CropField.fromJson(response);
            return cropFieldModel.toJson();
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);