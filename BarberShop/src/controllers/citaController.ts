import {
  getCita,
  getCitas,
  crearCita,
  adminCrearCita,
  eliminarCita
} from '../services/citaService';

export const cargarCita = async (id: string) => {
  try {
    return await getCita(id);
  } catch (error) {
    console.error('Error al obtener la cita', error);
    throw error;
  }
};

export const cargarCitas = async (limit: number | null = null) => {
  try {
    return await getCitas(limit);
  } catch (error) {
    console.error('Error al obtener citas', error);
    throw error;
  }
};

export const registrarCita = async (input: any, token?: string) => {
  try {
    return await crearCita(input, token);
  } catch (error) {
    console.error('Error al crear cita', error);
    throw error;
  }
};

export const registrarCitaAdmin = async (input: any, token?: string) => {
  try {
    return await adminCrearCita(input, token);
  } catch (error) {
    console.error('Error al crear cita como admin', error);
    throw error;
  }
};

export const eliminarCitaPorId = async (id: string, token?: string) => {
  try {
    return await eliminarCita(id, token);
  } catch (error) {
    console.error('Error al eliminar cita', error);
    throw error;
  }
};
