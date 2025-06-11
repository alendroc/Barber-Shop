import {
  getCita,
  getCitas,
  crearCita,
  adminCrearCita,
  eliminarCita,
  getCitasUsuario
} from '../services/citaService';
import { parseDbError } from '../utils/handleDbError';

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

export const cargarCitasUsuario = async () => {
  try {
    return await getCitasUsuario();
  } catch (error) {
    console.error('Error al obtener citas del usuario', error);
    throw error;
  }
};


export const registrarCita = async (input: any) => {
  try {
    return {state:"success", data:await crearCita(input)}
  } catch (error) {
    const mensajeError = parseDbError(error);
    console.error('Error al crear cita', error);
    return {state:"error", mensajeError}
    throw error;
  }
};


export const registrarCitaAdmin = async (input: any) => {
  try {
    return await adminCrearCita(input);
  } catch (error) {
    console.error('Error al crear cita como admin', error);
    throw error;
  }
};


export const eliminarCitaPorId = async (id: string) => {
  try {
    return await eliminarCita(id);
  } catch (error) {
    console.error('Error al eliminar cita', error);
    throw error;
  }
};