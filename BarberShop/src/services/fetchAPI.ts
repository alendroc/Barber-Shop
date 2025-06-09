const urlAPI = 'http://localhost:9001/graphql';

export const fetchAPI = async (query: string, variables: object = {}, token?: string) => {
  const headers: any = {
    'Content-Type': 'application/json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(urlAPI, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);

  return data;
};
