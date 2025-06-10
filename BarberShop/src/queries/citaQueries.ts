export const GET_CITA = `
  query GetCita($id: ID!) {
    cita(id: $id) {
      id
      fecha
      hora
      usuario {
        id
        nombre
      }
      barbero {
        id
        descripcion
      }
    }
  }
`;

export const GET_CITAS = `
  query GetCitas($limit: Int) {
    citas(limit: $limit) {
      items {
        id
        fecha
        hora
        usuario {
          id
          nombre
        }
        barbero {
          id
          descripcion
        }
      }
    }
  }
`;

export const GET_CITAS_USUARIO = `
     query {
     citasUsuario {
    items {
      id
      fecha
      hora
      usuario {
        id
        nombre
        apellido
      }
      barbero {
        id
        descripcion
        usuario{
            nombre,
            apellido
        }
      }
    }
  }
}
`;

export const CREATE_CITA = `
  mutation CrearCita($input: CitaInput!) {
    crearCita(input: $input) {
      id
      fecha
      hora
    }
  }
`;

export const ADMIN_CREATE_CITA = `
  mutation AdminCrearCita($input: AdminCitaInput!) {
    adminCrearCita(input: $input) {
      id
      fecha
      hora
      usuario {
        id
      }
      barbero {
        id
      }
    }
  }
`;

export const DELETE_CITA = `
  mutation EliminarCita($id: ID!) {
    eliminarCita(id: $id) {
      id
      fecha
      hora
    }
  }
`;