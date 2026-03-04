import { ApiError } from './errors';

type Params = {
  method: string;
  headers?: {
    'Content-Type'?: string;
    Authorization?: string;
    accept?: string;
  };
  body?: string;
};

export default async function caller(path: string = '', params?: Params) {
  let url = process.env.URL_API;
  console.log('URL da API', url);
  console.log('PATH', path);
  console.log('PARAMS', params);

  if (!url) throw new Error('URL da API não definida');
  if (path) {
    url += path;
    console.log('URL', url);
  }

  const response = await fetch(`${url}`, params);
  const json = await response.json();

  if (!response.ok) {
    throw new ApiError('Erro ao chamar a API', json.detail, response.status);
  }
  return json;
}
