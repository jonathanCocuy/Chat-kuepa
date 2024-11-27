import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = async (req, res, next) => {
  const authHeader =
    req.get("Authorization") ||
    req.headers.authorization ||
    req.headers.Authorization;

  if (!authHeader) return res.status(401).json({ message: "No authHeader" });

  const token = authHeader?.split(" ")[1];

  console.log("token", token);

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
};
