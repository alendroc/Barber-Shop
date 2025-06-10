import {
  userLogin,
  getUsuario,
  getUsuarioByCorreo,
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  adminActualizarUsuario,
  eliminarUsuario,
} from '../services/userService';
import { parseDbError } from '../utils/handleDbError';

export const loginUsuario = async (correo: string, password: string) => {
  try {
    const token= await userLogin(correo, password);
    return { state:"success", token }
  } catch (error) {
    const mensajeError = parseDbError(error);
    return {state:"error", mensajeError}
  }
};

export const cargarUsuario = async (id: string) => {
  try {
    return await getUsuario(id);
  } catch (error) {
    console.error('Error al obtener el usuario', error);
    throw error;
  }
};

export const cargarUsuarioPorCorreo = async (correo: string) => {
  try {
    return await getUsuarioByCorreo(correo);
  } catch (error) {
    console.error('Error al obtener usuario por correo', error);
    throw error;
  }
};

export const cargarUsuarios = async (limit: number | null = null) => {
  try {
    return await getUsuarios(limit);
  } catch (error) {
    console.error('Error al obtener usuarios', error);
    throw error;
  }
};

export const registrarUsuario = async (input: any) => {
  try { return { state:"success", data: await crearUsuario(input) }
  } catch (error) {
    const mensajeError = parseDbError(error);
    return {state:"error", mensajeError}
  }
};

export const editarUsuario = async (input: any) => {
  try {
    return await actualizarUsuario(input);
  } catch (error) {
    console.error('Error al actualizar usuario', error);
    throw error;
  }
};

export const adminEditarUsuario = async (input: any) => {
  try {
    return await adminActualizarUsuario(input);
  } catch (error) {
    console.error('Error al actualizar usuario como admin', error);
    throw error;
  }
};

export const eliminarUsuarioPorId = async (id: string) => {
  try {
    return await eliminarUsuario(id);
  } catch (error) {
    console.error('Error al eliminar usuario', error);
    throw error;
  }
};
