import { connection } from "./connection.js";
const barberotb = () => connection.table('barbero')

export async function getBarbero(idBarbero) {
    return await barberotb().first().where({ idBarbero });
}

export async function crearBarbero({ usuarioId, imagen, descripcion }) {
    const barbero = {
        usuarioId,
        imagen,
        descripcion,
        created_at: new Date().toISOString(),
    }
    await barberotb().insert(barbero);
    return barbero;
}

export async function actualizarBarbero(id, { usuarioId, imagen, descripcion }) {
    const barbero = await getBarbero(id);
    if (!barbero) {
        throw new Error('Barbero no encontrado');
    }
    const updatedBarbero = {
        ...barbero,
        usuarioId,
        imagen,
        descripcion,
    }
    await barberotb().where({ id }).update(updatedBarbero);
    return updatedBarbero;
}