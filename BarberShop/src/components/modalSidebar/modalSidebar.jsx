import React, {useEffect, useState} from "react";
import Drawer from "@mui/material/Drawer";
import "./modalSidebar.css"
import { HiScissors } from "react-icons/hi2";
import { FaTrashAlt } from "react-icons/fa";
import { cargarCitasUsuario } from "../../controllers/citaController";
import { useCitas } from "../context/citasContext";
import Swal from 'sweetalert2';
import { showAlert } from '../../components/alerta/alerta';
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
    const handleDeleteCitaClick = async (id) => {
           Swal.fire({
               title: "¿Estás seguro?",
               text: "¡No podrás revertir esto la cita!",
               showCancelButton: true,
               confirmButtonColor: "#3e8b5f",
               cancelButtonColor: "#b04949",
               confirmButtonText: "Sí, ¡eliminarlo!",
               cancelButtonText: "Cancelar",
               customClass: {
                   popup: 'mi-popup-con-zindex',
                   title: 'my-swal-title',
                   htmlContainer: 'my-swal-text',
                   confirmButton: 'my-swal-confirm-button',
                   cancelButton: 'my-swal-cancel-button'
               }
           }).then(async (result) => {
               if (result.isConfirmed) {
                   try {
                       await handleDeleteCita(id);
                       showAlert({mensaje: 'Usuario eliminado exitosamente', icono: 'success', background: '#387716'});
                       fetchUsuarios();
                       handleClose();
                   } catch (error) {
                       setError(error);
                       console.error("Error al borrar usuario:", error);
                       showAlert({mensaje: 'Hubo un error al eliminar el usuario.', icono: 'error',background: '#b04949'});
                   }
               }
           });
       };
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
          <button className="Trash" onClick={() => handleDeleteCitaClick(cita.id)}>
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