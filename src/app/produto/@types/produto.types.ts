export type TProduto = {
  id: number,
  descricao: string,
  custo: string,
  imagem: string,
}

export type TRetornoApi = {
  retorno: {
    status: string,
    codigo_status: number,
    dados: TProduto | null
  }
}