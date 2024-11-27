//funcion para validar el schema que creamos con la libreria zod,con el req.body que nos llega de la peticio hecha
export const validateSchema = (schema) => (req, res, next) => {
  try {
    //comparamos el schema con .parse
    schema.parse(req.body);
    //si todo los datos estan bien continuamos
    next();
  } catch (error) {
    //si no sale bien, mostramos los mensages que estan puestos en el schema
    return res.status(400).json(error.errors.map((error) => error.message));
  }
};
