const urlAPI = 'http://localhost:9001';

export const fetchAPI = async (query: string, variables: object = {}, token?: string) => {
  const headers: any = {
    'Content-Type': 'application/json',
  };

  const userToken = sessionStorage.getItem("token")
  if (userToken) headers.Authorization = `Bearer ${token}`;

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
    const res = await fetch(` ${urlAPI}/login`, {
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
    return data.token;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};
