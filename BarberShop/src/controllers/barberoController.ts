import {
  getBarberos,
  crearBarbero,
  actualizarBarbero,
} from "../services/barberoService";
import { parseDbError } from "../utils/handleDbError";

export const cargarBarberos = async () => {
  try {
    return { state: "success",data:await getBarberos()}
  } catch (error) {
    console.error("Error cargando barberos", error);
    const mensajeError = parseDbError(error);
    return { state: "error", mensajeError };
  }
};

export const registrarBarbero = async (input: any) => {
  try {
    return { state: "success",data:await crearBarbero(input)}
  } catch (error) {
    console.error("Error creando barbero", error);
    const mensajeError = parseDbError(error);
    return { state: "error", mensajeError };
  }
};

export const adminEditarBarbero = async (input: any) => {
  try {
    return { state: "success",data:await actualizarBarbero(input)}
  } catch (error) {
    console.error("Error al actualizar barbero", error);
    const mensajeError = parseDbError(error);
    return { state: "error", mensajeError };
  }
};
