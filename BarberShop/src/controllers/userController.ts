import {
  userLogin,
  getUsuario,
  getUsuarioByCorreo,
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  adminActualizarUsuario,
  eliminarUsuario,
} from "../services/userService";
import { parseDbError } from "../utils/handleDbError";

export const loginUsuario = async (correo: string, password: string) => {
  try {
    const token = await userLogin(correo, password);
    return { state: "success", token };
  } catch (error) {
    const mensajeError = parseDbError(error);
    return { state: "error", mensajeError };
  }
};

export const cargarUsuario = async (id: string) => {
  try {
    return { state: "success", data:await getUsuario(id)}
  } catch (error) {
    console.error("Error al obtener el usuario", error);
    const mensajeError = parseDbError(error);
    return { state: "error", mensajeError };
  }
};

export const cargarUsuarioPorCorreo = async (correo: string) => {
  try {
    return { state: "success",data:await getUsuarioByCorreo(correo)}
  } catch (error) {
    console.error("Error al obtener usuario por correo", error);
    const mensajeError = parseDbError(error);
    return { state: "error", mensajeError };
  }
};

export const cargarUsuarios = async (limit: number | null = null) => {
  try {
    return { state: "success",data:await getUsuarios(limit)}
  } catch (error) {
    console.error("Error al obtener usuarios", error);
    const mensajeError = parseDbError(error);
    return { state: "error", mensajeError };
  }
};

export const registrarUsuario = async (input: any) => {
  try {
    return { state: "success", data: await crearUsuario(input) };
  } catch (error) {
    const mensajeError = parseDbError(error);
    return { state: "error", mensajeError };
  }
};

export const editarUsuario = async (input: any) => {
  try {
    return { state: "success",data:await actualizarUsuario(input)}
  } catch (error) {
    console.error("Error al actualizar usuario", error);
    const mensajeError = parseDbError(error);
    return { state: "error", mensajeError };
  }
};

export const adminEditarUsuario = async (input: any) => {
  try {
    return { state: "success",data:await adminActualizarUsuario(input)}
  } catch (error) {
    console.error("Error al actualizar usuario como admin", error);
    const mensajeError = parseDbError(error);
    return { state: "error", mensajeError };
  }
};

export const eliminarUsuarioPorId = async (id: string) => {
  try {
    return { state: "success",data:await eliminarUsuario(id)}
  } catch (error) {
    console.error("Error al eliminar usuario", error);
    const mensajeError = parseDbError(error);
    return { state: "error", mensajeError };
  }
};
