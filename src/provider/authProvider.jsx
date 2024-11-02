import axiosInstance from "./axiosConfig";

export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", {
    userEmail: credentials.email,
    userPassword: credentials.password,
  });

  if (response.data.user_id) { 
    localStorage.setItem("user_id", response.data.user_id);
    console.warn("Solo user_id almacenado en localStorage.");
  } else {
    console.error("Inicio de sesión fallido: user_id no encontrado en la respuesta.");
  }

  return response.data;
};


export const register = async (credentials) => {
  const response = await axiosInstance.post("/auth/register", {
    userName: credentials.userName,
    userLastName: credentials.userLastName,
    userMotherLastName: credentials.userMotherLastName || "",
    userEmail: credentials.userEmail,
    userPassword: credentials.userPassword,
    userPhone: credentials.userPhone,
    userBirthDate: credentials.userBirthDate,
    imageData: credentials.imageData,
    role: credentials.role,
  });

  if (response.data.access_token) {
    localStorage.setItem("user_id", response.data.user_id);
  }

  return response.data;
};


export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user_id");
};
