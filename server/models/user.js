import mongoose from "mongoose";

const Schema = mongoose.Schema;

//Creamos el esquema para saber tipo de datos que queremos
const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      // trim borra los espacios si el username trae estos
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      // es un unico dato, solo puede registrarse un email
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//exportamos para podeer interactuar con la base de datos
export default mongoose.model("users", UserSchema);
