import { createAsyncThunk } from '@reduxjs/toolkit';
import Card from "../../pages/models/CardDto";
import { createCard, getCardById, updateCard, deleteCard, getCardsByUserId } from '../../provider/cardProvider';

// Crear una nueva tarjeta
export const createCardDto = createAsyncThunk(
  'card/createCard',
  async ({ userId, cardData }, thunkAPI) => {
    try {
      const response = await createCard(userId, Card.fromJson(cardData).toJson());
      // Devuelve el objeto serializable
      return Card.fromJson(response).toJson();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Obtener una tarjeta por su ID
export const fetchCardById = createAsyncThunk(
  'card/getCardById',
  async (cardId, thunkAPI) => {
    try {
      const response = await getCardById(cardId);
      return response; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Actualizar una tarjeta existente
export const updateCardDto = createAsyncThunk(
  'card/updateCard',
  async ({ cardId, cardData }, thunkAPI) => {
    try {
      // Convierte el cardData a un objeto serializable usando el modelo Card
      const serializedData = Card.fromJson(cardData).toJson();
      const response = await updateCard(cardId, serializedData);
      return response; // Devuelve la respuesta para actualizar el estado
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Eliminar una tarjeta
export const deleteCardDto = createAsyncThunk(
  'card/deleteCard',
  async (cardId, thunkAPI) => {
    try {
      await deleteCard(cardId);
      return cardId; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchCards = createAsyncThunk(
    'card/getCardByUserId',
    async (userId, thunkAPI) => {
      try {
        const response = await getCardsByUserId(userId); 
        const serializedCards = response.map((card) => Card.fromJson(card).toJson());
        return serializedCards;
          
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );