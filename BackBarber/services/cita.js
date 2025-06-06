import { connection } from "./connection.js";
const citatb = () => connection.table('cita')

export async function getCita(id) {
    return await citatb().first().where({ id })
}

export async function getCitas(limit) {
    const query = citatb().select().orderBy('fecha', 'asc')
    if (limit) {
        query.limit(limit)
    }
    return query;
}

export async function crearCita({ fecha, hora, usuario_id, barbero_id }) {
    const cita = {
        fecha,
        hora,
        usuario_id,
        barbero_id,
        created_at: new Date().toISOString(),
    }
    await citatb().insert(cita)
    return cita
}

export async function eliminarCita(id) {
    const cita = await getCita(id)
    if (!cita) {
        throw new Error('Cita no encontrada')
    }
    await citatb().where({ id }).del()
    return cita
}