import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCards, updateCardDto } from "../../redux/thunks/cardThunks";
import Modal from "react-modal";

const PurchasePlan = () => {
  const dispatch = useDispatch();

  // Estado local
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [hasPurchased, setHasPurchased] = useState(
    JSON.parse(localStorage.getItem("hasPurchased")) || false
  );
  const [showModal, setShowModal] = useState(false);

  // Precios simulados
  const originalPrice = 100;
  const discountPrice = 80;

  // Tarjetas desde el estado global
  const { items: cards, status, error } = useSelector((state) => state.cards);

  // Cargar tarjetas al montar el componente
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      dispatch(fetchCards(userId));
    }
  }, [dispatch]);

  // Manejar la compra
  const handlePurchase = async () => {
    if (!selectedCardId) {
      alert("Por favor, selecciona una tarjeta para continuar.");
      return;
    }

    const selectedCard = cards.find((card) => card.id === parseInt(selectedCardId, 10));

    if (!selectedCard) {
      alert("La tarjeta seleccionada no es válida.");
      return;
    }

    if (selectedCard.cardAmount < discountPrice) {
      alert("El monto disponible en la tarjeta no es suficiente para realizar la compra.");
      return;
    }

    const updatedCard = {
      ...selectedCard,
      cardAmount: selectedCard.cardAmount - discountPrice,
      userId: parseInt(localStorage.getItem("user_id"), 10),
    };

    try {
      await dispatch(updateCardDto({ cardId: selectedCard.id, cardData: updatedCard }));
      setHasPurchased(true);
      localStorage.setItem("hasPurchased", JSON.stringify(true));
      setShowModal(true);
    } catch (error) {
      console.error("Error al actualizar la tarjeta:", error);
      alert("Ocurrió un error al procesar la compra. Intenta nuevamente.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Comprar Plan de Suscripción</h1>
        {hasPurchased ? (
          <p className="text-blue-600 font-bold text-center">
            Ya has adquirido este plan.
          </p>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-700">
                Precio Original: <span className="line-through">S/. {originalPrice}</span>
              </p>
              <p className="text-gray-700">Precio con Descuento: S/. {discountPrice}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 text-sm">
                Contrata nuestro plan y recibe atención personalizada para cubrir todas tus
                necesidades. Nos encargamos de ofrecer soluciones a medida con un servicio
                rápido y eficiente. ¡Simplifica tu vida hoy mismo!
              </p>
            </div>
            {status === "loading" ? (
              <p className="text-gray-500 text-center">Cargando tarjetas...</p>
            ) : error ? (
              <p className="text-red-500 text-center">Error al cargar tarjetas: {error}</p>
            ) : cards.length === 0 ? (
              <p className="text-gray-500 text-center">No se encontraron tarjetas.</p>
            ) : (
              <div className="mb-4">
                <label className="block text-gray-700">Seleccionar Tarjeta</label>
                <select
                  className="mt-1 p-2 border rounded w-full"
                  value={selectedCardId || ""}
                  onChange={(e) => setSelectedCardId(e.target.value)}
                >
                  <option value="" disabled>
                    Selecciona una tarjeta
                  </option>
                  {cards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.cardHolder} - **** **** **** {card.cardNumber.slice(-4)} - Saldo: S/. 
                      {card.cardAmount}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              className={`${
                !selectedCardId
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white px-4 py-2 rounded shadow-md w-full`}
              onClick={handlePurchase}
              disabled={!selectedCardId || hasPurchased}
            >
              Comprar Plan
            </button>
          </>
        )}
      </div>

      {/* Modal para confirmar la compra */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-20 text-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-bold mb-4">¡Compra Exitosa!</h2>
        <p>Has adquirido el plan de suscripción con éxito.</p>
        <button
          onClick={() => setShowModal(false)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Cerrar
        </button>
      </Modal>
    </div>
  );
};

Modal.setAppElement("#root");

export default PurchasePlan;
