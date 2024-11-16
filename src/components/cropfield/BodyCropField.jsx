import React, { useEffect } from "react";
import CropFieldCard from "./CropFieldCard";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCropFields } from "../../redux/thunks/cropFieldThunks";
import { useNavigate } from "react-router-dom";

export const BodyCropField = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cropfield);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchCropFields());
  }, dispatch);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="mt-[20px] p-4 rounded-md border-2 h-auto">
        <div className="container mx-auto">
        <h1 className="text-[22px] font-bold mb-8">👋 Hola {user ? user.userName : 'Invitado'}!</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((parcel, index) => (
              <CropFieldCard
                key={index}
                name={parcel.cropFieldName}
                location={parcel.cropFieldDescription}
                timeSpent={parcel.cropPlantingDate}
                totalTime={parcel.cropVariety}
                progress={parcel.cropType}
                id={parcel.cropFieldId}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="h-10"></div>
      <div className="p-4 rounded-md border-2 h-auto">
        <div className="m-auto text-center">
          <button
            className="bg-[#062dd9] text-white px-2 py-2 rounded-full shadow-md hover:bg-[#077eff] focus:outline-none"
            onClick={() => {
              navigate("/dashboard/cultivos/add-cultivo");
            }}
          >
            <Plus />
          </button>
          <p
            className="text-[#062dd9] font-bold"
            onClick={() => {
              navigate("/dashboard/cultivos/add-cultivo");
            }}
          >
            Agregar nueva plantación
          </p>
        </div>
      </div>
    </div>
  );
};
