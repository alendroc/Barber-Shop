export const GET_USUARIO = `
  query GetUsuario($id: ID!) {
    usuario(id: $id) {
      id
      nombre
      apellido
      correo
      telefono
      rol
    }
  }
`;

export const GET_USUARIO_BY_CORREO = `
  query GetUsuarioByCorreo($correo: String!) {
    usuarioByCorreo(correo: $correo) {
      id
      nombre
      apellido
      correo
      telefono
      rol
    }
  }
`;

export const GET_USUARIOS = `
  query GetUsuarios($limit: Int) {
    usuarios(limit: $limit) {
      items {
        id
        nombre
        apellido
        correo
        telefono
        rol
      }
    }
  }
`;

export const CREATE_USUARIO = `
  mutation CrearUsuario($input: UsuarioInput!) {
    crearUsuario(input: $input) {
      id
      nombre
      apellido
      correo
      telefono
      rol
    }
  }
`;

export const UPDATE_USUARIO = `
  mutation ActualizarUsuario($input: UsuarioUpdateInput!) {
    actualizarUsuario(input: $input) {
      id
      nombre
      apellido
      telefono
      rol
    }
  }
`;

export const ADMIN_UPDATE_USUARIO = `
  mutation AdminActualizarUsuario($input: AdminUsuarioInput!) {
    adminActualizarUsuario(input: $input) {
      id
      nombre
      apellido
      telefono
      rol
    }
  }
`;

export const DELETE_USUARIO = `
  mutation EliminarUsuario($id: ID!) {
    eliminarUsuario(id: $id) {
      id
      nombre
      correo
    }
  }
`;