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

<<<<<<< HEAD
export const registrarCita = async (input: any, token?: string) => {
  try {
    return await crearCita(input, token);
=======
export const registrarCita = async (input: any) => {
  try {
    return await crearCita(input);
>>>>>>> 13bbed09b9b7ce82a8494b40c0b7d661b78377b1
  } catch (error) {
    console.error('Error al crear cita', error);
    throw error;
  }
};

<<<<<<< HEAD
export const registrarCitaAdmin = async (input: any, token?: string) => {
  try {
    return await adminCrearCita(input, token);
=======
export const registrarCitaAdmin = async (input: any) => {
  try {
    return await adminCrearCita(input);
>>>>>>> 13bbed09b9b7ce82a8494b40c0b7d661b78377b1
  } catch (error) {
    console.error('Error al crear cita como admin', error);
    throw error;
  }
};

<<<<<<< HEAD
export const eliminarCitaPorId = async (id: string, token?: string) => {
  try {
    return await eliminarCita(id, token);
=======
export const eliminarCitaPorId = async (id: string) => {
  try {
    return await eliminarCita(id);
>>>>>>> 13bbed09b9b7ce82a8494b40c0b7d661b78377b1
  } catch (error) {
    console.error('Error al eliminar cita', error);
    throw error;
  }
};
