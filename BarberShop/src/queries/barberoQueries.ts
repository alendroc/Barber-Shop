export const GET_BARBERO_DETAIL = `
  query GetBarberoDetail($idBarbero: ID!) {
    barberoDetail(idBarbero: $idBarbero) {
      id
      imagen
      descripcion
      usuario {
        id
        nombre
        apellido
        correo
      }
    }
  }
`;

export const GET_BARBEROS = `
  query GetBarberos($limit: Int) {
    barberos(limit: $limit) {
    items {
        id
        imagen
        descripcion
        usuario {
          id
          nombre
          apellido
          correo
        }
      }
    }
  }
`;

export const CREATE_BARBERO = `
  mutation CrearBarbero($input: BarberoInput!) {
    crearBarbero(input: $input) {
      id
      imagen
      descripcion
      usuario {
        id
        nombre
      }
    }
  }
`;

export const UPDATE_BARBERO = `
  mutation ActualizarBarbero($input: BarberoUpdateInput!) {
    actualizarBarbero(input: $input) {
      id
      imagen
      descripcion
    }
  }
`;
