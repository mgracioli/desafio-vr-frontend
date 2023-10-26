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
  id: string,
  id_loja: string,
  preco_venda: string,
  prod_desc: string,
  prod_custo: string,
  prod_imagem: string | null,
  loja_desc: string
}

export const TProdutoLojaVazio = {
  id: '',
  id_loja: '',
  preco_venda: '',
  prod_desc: '',
  prod_custo: '',
  prod_imagem: '',
  loja_desc: ''
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


export const TLojaPrecoVazio = {
  id_loja: '',
  preco_venda: ''
}

export type TObjCadastro = {
  id: string,
  descricao: string,
  custo: string,
  imagem: string,
  lojas_preco: Array<TLojaPreco>
}

export const TObjCadastroVazio = {
  id: '',
  descricao: '',
  custo: '',
  imagem: '',
  lojas_preco: [TLojaPrecoVazio]
}