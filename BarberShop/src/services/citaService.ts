import { fetchAPI } from './fetchAPI';
import { GET_CITA, GET_CITAS, CREATE_CITA, ADMIN_CREATE_CITA, DELETE_CITA, GET_CITAS_USUARIO } from '../queries/citaQueries';

export const getCita = async (id: string) => {
  const res = await fetchAPI(GET_CITA, { id });
  return res.cita;
};

export const getCitas = async (limit: number | null = null) => {
  const res = await fetchAPI(GET_CITAS, { limit });
  return res.citas.items;
};

export const getCitasUsuario = async () => {
  const res = await fetchAPI(GET_CITAS_USUARIO);
  return res.citasUsuario.items;
};

export const crearCita = async (input: any) => {
  const res = await fetchAPI(CREATE_CITA, { input });
  return res.crearCita;
};

export const adminCrearCita = async (input: any) => {
  const res = await fetchAPI(ADMIN_CREATE_CITA, { input });
  return res.adminCrearCita;
};

export const eliminarCita = async (id: string) => {
  const res = await fetchAPI(DELETE_CITA, { id });
  return res.eliminarCita;
};
