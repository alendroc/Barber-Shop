import { connection } from "./connection.js";
const barberotb = () => connection.table('barberoDetail')

export async function getBarbero(id) {
    return await barberotb().first().where({ id });
}

export async function getBarberos(limit) {
    const query = barberotb().select().orderBy('usuario', 'asc')
    if (limit) {
        query.limit(limit);
    }
    return query;
}

export async function crearBarbero({ usuario, imagen, descripcion }) {
    const barbero = {
        usuario,
        imagen,
        descripcion,
        created_at: new Date().toISOString(),
    }
    const result = await barberotb().insert(barbero);
    const id = result[0];

    return {
        id,
        ...barbero,
    };
}

export async function actualizarBarbero({ id, imagen, descripcion }) {
    const barbero = await getBarbero(id);
    if (!barbero) {
        throw new Error('Barbero no encontrado');
    }
    const updatedBarbero = {
        ...barbero,
        imagen,
        descripcion,
    }
    await barberotb().where({ id }).update(updatedBarbero);
    return updatedBarbero;
}