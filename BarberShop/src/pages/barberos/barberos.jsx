import React from "react";
import baberofoto from "../../img/nftbarbero.jpg"
import './barberos.css'
import { NavLink } from 'react-router-dom';
const barberos = () => {
    const barberos = [
  {
    id: "1",
    nombre: "Luis",
    apellido: "Ramírez",
    correo: "luis.ramirez@example.com",
    imagen: baberofoto,
    descripcion: "Barbero especializado en cortes modernos y fades precisos.",
  },
  {
     id: "2",
    nombre: "Carlos",
    apellido: "Martínez",
    correo: "carlos.martinez@example.com",
    imagen: baberofoto,
    descripcion: "Experto en barba y estilo clásico. Atención personalizada.",
  },
  {
     id: "3",
    nombre: "Javier",
    apellido: "Gómez",
    correo: "javier.gomez@example.com",
    imagen: baberofoto,
    descripcion: "Más de 10 años de experiencia en barbería y peluquería.",
  },
  {
     id: "4",
    nombre: "Andrés",
    apellido: "Vargas",
    correo: "andres.vargas@example.com",
    imagen: baberofoto,
    descripcion: "Cortes urbanos y asesoría de imagen para hombres jóvenes.",
  }
];
    return(
        <>
        
         <div className="grid-barberos">
            {barberos.map((barbero, index)=>(
             <div  key={index} className="card">
                <div className="img-content">
                      <h2 className="nombre">{barbero.nombre} {barbero.apellido}</h2>
                     <img src={barbero.imagen} alt={barbero.nombre}  />
                </div>
                <div className="contenido-cad">
                    <div className="coore-boton-flex">
                        <p className="correo">{barbero.correo}</p>
                        <NavLink to="/sacarCita" state={{barbero}} className="button">Reservar cita</NavLink>
                    </div>
                   
                <div className="description">
                    <p >{barbero.descripcion}</p>
                </div> 
                </div>
             </div>))}

         </div>
       
        </>
    )
}
export default barberos