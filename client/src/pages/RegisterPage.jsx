import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useCallback } from "react";

import "./styles/registerPage-styles.css";

function RegisterUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { SingUp, SingIn, isAuthenticated, Errors, reloginverifyToken } =
    useAuth();

  const [formState, setformState] = useState(false);

  const navigate = useNavigate();

  const OnsubmitRegister = handleSubmit(async (values) => {
    if (formState) {
      console.log("values", values);
      SingIn(values);
    } else {
      SingUp(values);
    }
  });

  const onSubmitSingUp = () => {
    setformState(false);
  };
  const onSubmitSingIn = () => {
    setformState(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      reloginverifyToken();
    }
  }, [reloginverifyToken]);

  const handleNavigation = useCallback(() => {
    if (isAuthenticated) {
      navigate("/profileclass");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    handleNavigation();
  }, [handleNavigation]);

  return (
    <div className="ContainerFromRegisterImage">
      <div className="ContainerForm">
        <p className="ImageText">Bienvenido!</p>
        <p className="">Inicia sesión o registrate para obtener mucho conocimiento</p>
        <div className="containeButtonsRegiter">
          <button
            onClick={onSubmitSingUp}
            className={
              !formState ? "ButtonSelectedButtonSingUp" : "ButtonSingUp"
            }
            type="submit"
          >
            Registrarse
          </button>
          <button
            onClick={onSubmitSingIn}
            className={
              formState ? "ButtonSelectedButtonSingIn" : "ButtonSingIn"
            }
            type="submit"
          >
            Iniciar Sesión
          </button>
        </div>

        <form onSubmit={OnsubmitRegister} className="FormContain">
          {Errors.map((error, i) => (
            <div className="ErrorPost" key={i}>
              {error}
            </div>
          ))}
          {!formState ? (
            <div className="containinputText">
              <input
                placeholder="Ingresa tu usuario"
                className="campInput"
                type="text"
                {...register("userName", { required: true })}
              />
              {errors.userName && (
                <p className="errorData">Usuario es obligatorio</p>
              )}
            </div>
          ) : null}

          <div className="containinputText">
            <input
              placeholder="Ingresa tu email"
              className="campInput"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="errorData">Correo es obligatorio</p>}
          </div>

          <div className="containinputText">
            <input
              placeholder="Ingresa tu contraseña"
              className="campInput"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="errorData">Contraseña es obligatoria</p>
            )}
          </div>

          <button className="ButtonSingUpSend" type="submit">
            {!formState ? "Ingresar" : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;
