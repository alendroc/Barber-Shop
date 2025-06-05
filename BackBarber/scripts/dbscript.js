import { connection } from "../services/connection.js";
const { schema } = connection;

await schema.dropTableIfExists('usuario')
await schema.dropTableIfExists('barbero')
await schema.dropTableIfExists('cita')

await schema.createTable('usuario', (table) => {
    table.increments('id').notNullable().primary();
    table.text('nombre').notNullable();
    table.text('apellido').notNullable();
    table.text('correo').notNullable().unique();
    table.text('telefono').notNullable();
    table.text('rol').notNullable();
    table.text('password').notNullable();
    table.text('created_at').notNullable();
})

await schema.createTable('barbero', (table) => {
    table.increments('id').notNullable().primary();
    table.text('nombre').notNullable();
    table.text('apellido').notNullable();
    table.text('correo').notNullable().unique();
    table.text('password').notNullable();
    table.text('imagen').notNullable();
    table.text('descripcion').notNullable();
    table.text('created_at').notNullable();
})

await schema.createTable('cita', (table) => {
    table.increments('id').notNullable().primary();
    table.text('fecha').notNullable();
    table.text('hora').notNullable();
    table.integer('usuario_id').notNullable().references('id').inTable('usuario');
    table.integer('barbero_id').notNullable().references('id').inTable('barbero');
    table.text('created_at').notNullable();
})

process.exit()