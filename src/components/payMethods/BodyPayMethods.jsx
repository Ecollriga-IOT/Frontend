import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../../redux/thunks/cardThunks";
import PayMethodsCard from "./PayMethodsCard";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BodyPayMethods = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: cards = [], status, error } = useSelector((state) => state.cards);

  useEffect(() => {
    const userId = localStorage.getItem("user_id"); 
    if (userId) {
      dispatch(fetchCards(userId)); 
    } else {
      console.error("No se encontró user_id en localStorage.");
    }
  }, [dispatch]);

  // Mostrar estado de carga
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-blue-600 text-lg font-bold">Cargando métodos de pago...</p>
      </div>
    );
  }

  // Mostrar error
  if (status === "failed") {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-red-600 text-lg font-bold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Lista de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {cards.length > 0 ? (
          cards.map((card) => (
            <PayMethodsCard
              key={card.id}
              id={card.id}
              cardNumber={card.cardNumber}
              cardType={card.cardType}
              cardHolder={card.cardHolder}
              cardExpirationDate={card.cardExpirationDate}
              cardMain={card.cardMain}
            />
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No tienes métodos de pago registrados.
          </p>
        )}
      </div>

      <div className="text-center">
        <button
          className="bg-[#077eff] text-white px-2 py-2 rounded-full shadow-md hover:bg-[#055de5] focus:outline-none"
          onClick={() => navigate("/dashboard/metodos-de-pago/add-card")}
        >
          <Plus />
        </button>
        <p
          className="text-blue-600 font-bold mt-2 cursor-pointer"
          onClick={() => navigate("/dashboard/metodos-de-pago/add-card")}
        >
          Agregar nuevo método de pago
        </p>
      </div>
    </div>
  );
};
 