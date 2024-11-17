import React, { useState, useRef } from "react";
import { usePopper } from "react-popper";
import { SlOptions } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCardDto, fetchCards } from "../../redux/thunks/cardThunks";

// Función para capitalizar la primera letra
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

const PayMethodsCard = ({ id, cardNumber, cardType, cardHolder, cardExpirationDate, cardMain }) => {
  const [showOptions, setShowOptions] = useState(false);
  const referenceElement = useRef(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement.current, popperElement, {
    placement: "bottom-end",
  });

  const userId = parseInt(localStorage.getItem("user_id"), 10) || 0;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOutside = (event) => {
    if (popperElement && !popperElement.contains(event.target) && !referenceElement.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  const handleOptionClick = (option) => {
    setShowOptions(false);
    if (option === "edit") {
      navigate(`/dashboard/metodos-de-pago/edit-card/${id}`);
    } else if (option === "delete") {
      dispatch(deleteCardDto(id))
        .then(() => {
          console.log(`Card ${id} deleted successfully`);
          dispatch(fetchCards(userId));
        })
        .catch((error) => {
          console.error("Error deleting card:", error);
          alert("Ocurrió un error al eliminar la tarjeta.");
        });
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popperElement]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 relative hover:shadow-lg transition-shadow duration-200">
      {/* Tipo de tarjeta */}
      <h2 className="text-lg font-bold text-gray-700 mb-2">
        {capitalize(cardType)}
      </h2>

      {/* Botón de opciones */}
      <div className="absolute top-4 right-4" ref={referenceElement} onClick={() => setShowOptions(!showOptions)}>
        <SlOptions className="text-gray-500 cursor-pointer hover:text-gray-700" />
      </div>

      {/* Opciones del menú */}
      {showOptions && (
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className="bg-white border rounded shadow-lg z-10">
          <ul className="py-1">
            <li
              className="px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleOptionClick("edit")}
            >
              Editar
            </li>
            <li
              className="px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleOptionClick("delete")}
            >
              Eliminar
            </li>
          </ul>
        </div>
      )}

      {/* Información de la tarjeta */}
      <div className="space-y-2 mt-4">
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Titular:</span> {cardHolder}
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Número:</span> **** **** **** {cardNumber.slice(-4)}
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Expira:</span> {cardExpirationDate}
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Principal:</span> {cardMain ? "Sí" : "No"}
        </p>
      </div>
    </div>
  );
};

export default PayMethodsCard;
