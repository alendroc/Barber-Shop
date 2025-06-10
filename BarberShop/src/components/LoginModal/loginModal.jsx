import React, { useState } from "react";
import {
  loginUsuario,
  registrarUsuario,
} from "../../controllers/userController";
import "./LoginModal.css";
import { showAlert } from "../alerta/alerta";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../context/authContext";
const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [loginError, setLoginError] = useState(false);
  const { login, token } = useAuth();

  const handleOverlayClick = () => {
    onClose();
  };

  const handleWrapperClick = (e) => {
    e.stopPropagation();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const correo = e.target.correo.value;
    const password = e.target.contraseña.value;

    const respLogin = await loginUsuario(correo, password);
    if (respLogin.state === "success") {
      console.log("Token", respLogin.token);
      login(respLogin.token);
      showAlert({
        mensaje: "Bienvenido!",
        icono: "success",
        background: "#387716",
      });
      setLoginError(false);
      onClose();
    } else {
      showAlert({
        mensaje: respLogin.mensajeError || "Error al ingresar.",
        icono: "error",
        background: "#b04949",
      });
      setLoginError(true);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const apellido = e.target.apellido.value;
    const correo = e.target.correo.value;
    const telefono = e.target.telefono.value;
    const contrasena = e.target.contrasena.value;
    const input = {
      nombre,
      apellido,
      correo,
      password: contrasena,
      ...(telefono && { telefono }),
    };

    const respCrearUsuario = await registrarUsuario(input);
    if (respCrearUsuario.state === "success") {
      const token = await loginUsuario(correo, contrasena);
      if (token !== null) {
        login(token);
        showAlert({
          mensaje: "Registro y login exitoso",
          icono: "success",
          background: "#387716",
        });
        setLoginError(false);
        onClose();
      } else {
        setLoginError(true);
      }
    } else {
      showAlert({
        mensaje: respCrearUsuario.mensajeError || "Error al registrar usuario.",
        icono: "error",
        background: "#b04949",
      });
      setLoginError(true);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="wrapper" onClick={handleWrapperClick}>
        <div className="card-switch">

            <label className="switch">
               <input type="checkbox" className="toggle"/>
               <span className="slider"></span>
               <span className="card-side"></span>
               <div className="flip-card__inner">
                  <div className="flip-card__front">
                     <div className="title">Inicio de sesión</div>
                     <form className="flip-card__form" action="" onSubmit={handleLogin}>
                      <span className= "exit" onClick = {handleOverlayClick}><IoMdClose /></span>
                       {loginError && (
                          <div className="error-message">Correo o contraseña incorrectos</div>
                        )}
                        <input className={`${loginError ?  "flip-card__input_error": "flip-card__input"}`} name="correo" placeholder="Correo" type="email" required/>
                        <input className={`${loginError ?  "flip-card__input_error": "flip-card__input"}`} name="contraseña" placeholder="Contraseña" type="password" required/>
                        <button className="flip-card__btn">Vamos!</button>
                     </form>
                  </div>
                  <div className="flip-card__back">
                     <div className="title">Registrarse</div>
                     <form className="flip-card__form" action="" onSubmit={handleRegister}>
                        <div className="back_inpust_contain">
                          <span className= "exit" onClick = {handleOverlayClick}><IoMdClose /></span>
                        <input className="flip-card__input" name="nombre" placeholder="nombre" type="text" required/>
                        <input className="flip-card__input" name="apellido" placeholder="apellido" type="text" required/>
                        <input className="flip-card__input" name="correo" placeholder="Correo" type="email" required/>
                        <input className="flip-card__input" name="telefono"   min="0" placeholder="Teléfono" type="number"/>
                        <input className="flip-card__input" name="contrasena" placeholder="Contraseña" type="password" required/>
                        </div>
                        <button className="flip-card__btn">Confirmar!</button>
                     </form>
                  </div>
               </div>
            </label>
        </div>   
   </div>
    </div>
  );
};

export default LoginModal;
