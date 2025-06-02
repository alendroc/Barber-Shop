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

export async function actualizarUsuario(id, { nombre, apellido, correo, telefono, rol }) {
    const usuario = await getUsuario(id)
    if (!usuario) {
        throw new Error('Usuario no encontrado')
    }
    const updatedUsuario = {
        ...usuario,
        nombre,
        apellido,
        correo,
        telefono,
        rol,
    }
    await usuariotb().where({ id }).update(updatedUsuario)
    return updatedUsuario
}

export async function eliminarUsuario(id) {
    const usuario = await getUsuario(id)
    if (!usuario) {
        throw new Error('Usuario no encontrado')
    }
    await usuariotb().where({ id }).del()
    return usuario
}