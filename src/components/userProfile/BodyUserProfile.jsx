import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateUserDto } from "../../redux/thunks/userThunks";
import { Upload } from "antd";
import { storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { set } from "firebase/database";
import { useNavigate } from "react-router-dom";

export const BodyUserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    userLastName: "",
    userMotherLastName: "",
    userEmail: "",
    userPhone: "",
    userBirthDate: "",
    imageData: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName || "",
        userLastName: user.userLastName || "",
        userMotherLastName: user.userMotherLastName || "",
        userEmail: user.userEmail || "",
        userPhone: user.userPhone || "",
        userBirthDate: user.userBirthDate || "",
        imageData: user.imageData || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = async () => {
    if (isEditing) {
      if (formData.imageData instanceof File) {
        try {
          setIsUploading(true);
          const imageRef = ref(storage, `profileImages/${formData.userEmail}`);
          await uploadBytes(imageRef, formData.imageData);
          const downloadURL = await getDownloadURL(imageRef);
          formData.imageData = downloadURL;
        } catch (error) {
          console.error("Error uploading image: ", error);
        }
      }
      dispatch(updateUserDto(formData));
      setIsUploading(false);
    }
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageData: file,
      });
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handlePay = () => {
    navigate("/dashboard/metodos-de-pago");
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;

  return (
    <div className="w-[100%] md:w-[80%]">
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div>
            <label className="block text-gray-700">Nombres</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-gray-700">Número Telefónico</label>
            <input
              type="text"
              name="userPhone"
              value={formData.userPhone}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <div className="relative">
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 pr-10"
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-green-500">✓</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <label className="block text-gray-700">Apellido</label>
            <input
              type="text"
              name="userLastName"
              value={`${formData.userLastName} ${formData.userMotherLastName}`}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-gray-700">Fecha de Cumpleaños</label>
            <input
              type="date"
              name="userBirthDate"
              value={formData.userBirthDate}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-gray-700">Contraseña</label>
            <div className="relative">
              <input
                type="password"
                value="********************"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 pr-10"
                readOnly
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-green-500">✓</span>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <label className="block text-gray-700">Imagen de Perfil</label>
          <div className="flex flex-col items-start">
            <img
              src={
                formData.imageData ||
                "https://ui-avatars.com/api/?name=User&background=c7d2fe&color=3730a3&bold=true"
              }
              alt="profile"
              className="w-24 h-24 rounded-full"
            />
            {isEditing && (
              <>
                <label className="block text-gray-700 mt-2">
                  Actualizar Enlace de Imagen
                </label>
                <input
                  type="text"
                  name="imageData"
                  value={formData.imageData}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  onChange={handleInputChange}
                />
                <label className="block text-gray-700 mt-2">
                  Subir Nueva Imagen
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    className="mt-1 block w-full"
                    onChange={handleImageChange}
                  />
                  <Upload className="ml-2 text-blue-500 text-2xl cursor-pointer" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center">
        <button onClick={() => {
          handlePay();
        }} className="flex items-center text-red-600 hover:text-red-800">
          <span>Agregar Método de Pago</span>
          <span className="ml-2 text-2xl">+</span>
        </button>
      </div>

      <div className="mt-8 flex justify-start space-x-4">
        {/* <button className="py-2 px-4 border border-red-600 text-red-600 rounded-md hover:bg-red-100">
          Cancel
        </button> */}
        <button
          onClick={handleEditClick}
          className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
          disabled={isUploading} // Deshabilita el botón mientras se está subiendo la imagen
        >
          {isEditing ? (isUploading ? "Guardando..." : "Guardar") : "Editar"}
        </button>

        {isEditing &&
          !isUploading && ( // Muestra el botón Cancelar solo si está en modo edición y no se está subiendo ninguna imagen
            <button
              onClick={handleCancelClick}
              className="py-2 px-4 border border-red-600 text-red-600 rounded-md hover:bg-red-100"
            >
              Cancelar
            </button>
          )}
      </div>
    </div>
  );
};
