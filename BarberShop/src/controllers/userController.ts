// controllers/userController.ts
import {
  userLogin,
  getUsuario,
  getUsuarioByCorreo,
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  adminActualizarUsuario,
  eliminarUsuario,
} from '../services/userService'; // ajusta la ruta si es necesario

export const loginUsuario = async (correo: string, password: string) => {
  try {
    const token= await userLogin(correo, password);
    console.log("token:", token);
    sessionStorage.setItem("token",token);
    return token;
  } catch (error) {
    console.error('Error al iniciar sesión', error);
    return null
    throw error;
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
  try {
    return await crearUsuario(input);
  } catch (error) {
    console.error('Error al registrar usuario', error);
    return null
    throw error;
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
