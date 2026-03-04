export class ApiError extends Error {
  detalhe?: string;
  status: number;

  constructor(message: string, detalhe: string | undefined, status: number) {
    super(message);
    this.detalhe = detalhe;
    this.status = status;
  }
}
