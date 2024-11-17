import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCardDto, fetchCardById, updateCardDto } from "../../redux/thunks/cardThunks";
import { useParams, useNavigate } from "react-router-dom";

const FormPayMethods = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { card, status, error } = useSelector((state) => state.cards);

  const userId = parseInt(localStorage.getItem("user_id"), 10) || 0;

  const initialState = {
    cardNumber: "",
    cardType: "Visa", // Valor predeterminado
    cardCvv: "",
    cardExpirationDate: "",
    cardAmount: 0,
    cardHolder: "",
    cardMain: false,
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (id) {
      console.log("Fetching card with ID:", id);
      dispatch(fetchCardById(id));
    } else {
      setFormData({ ...initialState });
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (card && id) {
      console.log("Card data loaded:", card)
      setFormData({
        cardNumber: card.cardNumber || "",
        cardType: card.cardType || "Visa",
        cardCvv: card.cardCvv || "",
        cardExpirationDate: card.cardExpirationDate || "",
        cardAmount: card.cardAmount || 0,
        cardHolder: card.cardHolder || "",
        cardMain: card.cardMain || false,
      });
    }
  }, [card, id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let formattedValue = value;

    // Eliminar espacios del número de tarjeta
    if (name === "cardNumber") {
      formattedValue = value.replace(/\s+/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : formattedValue,
    }));
  };

  const validateForm = () => {
    const { cardNumber, cardCvv, cardExpirationDate, cardHolder } = formData;

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      alert("El número de tarjeta debe tener 16 dígitos.");
      return false;
    }

    if (cardCvv.length !== 3 || isNaN(cardCvv)) {
      alert("El CVV debe tener exactamente 3 dígitos.");
      return false;
    }

    if (!cardExpirationDate) {
      alert("Debe seleccionar una fecha de expiración.");
      return false;
    }

    if (!cardHolder.trim()) {
      alert("El titular de la tarjeta es obligatorio.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      ...formData,
      userId, // Incluye el ID del usuario como parte de los datos enviados
    };

    if (id) {
      await dispatch(updateCardDto({ cardId: id, cardData: payload }));
    } else {
      await dispatch(createCardDto({ userId, cardData: payload }));
    }

    navigate("/dashboard/metodos-de-pago");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-[22px] font-bold mb-4 text-center">
          {id ? "Editar Método de Pago" : "Agregar Método de Pago"}
        </h1>
        {status === "failed" && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Número de Tarjeta */}
          <div className="mb-4">
            <label className="block text-gray-700">Número de Tarjeta</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              maxLength={16}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          {/* Tipo de Tarjeta */}
          <div className="mb-4">
            <label className="block text-gray-700">Tipo de Tarjeta</label>
            <select
              name="cardType"
              value={formData.cardType}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded w-full"
              required
            >
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
            </select>
          </div>

          {/* CVV */}
          <div className="mb-4">
            <label className="block text-gray-700">CVV</label>
            <input
              type="text"
              name="cardCvv"
              value={formData.cardCvv}
              onChange={handleInputChange}
              maxLength={3}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          {/* Fecha de Expiración */}
          <div className="mb-4">
            <label className="block text-gray-700">Fecha de Expiración</label>
            <input
              type="date"
              name="cardExpirationDate"
              value={formData.cardExpirationDate}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          {/* Monto */}
          <div className="mb-4">
            <label className="block text-gray-700">Monto</label>
            <input
              type="number"
              name="cardAmount"
              value={formData.cardAmount}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          {/* Titular de la Tarjeta */}
          <div className="mb-4">
            <label className="block text-gray-700">Titular de la Tarjeta</label>
            <input
              type="text"
              name="cardHolder"
              value={formData.cardHolder}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          {/* Establecer como principal */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="cardMain"
              checked={formData.cardMain}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label className="text-gray-700">Establecer como tarjeta principal</label>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-[#062dd9] text-white px-4 py-2 rounded shadow-md hover:bg-[#077eff] focus:outline-none"
            >
              {id ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { FormPayMethods };
