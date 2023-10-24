export type TProduto = {
  id: number,
  descricao: string,
  custo: string,
  imagem: string,
}

export type TRetornoApiProduto = {
  retorno: {
    status: string,
    codigo_status: number,
    dados: TProduto[] | null
  }
}

export type TRetornoApiErro = {
  retorno: {
    status: string,
    codigo_status: number,
    mensagens: [{
      codigo: string,
      descricao: string
    }]
  }
}


export type TProdutoLoja = {
  id: number,
  id_produto: number,
  id_loja: number,
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