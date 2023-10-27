export type TProduto = {
  id: number,
  descricao: string,
  custo: string,
  imagem: string,
}

type TMensagem = {
  codigo: string,
  descricao: string
}

export type TRetornoApi<T> = {
  retorno: {
    status: string,
    codigo_status: number,
    dados?: T,
    mensagens?: TMensagem[]
  }
}

export type TProdutoLoja = {
  id: string,
  id_loja: string,
  preco_venda: string,
  prod_desc: string,
  prod_custo: string,
  prod_imagem: string | null,
  loja_desc: string
}

export type TRetornoApiProdLoja = {
  retorno: {
    status: string,
    codigo_status: number,
    dados: TProdutoLoja[] | null
  }
}

export type TLojaPreco = {
  id_loja: string,
  preco_venda: string
}

export type TObjCadastro = {
  id: string,
  descricao: string,
  custo: string,
  imagem: string,
  lojas_preco: Array<TLojaPreco>
}