import React, {useEffect, useState} from "react";
import Drawer from "@mui/material/Drawer";
import "./modalSidebar.css"
import { HiScissors } from "react-icons/hi2";
import { FaTrashAlt } from "react-icons/fa";
import { cargarCitasUsuario } from "../../controllers/citaController";
import { useCitas } from "../context/citasContext";
import { eliminarCita } from "../../services/citaService";
const SidebarDrawer = ({ isOpen, onClose }) => {

   const { citasUsuario, setCitasUsuario, setCitasTodas } = useCitas();
  const precio=4000;

  const handleDeleteCita = async (id) => {
     try{
       await eliminarCita(id);
      setCitasUsuario((prevCitas) => prevCitas.filter((cita) => cita.id !== id));
      setCitasTodas((prevCitas) => prevCitas.filter((cita) => cita.id !== id));
     }catch(error){
        console.error('Error al eliminar cita', error);
    throw error;
     }
   }

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <div className="drawerBody">
        <h2>Tus citas</h2>
        <div style={{ padding: '0 10px' }}>
  {citasUsuario.length === 0 ? (
    <p>No tienes citas registradas.</p>
  ) : (
    citasUsuario.map((cita, index) => (
      <div className="cardCitas" key={index}>
        <div className="cardArriba">
          <div className="barberoNombre">
            <HiScissors className="iconoTijeras" />
            <p>{cita.barbero?.usuario?.nombre} {cita.barbero?.usuario?.apellido}</p>
          </div>
          <div className="precios">
            <p><span>₡</span>{precio}</p>
          </div>
        </div>
        <div className="fechaTrash">
          <div className="fechaCita">
            <p>{cita.fecha}</p>
            <p>{cita.hora}</p>
          </div>
          <button className="Trash" onClick={() => handleDeleteCita(cita.id)}>
            <FaTrashAlt />
          </button>
        </div>
      </div>
    ))
  )}
</div>

      </div>
    </Drawer>
  );
};

export default SidebarDrawer;