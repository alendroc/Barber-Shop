import React, {useEffect, useState} from "react";
import Drawer from "@mui/material/Drawer";
import "./modalSidebar.css"
import { HiScissors } from "react-icons/hi2";
import { FaTrashAlt } from "react-icons/fa";
import { cargarCitasUsuario } from "../../controllers/citaController";

const SidebarDrawer = ({ isOpen, onClose }) => {

  const[citasUsuario, setCitasUsuario]=useState([])
  const precio=4000;

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await cargarCitasUsuario();
        console.log(response);
        setCitasUsuario(response || []);
      } catch (error) {
        console.error("Error cargando citas del usuario:", error);
      }
    };

    fetchData();
  }, []);


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
          <button className="Trash">
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