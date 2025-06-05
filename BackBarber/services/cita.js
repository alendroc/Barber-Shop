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