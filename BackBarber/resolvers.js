import { GraphQLError } from "graphql";
import {
  changeRol,
  getUsuario,
  getUsuarioByCorreo,
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  adminActualizarUsuario,
} from "./services/usuario.js";
import {
  getBarbero,
  crearBarbero,
  actualizarBarbero,
  getBarberos,
} from "./services/barbero.js";
import { getCita, getCitas, crearCita, eliminarCita, getCitasUsuario } from "./services/cita.js";
import { encryptPassword } from "./utils/encryption.js";

export const resolvers = {
  Query: {
    usuario: (_root, { id }, { auth }) => {
      if (!auth) {
        throw new GraphQLError("No autenticado", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      if (auth.rol !== "barbero") {
        throw new GraphQLError("No tienes permisos", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      const usuario = getUsuario(id);
      if (!usuario) {
        throw new GraphQLError("Usuario no existe", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      return usuario;
    },
    usuarioByCorreo: (_root, { correo }) => {
      const usuario = getUsuarioByCorreo(correo);
      if (!usuario) {
        throw new GraphQLError("Usuario no existe", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      return usuario;
    },
    usuarios: (_root, { limit }, { auth }) => {
      if (!auth) {
        throw new GraphQLError("No autenticado", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      if (auth.rol !== "barbero") {
        throw new GraphQLError("No tienes permisos", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      const items = getUsuarios(limit);
      return { items };
    },
    barberos: (_root, { limit }) => {
      const items = getBarberos(limit);
      return { items };
    },

    barberoDetail: (_root, { idBarbero }) => {
      const barbero = getBarbero(idBarbero);
      if (!barbero) {
        throw new GraphQLError("Barbero no existe", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      return barbero;
    },
    cita: (_root, { id }) => {
      const cita = getCita(id);
      if (!cita) {
        throw new GraphQLError("Cita no existe", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      return cita;
    },

    citasUsuario:async(_root, _args, { auth  }) => {
      if (!auth) {
        throw new GraphQLError("No autenticado", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      try {
        const items = await getCitasUsuario(auth.sub);
        return {items};
      } catch (error) {
        throw new GraphQLError("Error al obtener las citas", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            details: error.message,
          },
        });
      }
    },

    citas: (_root, { limit }) => {
      const items = getCitas(limit);
      return { items };
    },
  },
  Usuario: {},
  BarberoDetail: {
    usuario: async (barbero) => {
      return await getUsuario(barbero.usuario);
    },
  },
  Cita: {
    usuario: async (cita) => {
      return await getUsuario(cita.usuario);
    },
    barbero: async (cita) => {
      return await getBarbero(cita.barbero);
    },
  },
  Mutation: {
    crearUsuario: async (
      _root,
      { input: { nombre, apellido, correo, telefono, password } }
    ) => {
      try {
        const hashedPassword = await encryptPassword(password);
        const usuario = await crearUsuario({
          nombre,
          apellido,
          correo,
          telefono,
          password: hashedPassword,
        });

        return usuario;
      } catch (error) {
        throw new GraphQLError("Error al crear el usuario", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            details: error.message,
          },
        });
      }
    },
    actualizarUsuario: async (
      _root,
      { input: { nombre, apellido, telefono, password } },
      { auth }
    ) => {
      if (!auth) {
        throw new GraphQLError("Usuario no autorizado", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      try {
        let hashedPassword;
        if (password) {
          hashedPassword = await encryptPassword(password);
        }
        //const hashedPassword = await encryptPassword(password);
        const usuario = await actualizarUsuario(auth.sub, {
          nombre,
          apellido,
          telefono,
        //   password: hashedPassword,
        ...(hashedPassword && { password: hashedPassword }),
        });
        return usuario;
      } catch (error) {
        throw new GraphQLError("Error al actualizar el usuario", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            details: error.message,
          },
        });
      }
    },
    adminActualizarUsuario: async (
      _root,
      { input: { id, nombre, apellido, telefono, rol } },
      { auth }
    ) => {
      if (!auth) {
        throw new GraphQLError("No autenticado", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      if (auth.rol !== "barbero") {
        throw new GraphQLError("No tienes permisos", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      try {
        const usuario = await adminActualizarUsuario({
          id,
          nombre,
          apellido,
          telefono,
          rol,
        });
        return usuario;
      } catch (error) {
        throw new GraphQLError("Error al actualizar el usuario", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            details: error.message,
          },
        });
      }
    },
    eliminarUsuario: async (_root, { id }, { auth }) => {
      if (!auth) {
        throw new GraphQLError("No autenticado", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      if (auth.rol !== "barbero") {
        throw new GraphQLError("No tienes permisos", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      if (id == 1) {
        throw new GraphQLError(
          "No se puede eliminar el usuario administrador",
          { extensions: { code: "CANNOT_DELETE_ADMIN" } }
        );
      }
      try {
        const usuario = await eliminarUsuario(id);
        return usuario;
      } catch (error) {
        throw new GraphQLError("Error al eliminar el usuario", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            details: error.message,
          },
        });
      }
    },
    crearBarbero: async (
      _root,
      { input: { usuario, imagen, descripcion } },
      { auth }
    ) => {
      if (!auth) {
        throw new GraphQLError("No autenticado", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      if (auth.rol !== "barbero") {
        throw new GraphQLError("No tienes permisos", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      try {
        const barbero = await crearBarbero({ usuario, imagen, descripcion });
        await changeRol(barbero.usuario);
        return barbero;
      } catch (error) {
        throw new GraphQLError("Error al agregar el barbero", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            details: error.message,
          },
        });
      }
    },
    actualizarBarbero: async (
      _root,
      { input: { id, imagen, descripcion } },
      { auth }
    ) => {
      if (!auth) {
        throw new GraphQLError("No autenticado", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      if (auth.rol !== "barbero") {
        throw new GraphQLError("No tienes permisos", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      try {
        const barbero = await actualizarBarbero({ id, imagen, descripcion });
        return barbero;
      } catch (error) {
        throw new GraphQLError("Error al actualizar el barbero", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            details: error.message,
          },
        });
      }
    },
    crearCita: async (_root, { input: { fecha, hora, barbero } }, { auth }) => {
      if (!auth) {
        throw new GraphQLError("No autenticado", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      try {
        const cita = await crearCita({
          fecha,
          hora,
          usuario: auth.sub,
          barbero,
        });
        return cita;
      } catch (error) {
        throw new GraphQLError("Error al crear la cita", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            details: error.message,
          },
        });
      }
    },
    adminCrearCita: async (
      _root,
      { input: { fecha, hora, usuario, barbero } },
      { auth }
    ) => {
      if (!auth) {
        throw new GraphQLError("No autenticado", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      if (auth.rol !== "barbero") {
        throw new GraphQLError("No tienes permisos", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      try {
        const cita = await crearCita({ fecha, hora, usuario, barbero });
        return cita;
      } catch (error) {
        throw new GraphQLError("Error al crear la cita", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            details: error.message,
          },
        });
      }
    },
    eliminarCita: async (_root, { id }, { auth }) => {
      if (!auth) {
        throw new GraphQLError("No autenticado", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      try {
        const cita = await eliminarCita(id);
        return cita;
      } catch (error) {
        throw new GraphQLError("Error al eliminar la cita", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            details: error.message,
          },
        });
      }
    },
  },
};
