import React, { createContext, useState, useEffect, useContext } from 'react';
import { cargarCitasUsuario } from '../../controllers/citaController'; // Ajusta el import a tu función

const CitasContext = createContext();

export const CitasProvider = ({ children }) => {
  const [citasUsuario, setCitasUsuario] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const data = await cargarCitasUsuario();
        setCitasUsuario(data || []);
      } catch (error) {
        console.error("Error cargando citas:", error);
      }
    };
    fetchCitas();
  }, []);

  return (
    <CitasContext.Provider value={{ citasUsuario, setCitasUsuario }}>
      {children}
    </CitasContext.Provider>
  );
};

export const useCitas = () => useContext(CitasContext);