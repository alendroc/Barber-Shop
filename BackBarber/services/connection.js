import knex from "knex";
import path from "path";
import { fileURLToPath } from "url";

// Esto te da la ruta absoluta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta al archivo db.sqlite3
const dbPath = path.resolve(__dirname, "../database/db.sqlite3");

export const connection = knex({
    client: 'better-sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true,
})

connection.on('query', ({ sql, binding }) => {
    const query = connection.raw(sql, binding).toQuery();
    console.log('[DB]---->', query)
})