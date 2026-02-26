
import FormLogin from "../ui/form-login";
import { GET } from "../api/hello/route";
import { HelloData } from "@/lib/types";


async function getHelloData(): Promise<HelloData> {
  const response = await GET();
  return response
}

export default async function Login() {

  const data = await getHelloData();

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      {/* Caixa central do login */}
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">
        
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        
        {/* Formulário */}
        <FormLogin {...data} />

        {/* Link para cadastro */}
        <p className="text-center text-sm text-green-600">
          Ainda não possui uma conta?{" "}
          <a href="/register" className="underline text-green-600 hover:text-green-400 transition">
            Cadastre-se
          </a>
        </p>
      </div>

      {/* Link Home */}
      <div className="absolute top-8 right-8">
        <a href="/" className="underline hover:text-green-500 transition">
          Home
        </a>
      </div>
    </main>
  );
}