import React from "react";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

    const handleOverlayClick = () => {
    onClose(); // cierra el modal
  };

  const handleWrapperClick = (e) => {
    e.stopPropagation(); // evita que el clic dentro del modal lo cierre
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
                     <div className="title">Inicio de sesion</div>
                     <form className="flip-card__form" action="">
                        <input className="flip-card__input" name="correo" placeholder="Correo" type="email"/>
                        <input className="flip-card__input" name="contraseña" placeholder="Contraseña" type="password"/>
                        <button className="flip-card__btn">Vamos!</button>
                     </form>
                  </div>
                  <div className="flip-card__back">
                     <div className="title">Registrarse</div>
                     <form className="flip-card__form" action="">
                        <div className="back_inpust_contain">
                        <input className="flip-card__input" placeholder="Nombre" type="nombre"/>
                        <input className="flip-card__input" placeholder="Apellido" type="apellido"/>
                        <input className="flip-card__input" name="correo" placeholder="Correo" type="email"/>
                        <input className="flip-card__input" name="telefono" placeholder="Telefono" type="email"/>
                        <input className="flip-card__input" name="contraseña" placeholder="Contraseña" type="password"/>
                        </div>
                        <button className="flip-card__btn">Confirm!</button>
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