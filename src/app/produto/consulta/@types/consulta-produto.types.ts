export type TCamposConsulta = {
  codigo: string,
  descricao: string,
  custo: string,
  precoVenda: string,
}

export const TCamposConsultaVazio = {
  codigo: '',
  descricao: '',
  custo: '',
  precoVenda: '',
}

export type TCampoForm = {
  campo: string,
  valor: string
}