const urlAPI = 'http://localhost:9001';

//NO ESTABA OBTENIENDO EL TOKEN DEL LOCALSTORAGE
//O ALGO ASÍ ME LANZÓ EL ERROR 
export const fetchAPI = async (query: string, variables: object = {}, token?: string) => {
  // Si no se pasa un token, lo busca en localStorage
  const authToken = token || localStorage.getItem('token');

  const headers: any = {
    'Content-Type': 'application/json',
  };

  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const res = await fetch(`${urlAPI}/graphql`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const { data, errors } = await res.json();

  if (errors) throw new Error(errors[0].message);

  return data;
};


export const login = async (email: string, password: string) => {
  try {
    const res = await fetch(`${urlAPI}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error('Credenciales inválidas');
    }

    const data = await res.json();

    // Guardar token en localStorage
    localStorage.setItem('token', data.token);

    return data.token;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

