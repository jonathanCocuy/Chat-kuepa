import axios from "axios";

let API = "http://localhost:4000";

// Configuración general de axios para incluir el token en las solicitudes autenticadas
const instance = axios.create({
  baseURL: `${API}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token en cada solicitud
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Solicitudes a la API
export const registerRequest = async (user) => instance.post("/register", user);

export const loginRequest = async (user) => instance.post("/login", user);

export const logOutRequest = async () => instance.post("/logout");

export const reloginverifyTokenRequest = async () => instance.get("/relogin");
