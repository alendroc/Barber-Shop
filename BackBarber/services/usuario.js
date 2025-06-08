import { connection } from "./connection.js";
const usuariotb = () => connection.table('usuario')

export async function verifyUsuario(id) {

}

export async function changeRol(id) {
    const user = getUsuario(id);
    const updatedUsuario = {
        ...user,
        rol: "barbero"
    }
    await usuariotb().where({ id }).update(updatedUsuario);
}

export async function getUsuario(id) {
    return await usuariotb().first().where({ id })
}
export async function getUsuarioByCorreo(correo) {
    return await usuariotb().first().where({ correo })
}

export async function getUsuarios(limit) {
    const query = usuariotb().select().orderBy('nombre', 'asc')
    if (limit) {
        query.limit(limit);
    }
    return query;
}

export async function crearUsuario({ nombre, apellido, correo, telefono, password }) {
    const usuario = {
        nombre,
        apellido,
        correo,
        telefono,
        rol: "user",
        password,
        created_at: new Date().toISOString(),
    }
    const result = await usuariotb().insert(usuario);
    const id = result[0]; // en MySQL/SQLite suele ser así

    return {
        id,
        ...usuario,
    };
}

export async function actualizarUsuario(id, { nombre, apellido, telefono, password }) {
    const usuario = await getUsuario(id);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    const updatedUsuario = {
        ...usuario,
        nombre,
        apellido,
        telefono,
        password
    }
    await usuariotb().where({ id }).update(updatedUsuario);
    return updatedUsuario;
}

export async function adminActualizarUsuario({ id, nombre, apellido, telefono, rol }) {
    const usuario = await getUsuario(id);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    const updatedUsuario = {
        ...usuario,
        nombre,
        apellido,
        telefono,
        rol,
    }
    await usuariotb().where({ id }).update(updatedUsuario);
    return updatedUsuario;
}

export async function eliminarUsuario(id) {
    const usuario = await getUsuario(id);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    await usuariotb().where({ id }).del();
    return usuario;
}