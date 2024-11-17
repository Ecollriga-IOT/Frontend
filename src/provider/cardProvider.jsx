import Card from "../pages/models/CardDto"; // Importa el modelo Card
import axiosInstance from "./axiosConfig";

// Crear una nueva tarjeta (Card) para un usuario específico
export const createCard = async (userId, cardData) => {
  try {
    const response = await axiosInstance.post(`/cards/${userId}`, cardData);
    return Card.fromJson(response.data); // Convierte la respuesta a una instancia de Card
  } catch (error) {
    console.error("Error creando la tarjeta:", error.message);
    throw new Error("No se pudo crear la tarjeta. Verifica los datos ingresados.");
  }
};

// Obtener una tarjeta específica por su ID
export const getCardById = async (cardId) => {
  try {
    const response = await axiosInstance.get(`/cards/${cardId}`);
    return Card.fromJson(response.data); // Convierte la respuesta a una instancia de Card
  } catch (error) {
    console.error("Error obteniendo la tarjeta:", error.message);
    throw new Error("No se pudo obtener la tarjeta especificada.");
  }
};

// Actualizar una tarjeta existente
export const updateCard = async (cardId, cardData) => {
  try {
    // Crea el payload eliminando campos innecesarios como userId
    const { userId, ...filteredData } = cardData; // Excluye userId del payload
    const payload = {
      ...filteredData,
      user: {
        id: userId, // Solo incluye el ID del usuario
      },
    };

    const response = await axiosInstance.put(`/cards/${cardId}`, payload);
    return response.data; // Retorna la respuesta del backend
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};


// Eliminar una tarjeta por su ID
export const deleteCard = async (cardId) => {
  try {
    const response = await axiosInstance.delete(`/cards/${cardId}`);
    return response.data; // No se necesita conversión porque no regresa un objeto Card
  } catch (error) {
    console.error("Error eliminando la tarjeta:", error.message);
    throw new Error("No se pudo eliminar la tarjeta.");
  }
};

// Obtener todas las tarjetas de un usuario específico
export const getCardsByUserId = async (userId) => {
  try {
    const response = await axiosInstance.get(`/cards/user/${userId}`);
    return response.data.map((card) => Card.fromJson(card)); // Convierte cada tarjeta en una instancia de Card
  } catch (error) {
    console.error("Error obteniendo las tarjetas:", error.message);
    throw new Error("No se pudieron obtener las tarjetas del usuario.");
  }
}; 