import {
  getCita,
  getCitas,
  crearCita,
  adminCrearCita,
  eliminarCita,
  getCitasUsuario,
} from "../services/citaService";
import { parseDbError } from "../utils/handleDbError";

export const cargarCita = async (id: string) => {
  try {
    return { state: "success",data:await getCita(id)}
  } catch (error) {
    console.error("Error al obtener la cita", error);
    const mensajeError = parseDbError(error);
    return { state: "error", mensajeError };
  }
};

export const cargarCitas = async (limit: number | null = null) => {
  try {
    return { state: "success",data:await getCitas(limit)}
  } catch (error) {
    console.error("Error al obtener citas", error);
    const mensajeError = parseDbError(error);
    return { state: "error", mensajeError };
  }
};

export const cargarCitasUsuario = async () => {
  try {
    return { state: "success",data: await getCitasUsuario()}
  } catch (error) {
    console.error("Error al obtener citas del usuario", error);
    const mensajeError = parseDbError(error);
    return { state: "error", mensajeError };
  }
};

export const registrarCita = async (input: any) => {
  try {
    return { state: "success", data: await crearCita(input) };
  } catch (error) {
    const mensajeError = parseDbError(error);
    console.error("Error al crear cita", error);
    return { state: "error", mensajeError };
  }
};

export const registrarCitaAdmin = async (input: any) => {
  try {
    return { state: "success",data:await adminCrearCita(input)}
  } catch (error) {
    console.error("Error al crear cita como admin", error);
    const mensajeError = parseDbError(error);
    return { state: "error", mensajeError };
  }
};

export const eliminarCitaPorId = async (id: string) => {
  try {
    return { state: "success",data:await eliminarCita(id)}
  } catch (error) {
    console.error("Error al eliminar cita", error);
    const mensajeError = parseDbError(error);
    return { state: "error", mensajeError };
  }
};
