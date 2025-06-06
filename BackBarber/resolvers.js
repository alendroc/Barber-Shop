import { GraphQLError } from "graphql";
import { getUsuario, getUsuarioByCorreo, getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario, adminActualizarUsuario } from "./services/usuario.js"
import { getBarbero, crearBarbero, actualizarBarbero } from "./services/barbero.js";
import { getCita, getCitas, crearCita, eliminarCita } from "./services/cita.js";
import { encryptPassword } from "./utils/encryption.js";


export const resolvers = {
    Query: {
        usuario: (_root, { id }, { auth }) => {
            if (!auth) {
                throw new GraphQLError("No autenticado", { extensions: { code: 'UNAUTHENTICATED' } });
            }
            if (auth.rol !== 'admin' || auth.rol !== 'barbero') {
                throw new GraphQLError("No tienes permisos", { extensions: { code: 'UNAUTHORIZED' } });
            }
            const usuario = getUsuario(id)
            if (!usuario) {
                throw new GraphQLError('Usuario no existe', {
                    extensions: {
                        code: 'NOT_FOUND'
                    }
                })
            }
            return usuario
        },
        usuarioByCorreo: (_root, { correo }) => {
            const usuario = getUsuarioByCorreo(correo)
            if (!usuario) {
                throw new GraphQLError('Usuario no existe', {
                    extensions: {
                        code: 'NOT_FOUND'
                    }
                })
            }
            return usuario
        },
        usuarios: (_root, { limit }, { auth }) => {
            if (!auth) {
                throw new GraphQLError("No autenticado", { extensions: { code: 'UNAUTHENTICATED' } });
            }
            if (auth.rol !== 'admin' && auth.rol !== 'barbero') {
                throw new GraphQLError("No tienes permisos", { extensions: { code: 'UNAUTHORIZED' } });
            }
            const items = getUsuarios(limit)
            return { items }
        },
        barberoDetail: (_root, { idBarbero }) => {
            const barbero = getBarbero(idBarbero)
            if (!barbero) {
                throw new GraphQLError('Barbero no existe', {
                    extensions: {
                        code: 'NOT_FOUND'
                    }
                })
            }
            return barbero
        },
        cita: (_root, { id }) => {
            const cita = getCita(id)
            if (!cita) {
                throw new GraphQLError('Cita no existe', {
                    extensions: {
                        code: 'NOT_FOUND'
                    }
                })
            }
            return cita
        },
        citas: (_root, { limit }) => {
            const items = getCitas(limit)
            return { items }
        },
    },
    Usuario: {

    },
    BarberoDetail: {

    },
    Cita: {

    },
    /*Task:{
        user:async (task)=>{
            return await getUser(task.user_id);
        },
        created_at:(task)=>{
            return task.created_at.slice(0,'yyyy-mm-dd'.length);
        }
    },*/

    Mutation: {
        crearUsuario: async (_root, { input: { nombre, apellido, correo, telefono, password } }) => {
            try {
                const hashedPassword = await encryptPassword(password);
                const usuario = await crearUsuario({ nombre, apellido, correo, telefono, password: hashedPassword })

                return usuario
            } catch (error) {
                throw new GraphQLError('Error al crear el usuario', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: error.message,
                    },
                });
            }
        },
        actualizarUsuario: async (_root, { input: { nombre, apellido, telefono, password } }, { auth }) => {
            if (!auth) {
                throw new GraphQLError("Usuario no autorizado", { extensions: { code: 'UNAUTHORIZED' } })
            }
            try {
                const hashedPassword = await encryptPassword(password);
                const usuario = await actualizarUsuario(auth.sub, { nombre, apellido, telefono, password: hashedPassword })
                return usuario
            } catch (error) {
                throw new GraphQLError('Error al actualizar el usuario', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: error.message,
                    },
                });
            }
        },
        adminActualizarUsuario: async (_root, { input: { id, nombre, apellido, telefono, rol } }, { auth }) => {
            if (!auth) {
                throw new GraphQLError("No autenticado", { extensions: { code: 'UNAUTHENTICATED' } });
            }
            if (auth.rol !== 'admin') {
                throw new GraphQLError("No tienes permisos", { extensions: { code: 'UNAUTHORIZED' } });
            }
            try {
                const usuario = await adminActualizarUsuario({ id, nombre, apellido, telefono, rol })
                return usuario
            } catch (error) {
                throw new GraphQLError('Error al actualizar el usuario', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: error.message,
                    },
                });
            }
        },
        eliminarUsuario: async (_root, { id }, { auth }) => {
            if (!auth) {
                throw new GraphQLError("No autenticado", { extensions: { code: 'UNAUTHENTICATED' } });
            }
            if (auth.rol !== 'admin') {
                throw new GraphQLError("No tienes permisos", { extensions: { code: 'UNAUTHORIZED' } });
            }
            if (id == 1) {
                throw new GraphQLError("No se puede eliminar el usuario administrador", { extensions: { code: 'CANNOT_DELETE_ADMIN' } });
            }
            try {
                const usuario = await eliminarUsuario(id)
                return usuario
            } catch (error) {
                throw new GraphQLError('Error al eliminar el usuario', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: error.message,
                    },
                });
            }
        },
        crearBarbero: async (_root, { input: { usuarioId, imagen, descripcion } }, { auth }) => {
            if (!auth) {
                throw new GraphQLError("No autenticado", { extensions: { code: 'UNAUTHENTICATED' } });
            }
            if (auth.rol !== 'admin') {
                throw new GraphQLError("No tienes permisos", { extensions: { code: 'UNAUTHORIZED' } });
            }
            try {
                const barbero = await crearBarbero({ usuarioId, imagen, descripcion })
                return barbero
            } catch (error) {
                throw new GraphQLError('Error al crear el barbero', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: error.message,
                    },
                });
            }
        },
        actualizarBarbero: async (_root, { id, input: { imagen, descripcion } }, { auth }) => {
            if (!auth) {
                throw new GraphQLError("No autenticado", { extensions: { code: 'UNAUTHENTICATED' } });
            }
            if (auth.rol !== 'admin') {
                throw new GraphQLError("No tienes permisos", { extensions: { code: 'UNAUTHORIZED' } });
            }
            try {
                const barbero = await actualizarBarbero(id, { imagen, descripcion })
                return barbero
            } catch (error) {
                throw new GraphQLError('Error al actualizar el barbero', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: error.message,
                    },
                });
            }
        },
        crearCita: async (_root, { input: { fecha, hora, barberoId } }, { auth }) => {
            if (!auth) {
                throw new GraphQLError("No autenticado", { extensions: { code: 'UNAUTHENTICATED' } });
            }
            try {
                const cita = await crearCita({ fecha, hora, usuarioId: auth.sub, barberoId })
                return cita
            } catch (error) {
                throw new GraphQLError('Error al crear la cita', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: error.message,
                    },
                });
            }
        },
        adminCrearCita: async (_root, { input: { fecha, hora, usuarioId, barberoId } }, { auth }) => {
            if (!auth) {
                throw new GraphQLError("No autenticado", { extensions: { code: 'UNAUTHENTICATED' } });
            }
            if (auth.rol !== 'admin') {
                throw new GraphQLError("No tienes permisos", { extensions: { code: 'UNAUTHORIZED' } });
            }
            try {
                const cita = await crearCita({ fecha, hora, usuarioId, barberoId })
                return cita
            } catch (error) {
                throw new GraphQLError('Error al crear la cita', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: error.message,
                    },
                });
            }
        },
        eliminarCita: async (_root, { id }, { auth }) => {
            if (!auth) {
                throw new GraphQLError("No autenticado", { extensions: { code: 'UNAUTHENTICATED' } })
            }
            try {
                const cita = await eliminarCita(id)
                return cita
            } catch (error) {
                throw new GraphQLError('Error al eliminar la cita', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: error.message,
                    },
                });
            }
        },
    },
};