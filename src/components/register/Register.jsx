import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/thunks/authThunks";

export const Register = () => {
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState(""); 
  const [userMotherLastName, setUserMotherLastName] = useState(""); 
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userBirthDate, setUserBirthDate] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [role, setRole] = useState("EMPRESA");
  const [isClose, setIsClose] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.register);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login"); 
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userPassword === confirmPassword) {
      const userCredentials = {
        userName,
        userLastName,
        userMotherLastName: userMotherLastName || "", 
        userEmail,
        userPassword,
        userPhone,
        userBirthDate,
        role,
      };
      dispatch(registerUser(userCredentials));
    } else {
      setPasswordsMatch(false);
      setIsClose(true);
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-16 bg-[#c9dcf7]"> 
      <div className="w-full max-w-md p-4 m-4 bg-white rounded-xl shadow-md sm:p-8"> {/* Responsive */}
        <h2 className="text-2xl font-bold mb-4 text-center text-[#077eff]">Regístrate</h2> 
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userName" className="block text-gray-700 font-semibold">
              Nombres
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="userLastName" className="block text-gray-700 font-semibold">
                Primer Apellido
              </label>
              <input
                type="text"
                id="userLastName"
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="userMotherLastName" className="block text-gray-700 font-semibold">
                Segundo Apellido
              </label>
              <input
                type="text"
                id="userMotherLastName"
                value={userMotherLastName}
                onChange={(e) => setUserMotherLastName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-semibold">
              Teléfono
            </label>
            <input
              type="text"
              id="phone"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="birthDate" className="block text-gray-700 font-semibold">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="birthDate"
              value={userBirthDate}
              onChange={(e) => setUserBirthDate(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 font-semibold">
              Rol
            </label>
            <select
              id="role"
              value={role}
              onChange={handleRoleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="AGRICULTOR">Agricultor</option>
              <option value="EMPRESA">Empresa</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold">
              Repetir Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#077eff] hover:bg-[#055de5] text-white font-bold py-2 px-4 rounded-full focus:outline-none"
            >
              {loading ? "Cargando..." : "Registrarse"}
            </button>
          </div>
          {!passwordsMatch && isClose && (
            <div className="mt-4 p-2 text-red-700 bg-red-100 rounded-lg">
              Las contraseñas no coinciden
            </div>
          )}
          {error && isClose && (
            <div className="mt-4 p-2 text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
