import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { CreateAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (userFound) return res.status(400).json(["The email is already in use"]);

    const passwordhash = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: passwordhash,
    });

    //guardamos en base de datos
    const userSaved = await newUser.save();

    //creamos el token
    const token = await CreateAccessToken({
      //le decimos el parametro que queremos guardar dentro del token
      id: userSaved._id,
    });

    //devolvemos al frontend el user sin la password
    return res.json({
      id: userSaved._id,
      userName: userSaved.userName,
      email: userSaved.email,
      createAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  //req.body recibimos los datos que envia el user en frontend desde la peticion
  const { email, password } = req.body;

  try {
    //buscamos el usuario con el email que nos pasaan por params
    const UserFound = await User.findOne({ email });

    //si no se encuentra el email repondemos con status
    if (!UserFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, UserFound.password);

    //si no coinciden las contraseñas enviamos el status
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect Password" });

    //creamos el token
    const token = await CreateAccessToken({
      //le decimos el parametro que queremos guardar dentro del token
      id: UserFound._id,
    });

    //devolvemos al frontend el user sin la password
    return res.json({
      id: UserFound._id,
      userName: UserFound.userName,
      email: UserFound.email,
      createAt: UserFound.createdAt,
      updatedAt: UserFound.updatedAt,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  return res.sendStatus(200);
};

// Secret key para firmar y verificar el token. Debes mantener esta clave en un lugar seguro, como una variable de entorno.
const SECRET_KEY = process.env.JWT_SECRET_KEY || "tu_clave_secreta";

// Función para verificar el token
const verifyToken = (token) => {
  try {
    // Verifica el token. Si el token es válido, devuelve los datos decodificados
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded; // Si es válido, devuelve los datos decodificados
  } catch (err) {
    // Si ocurre un error (token inválido o expirado), devuelve null o lanza un error
    return null;
  }
};

const generateNewToken = (user) => {
  const payload = { id: user.id }; // Aquí puedes agregar más datos si lo necesitas
  const options = { expiresIn: "1h" }; // Opcional: define el tiempo de expiración
  return jwt.sign(payload, SECRET_KEY, options);
};

export const relogin = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Obtener token del encabezado
    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    // Verifica el token aquí (puedes usar JWT o alguna otra estrategia)
    const decoded = verifyToken(token); // Reemplaza con tu función de verificación
    if (!decoded) {
      return res.status(401).json({ message: "Token inválido" });
    }

    // Si el token es válido, puedes generar un nuevo token si es necesario
    const newToken = generateNewToken(decoded); // Implementa la lógica para generar un nuevo token

    return res.status(200).json({ newToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
