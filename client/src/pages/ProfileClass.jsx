import axios from "axios";
import io from "socket.io-client";
import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import "./styles/profileClass-styles.css";

const Socket = io("http://localhost:4000");

function ProfileClass() {
  const [Nickname, setNickname] = useState("");
  const [Message, setMessage] = useState("");
  const [Messages, setMessages] = useState([]);

  const [PreviewMessages, setPreviewMessages] = useState([]);
  const [Fristconnect, setFristconnect] = useState(false);

  const { user, LogOut } = useAuth();

  useEffect(() => {
    const recivedMessage = (Message) => {
      setMessages([Message, ...Messages]);
    };

    // Escuchamos el evento "message", y le pasamos el mensaje (recivedMessage)
    Socket.on("message", recivedMessage);

    //desuscribimos el evento(para dejar de escuchar el evento)
    return () => {
      Socket.off("message", recivedMessage);
    };
  }, [Messages]);

  if (!Fristconnect) {
    //traemos la los mensajes la primera vez
    axios.get("http://localhost:4000/api/messages").then((res) => {
      setPreviewMessages(res.data.messages);
      if (res?.data?.messages) {
        setMessage("");
      } else {
        setMessage(res?.data?.messages);
      }
    });
    setNickname(user?.userName);
    setFristconnect(true);
  }

  const MessageSubmit = (e) => {
    e.preventDefault();
    if (Nickname !== "") {
      //emitimos (enviamos) en el evento "message", con los parametros que recibe en este caso Message y nickName
      Socket.emit("message", Message, Nickname);

      // al momento de enviar el mensaje lo enviamos con el from yo, para verlo en frontend, en el backend se guarda con el nickname agregado
      const newMessage = {
        body: Message,
        from: "yo",
      };

      // (Aqui actualizamos el mensaje para el user)
      setMessages([newMessage, ...Messages]);
      setMessage("");

      //Hacemos la peticion http por Post para guardar mensaje en la base de datos con el nickname correcto
      axios.post("http://localhost:4000/api/save", {
        message: Message,
        from: Nickname,
      });
    } else {
      alert("Necesitas un nickname para enviar un mensaje");
    }
  };

  return (
    <div className="App">
      <div className="ContainerTitleLogOut">
        <div className="title">ChatSocket</div>

        <button onClick={() => LogOut()} className="logOut">
          LogOut
        </button>
      </div>
      <div className="ContainerVideoAndChat">
        <div className="AppVideo">
          <ReactPlayer
            controls={true}
            muted
            playing
            width={"auto"}
            loop
            url="https://www.youtube.com/watch?v=Z6GGAQOMX8c"
          />
        </div>
        <div className="=ContainerForm">
          <div className="Chat">
            <div className="ChatBody">
              <div className="ContainerMessages">
                <div className="NewMessage">
                  {Messages?.map((message, index) => (
                    <div
                      className={
                        message.from === "yo" ? "MessageYOU" : "Messageother"
                      }
                      key={index}
                    >
                      <p>
                        {message.from}: {message.body}
                      </p>
                    </div>
                  ))}
                </div>

                <small>... Mensajes Guardados ...</small>

                {PreviewMessages?.map((message, index) => (
                  <div
                    className={
                      message.from === Nickname ? "MessageYOU" : "Messageother"
                    }
                    key={index}
                  >
                    <p>
                      {message.from}: {message.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="InputsForm">
              <form onSubmit={MessageSubmit}>
                <div className="ContainerButtonInput">
                  <input
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    className="MessageInput"
                    placeholder="message..."
                    id="nickname"
                    value={Message}
                  />
                  <button className="ButtonName">Enviar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileClass;
