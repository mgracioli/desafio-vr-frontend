export type TLoja = {
  id: string,
  descricao: string
}

export type TRetornoApiLoja = {
  retorno: {
    status: string,
    codigo_status: number,
    dados: TLoja[] | null
  }
}