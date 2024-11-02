import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { fetchCropFieldById, updateCropFieldDto } from "../../redux/thunks/cropFieldThunks";
import { useParams, useNavigate } from "react-router-dom";
import { clearCropFieldState } from "../../redux/slices/updateCropFieldSlice";
import "leaflet/dist/leaflet.css";


import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const FormCropField = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cropfield, loading, error } = useSelector((state) => state.updateCropField);

  const initialState = {
    cropFieldName: "",
    cropFieldDescription: "",
    latitudeData: 0,
    longitudeData: 0,
    cropFieldSize: 0,
    soilType: "",
    cropType: "",
    cropVariety: "",
    cropPlant: "",
    cropPlantingDate: "",
    numPlants: 0,
    idealTemperature: 0,
    idealHumidity: 0,
    irrigationDuration: 0,
    irrigationStartTime: {
      hour: 0,
      minute: 0,
      second: 0,
      nano: 0,
    },
    irrigationEndTime: {
      hour: 0,
      minute: 0,
      second: 0,
      nano: 0,
    },
    irrigationCompleted: true,
    irrigation: true,
  };

  const [cropField, setCropField] = useState(initialState);
  const [position, setPosition] = useState([40.7128, -74.006]); // Coordenadas iniciales (Nueva York)

  useEffect(() => {
    if (id) {
      dispatch(fetchCropFieldById(id));
    } else {
      setCropField(initialState);
      dispatch(clearCropFieldState());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (cropfield) {
      setCropField({
        ...initialState,
        ...cropfield,
        latitudeData: cropfield.latitudeData || 0,
        longitudeData: cropfield.longitudeData || 0,
      });
      setPosition([cropfield.latitudeData || 0, cropfield.longitudeData || 0]);
    }
  }, [cropfield]);

  useEffect(() => {
    return () => {
      dispatch(clearCropFieldState());
    };
  }, [dispatch]);

  const handleMapClick = (e) => {
    setPosition([e.latlng.lat, e.latlng.lng]);
    setCropField((prev) => ({
      ...prev,
      latitudeData: e.latlng.lat,
      longitudeData: e.latlng.lng,
    }));
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCropField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("CropField data submitted: ", cropField);
    dispatch(updateCropFieldDto(cropField)).then(() => {
      navigate("/dashboard/cultivos");
    });
  };

  return (
    <div>
      <h1 className="text-[22px] font-bold mb-4 text-center">Agregar nuevo cultivo</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-auto w-[60%]">
          <div className="mb-4">
            <label className="block text-gray-700">Nombre del Cultivo</label>
            <input
              type="text"
              name="cropFieldName"
              value={cropField.cropFieldName}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Descripción del Cultivo</label>
            <input
              type="text"
              name="cropFieldDescription"
              value={cropField.cropFieldDescription}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Tamaño del Campo (m²)</label>
            <input
              type="number"
              name="cropFieldSize"
              value={cropField.cropFieldSize}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Tipo de Suelo</label>
            <input
              type="text"
              name="soilType"
              value={cropField.soilType}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Tipo de Cultivo</label>
            <input
              type="text"
              name="cropType"
              value={cropField.cropType}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Variedad del Cultivo</label>
            <input
              type="text"
              name="cropVariety"
              value={cropField.cropVariety}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Planta del Cultivo</label>
            <input
              type="text"
              name="cropPlant"
              value={cropField.cropPlant}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Fecha de Plantación</label>
            <input
              type="date"
              name="cropPlantingDate"
              value={cropField.cropPlantingDate}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          {/* Map Section */}
          <div className="mb-4">
            <label className="block text-gray-700">Ubicación del Cultivo</label>
            <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position}>
                <MapClickHandler />
              </Marker>
            </MapContainer>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Número de Plantas</label>
            <input
              type="number"
              name="numPlants"
              value={cropField.numPlants}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          {/* Campos de Temperatura Ideal y Humedad Ideal */}
          <div className="mb-4">
            <label className="block text-gray-700">Temperatura Ideal (°C)</label>
            <input
              type="number"
              name="idealTemperature"
              value={cropField.idealTemperature}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Humedad Ideal (%)</label>
            <input
              type="number"
              name="idealHumidity"
              value={cropField.idealHumidity}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600 focus:outline-none"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export { FormCropField };
