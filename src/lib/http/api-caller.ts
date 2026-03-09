import 'server-only';

import { ApiError } from '@lib/errors/api-error';

type Params = RequestInit;

function getErrorDetail(payload: unknown) {
  if (typeof payload === 'string') {
    return payload;
  }

  if (
    payload &&
    typeof payload === 'object' &&
    'detail' in payload &&
    typeof payload.detail === 'string'
  ) {
    return payload.detail;
  }

  if (
    payload &&
    typeof payload === 'object' &&
    'message' in payload &&
    typeof payload.message === 'string'
  ) {
    return payload.message;
  }

  return undefined;
}

export default async function caller<T = unknown>(
  path: string = '',
  params?: Params,
): Promise<T> {
  let url = process.env.URL_API;

  if (!url) throw new Error('URL da API não definida');
  if (path) {
    url += path;
  }

  const response = await fetch(url, params);
  const contentType = response.headers.get('content-type') ?? '';

  let payload: unknown = null;

  if (response.status !== 204) {
    payload = contentType.includes('application/json')
      ? await response.json()
      : await response.text();
  }

  if (!response.ok) {
    throw new ApiError(
      'Erro ao chamar a API',
      getErrorDetail(payload),
      response.status,
    );
  }

  return payload as T;
}
