import { fetchAPI } from './fetchAPI';
import { GET_BARBERO_DETAIL, CREATE_BARBERO, UPDATE_BARBERO, GET_BARBEROS } from '../queries/barberoQueries';

export const getBarberoDetail = async (idBarbero: string) => {
  const res = await fetchAPI(GET_BARBERO_DETAIL, { idBarbero });
  return res.barberoDetail;
};


//OCUPABA RETORNAR UN ARRAY DE BARBEROS
export const getBarberos = async (limit: number | null = null) => {
  const res = await fetchAPI(GET_BARBEROS, { limit });
  return res;
};


export const crearBarbero = async (input: any, token?: string) => {
  const res = await fetchAPI(CREATE_BARBERO, { input }, token);
  return res.crearBarbero;
};

export const actualizarBarbero = async (input: any, token?: string) => {
  const res = await fetchAPI(UPDATE_BARBERO, { input }, token);
  return res.actualizarBarbero;
};
