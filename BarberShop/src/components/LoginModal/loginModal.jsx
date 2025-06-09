import React, {useState} from "react";
import { loginUsuario, registrarUsuario } from "../../controllers/userController";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

    const handleOverlayClick = () => {
    onClose(); // cierra el modal
  };

  const handleWrapperClick = (e) => {
    e.stopPropagation(); // evita que el clic dentro del modal lo cierre
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  const correo = e.target.correo.value;
  const password = e.target.contraseña.value;

  const token = await loginUsuario(correo, password);
  if (token !== null) {
    onClose();
  }
};

 const handleRegister = async (e) => {
  e.preventDefault();

  const nombre= e.target.nombre.value;
  const apellido = e.target.apellido.value
  const correo = e.target.correo.value;
  const telefono = e.target.telefono.value;
  const contrasena = e.target.contrasena.value;

  const input={
   nombre,
   apellido,
   correo,
   password:contrasena,
   ...(telefono && { telefono })
  }

  const crearUsuario = await registrarUsuario(input);
  if (crearUsuario !== null) {
    onClose();
  }
};


  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="wrapper"  onClick={handleWrapperClick}>
        <div className="card-switch">
            <label className="switch">
               <input type="checkbox" className="toggle"/>
               <span className="slider"></span>
               <span className="card-side"></span>
               <div className="flip-card__inner">
                  <div className="flip-card__front">
                     <div className="title">Inicio de sesión</div>
                     <form className="flip-card__form" action="" onSubmit={handleLogin}>
                        <input className="flip-card__input" name="correo" placeholder="Correo" type="email" required/>
                        <input className="flip-card__input" name="contraseña" placeholder="Contraseña" type="password" required/>
                        <button className="flip-card__btn">Vamos!</button>
                     </form>
                  </div>
                  <div className="flip-card__back">
                     <div className="title">Registrarse</div>
                     <form className="flip-card__form" action="" onSubmit={handleRegister}>
                        <div className="back_inpust_contain">
                        <input className="flip-card__input" name="nombre" placeholder="nombre" type="text" required/>
                        <input className="flip-card__input" name="apellido" placeholder="apellido" type="text" required/>
                        <input className="flip-card__input" name="correo" placeholder="Correo" type="email" required/>
                        <input className="flip-card__input" name="telefono" placeholder="Teléfono" type="number"/>
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