import { connection } from "../services/connection.js";
import { encryptPassword } from "../utils/encryption.js";

const { schema } = connection;

await schema.dropTableIfExists('cita')
await schema.dropTableIfExists('barberoDetail')
await schema.dropTableIfExists('usuario')



await schema.createTable('usuario', (table) => {
    table.increments('id').notNullable().primary();
    table.text('nombre').notNullable();
    table.text('apellido').notNullable();
    table.text('correo').notNullable().unique();
    table.text('telefono');
    table.text('rol').notNullable();
    table.text('password').notNullable();
    table.text('created_at').notNullable();
})

await schema.createTable('barberoDetail', (table) => {
    table.increments('id').notNullable().primary();
    table.integer('usuario').notNullable().unique().references('id').inTable('usuario').onDelete('CASCADE');
    table.text('descripcion').notNullable();
    table.text('imagen');
    table.text('created_at').notNullable();
})

await schema.createTable('cita', (table) => {
    table.increments('id').notNullable().primary();
    table.text('fecha').notNullable();
    table.text('hora').notNullable();
    table.integer('usuario').notNullable().references('id').inTable('usuario');
    table.integer('barbero').notNullable().references('id').inTable('usuario');
    table.text('created_at').notNullable();
})

const hashedPassword = await encryptPassword('1234');

await connection.table('usuario').insert([{
  nombre: 'Admin',
  apellido: 'Principal',
  correo: 'admin@gmail.com',
  rol: 'admin',
  password: hashedPassword,
  created_at: new Date().toISOString()
}]);

process.exit()