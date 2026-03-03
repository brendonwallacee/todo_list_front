
type Params = {
  method: string,
  headers?: {
  },
  body?: string
}

export default async function caller(path: string = "", params?: Params) {
  var url = process.env.URL_API;
  console.log("URL da API", url);
  console.log("PATH", path);
  console.log("PARAMS", params);

	if (!url) throw new Error("URL da API não definida");
  if (path) {url += path;
    console.log("URL", url);
  }

	const response = await fetch(`${url}`, params);
  const json = await response.json();

	if (!response.ok) {
    throw new Error("Erro ao chamar a API", { cause: {detalhe: json.detail, status: response.status} });}

	return json;
}