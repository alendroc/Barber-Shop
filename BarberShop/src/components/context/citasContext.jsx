import React, { createContext, useState, useEffect, useContext } from 'react';
import { cargarCitasUsuario, cargarCitas } from '../../controllers/citaController'; // Ajusta el import a tu función
import { useAuth } from './authContext';
const CitasContext = createContext();

export const CitasProvider = ({ children }) => {
  const [citasUsuario, setCitasUsuario] = useState([]);
  const [citasTodas, setCitasTodas] = useState([]);
  const {isAuthenticated} = useAuth()


   useEffect(() => { 
    const fetchCitas = async () => {
      try {
        const data = await cargarCitasUsuario();
        setCitasUsuario(data || []);
      } catch (error) {
        console.error("Error cargando citas:", error);
      }
    };

    if (isAuthenticated) {
      fetchCitas();
    } else {
     
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const data = await cargarCitas();
        console.log("citaaaas", data)
        setCitasTodas(data || []);
      } catch (error) {
        console.error("Error cargando citas:", error);
      }
    };
    fetchCitas();
  }, []);


  return (
    <CitasContext.Provider value={{ citasUsuario, setCitasUsuario, citasTodas, setCitasTodas }}>
      {children}
    </CitasContext.Provider>
  );
};

export const useCitas = () => useContext(CitasContext);