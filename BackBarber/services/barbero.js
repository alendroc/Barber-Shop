import { connection } from "./connection.js";
const barberotb = () => connection.table('barbero')

export async function getBarbero(id) {
    return await barberotb().first().where({ id })
}

export async function getBarberos(limit) {
    const query = barberotb().select().orderBy('nombre', 'asc')
    if (limit) {
        query.limit(limit)
    }
    return query;
}