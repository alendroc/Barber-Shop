import { getBarberos, crearBarbero, actualizarBarbero } from '../services/barberoService';

export const cargarBarberos = async () => {
  try {
    return await getBarberos();
  } catch (error) {
    console.error("Error cargando barberos", error);
    throw error;
  }
};

export const registrarBarbero = async (input: any) => {
  try {
    return await crearBarbero(input);
  } catch (error) {
    console.error("Error creando barbero", error);
    throw error;
  }
};

export const adminEditarBarbero = async (input: any) => {
    try {
        return await actualizarBarbero(input);
    } catch (error) {
        console.error("Error al actualizar barbero", error);
        throw error;
    }
};
