import { fetchAPI, login } from './fetchAPI';
import {
  GET_USUARIO,
  GET_USUARIO_BY_CORREO,
  GET_USUARIOS,
  CREATE_USUARIO,
  UPDATE_USUARIO,
  ADMIN_UPDATE_USUARIO,
  DELETE_USUARIO,
} from '../queries/userQueries';

export const userLogin = async (correo: string, password: string) => {
  const res = await login(correo, password);
  return res;
};

export const getUsuario = async (id: string, token?: string) => {
  const res = await fetchAPI(GET_USUARIO, { id }, token);
  return res.usuario;
};

export const getUsuarioByCorreo = async (correo: string) => {
  const res = await fetchAPI(GET_USUARIO_BY_CORREO, { correo });
  return res.usuarioByCorreo;
};

export const getUsuarios = async (limit: number | null = null, token?: string) => {
  const res = await fetchAPI(GET_USUARIOS, { limit }, token);
  return res.usuarios.items;
};

export const crearUsuario = async (input: any) => {
  const res = await fetchAPI(CREATE_USUARIO, { input });
  return res.crearUsuario;
};

export const actualizarUsuario = async (input: any, token?: string) => {
  const res = await fetchAPI(UPDATE_USUARIO, { input }, token);
  return res.actualizarUsuario;
};

export const adminActualizarUsuario = async (input: any, token?: string) => {
  const res = await fetchAPI(ADMIN_UPDATE_USUARIO, { input }, token);
  return res.adminActualizarUsuario;
};

export const eliminarUsuario = async (id: string, token?: string) => {
  const res = await fetchAPI(DELETE_USUARIO, { id }, token);
  return res.eliminarUsuario;
};
