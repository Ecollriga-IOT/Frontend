import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/thunks/authThunks";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Redux states
  const { loading, error, isAuthenticated } = useSelector((state) => state.login);
  const [isClose, setIsClose] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setIsClose(true);
    }
  }, [error]);

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      navigate("/dashboard/inicio");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let userCredentials = {
      email,
      password,
    };
    dispatch(loginUser(userCredentials));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#c9dcf7]">
      <div className="w-[500px] m-4">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#062dd9]">
            Inicio de Sesión
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-[#077eff] focus:border-[#077eff]"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-[#077eff] focus:border-[#077eff]"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#062dd9] hover:bg-[#077eff] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#077eff] focus:ring-offset-2"
              >
                {loading ? "Cargando..." : "Iniciar Sesión"}
              </button>
            </div>
            {error && isClose && (
              <div
                id="alert-2"
                className="mt-[20px] flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div className="ms-3 text-sm font-medium">
                  Credenciales Inválidas
                </div>
                <button
                  type="button"
                  className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                  data-dismiss-target="#alert-2"
                  aria-label="Close"
                  onClick={() => setIsClose(false)}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
            )}
            <div className="mt-2 mb-2 text-center">
              <a className="text-[#062dd9]" href="#">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <hr />
            <div className="mt-3 mb-3 flex justify-center">
              <button
                type="button"
                className="bg-[#077eff] text-white py-2 px-4 rounded-md hover:bg-[#055de5] focus:outline-none focus:ring-2 focus:ring-[#055de5] focus:ring-offset-2"
              >
                <a href="/signup">Regístrate</a>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
