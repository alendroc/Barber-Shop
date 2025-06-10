import React from "react";
import "./dialogConfirmarCita.css";

const DialogConfirmarCita = ({ isOpen, hora, fecha, onConfirmar, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()} style={{fontFamily: "Urbanist"}}>
        <h3>Confirmar cita</h3>
        <p>¿Deseas agendar una cita el <strong>{fecha}</strong> a las <strong>{hora}</strong>?</p>
        <div className="dialog-buttons">
          <button className="btn-aceptar" onClick={onConfirmar}>Sí, confirmar</button>
          <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default DialogConfirmarCita;
