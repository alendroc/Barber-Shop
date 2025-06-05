import { connection } from "./connection.js";
const usuariotb = () => connection.table('usuario')

export async function getUsuario(id) {
    return await usuariotb().first().where({ id })
}
export async function getUsuarioByCorreo(correo) {
    return await usuariotb().first().where({ correo })
}

export async function getUsuarios(limit) {
    const query = usuariotb().select().orderBy('nombre', 'asc')
    if (limit) {
        query.limit(limit)
    }
    return query;
}

export async function crearUsuario({ nombre, apellido, correo, telefono, rol, password }) {
    const usuario = {
        nombre,
        apellido,
        correo,
        telefono,
        rol,
        password,
        created_at: new Date().toISOString(),
    }
    await usuariotb().insert(usuario)
    return usuario
}