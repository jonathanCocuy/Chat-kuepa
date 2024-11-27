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
        <p className="">Inicia sesión para acceder a tu clase</p>
        <div className="containeButtonsRegiter">
          <button
            onClick={onSubmitSingUp}
            className={
              !formState ? "ButtonSelectedButtonSingUp" : "ButtonSingUp"
            }
            type="submit"
          >
            Sing Up
          </button>
          <button
            onClick={onSubmitSingIn}
            className={
              formState ? "ButtonSelectedButtonSingIn" : "ButtonSingIn"
            }
            type="submit"
          >
            Sing In
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
              <p className="userNameText">UserName</p>
              <input
                placeholder="Enter your Name"
                className="usernameInput"
                type="text"
                {...register("userName", { required: true })}
              />
              {errors.userName && (
                <p className="errorData">UserName is Required</p>
              )}
            </div>
          ) : null}

          <div className="containinputText">
            <p className="userNameText">E-mail</p>
            <input
              placeholder="Enter your Email"
              className="emailInput"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="errorData">Email is Required</p>}
          </div>

          <div className="containinputText">
            <p className="userNameText">Password</p>
            <input
              placeholder=". . . . . ."
              className="passwordInput"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="errorData">Password is Required</p>
            )}
          </div>

          <button className="ButtonSingUpSend" type="submit">
            {!formState ? "Sing Up" : "Sing In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;
