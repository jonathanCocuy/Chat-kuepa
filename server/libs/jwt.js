import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const CreateAccessToken = (Payload) => {
  return new Promise((resolved, reject) => {
    jwt.sign(
      Payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolved(token);
      }
    );
  });
};
