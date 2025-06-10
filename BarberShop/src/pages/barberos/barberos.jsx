import React, { useEffect, useState } from "react";
import baberofoto from "../../img/nftbarbero.jpg";
import "./barberos.css";
import { NavLink } from "react-router-dom";
import { cargarBarberos } from "../../controllers/barberoController";

const barberos = () => {
  const [barberosData, setBarberosData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await cargarBarberos();

        //Asignar foto si no existe
       // console.log(response);
        const barberoMap = response.barberos.items.map((barbero) => ({
          ...barbero,
          imagen: barbero.imagen || baberofoto,
        }));
       
        setBarberosData(barberoMap || []);
      } catch (error) {
        console.error("Error cargando barberos:", error);
      }
    };

    fetchData();
  }, []);
   console.log("barberos", barberosData)

  return (
    <>
      <div className="grid-barberos">
        {barberosData.map((barbero, index) => (
          <div key={index} className="card">
            <div className="img-content">
              <h2 className="nombre">
                {barbero.usuario.nombre} {barbero.usuario.apellido}
              </h2>
              <img
                src={`http://localhost:9001${barbero.imagen}`}
                onError={(e) => {
                  e.currentTarget.src = baberofoto;
                }}
                alt={barbero.usuario.nombre}
              />
            </div>
            <div className="contenido-cad">
              <div className="coore-boton-flex">
                <p className="correo">{barbero.usuario.correo}</p>
                <NavLink to="/sacarCita" state={{ barbero }} className="button">
                  Reservar cita
                </NavLink>
              </div>

              <div className="description">
                <p>{barbero.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default barberos;
