import Message from "../models/message.js";

const Controller = {
  save: (req, res) => {
    let params = req.body;

    const newMessage = new Message({
      message: params?.message,
      from: params?.from,
    });

    newMessage.save((error, messageStored) => {
      if (error || !messageStored) {
        return res.status(404).send({
          status: "error",
          message: "No ha sido posible guardar el mensaje",
        });
      }

      return res.status(200).send({
        status: "Success",
        messageStored,
      });
    });
  },

  getMessages: (req, res) => {
    Message.find({})
      .select("message from")
      .sort("-_id")
      .exec((error, messages) => {
        if (error) {
          return res.status(500).send({
            status: "error",
            message: "Error al extraer los datos",
          });
        }
        // Si no existen mensajes:
        if (!messages || messages.length === 0) {
          return res.status(404).send({
            status: "error",
            message: "No hay mensajes para mostrar",
          });
        }
        return res.status(200).send({
          status: "success",
          messages,
        });
      });
  },
};

export default Controller;
