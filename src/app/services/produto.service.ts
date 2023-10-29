import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable, catchError, of } from "rxjs";

import { TProdutoLoja, TObjCadastro, TRetornoApi, TProduto } from "../produto/@types/produto.types";
import { TMensagem } from "../utils/@types/sistema.types";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient
  ) { }

  private retornaObjErro(mensagensErro: TMensagem[] | null = null) {
    return {
      retorno: {
        status: "Erro",
        codigo_status: 500,
        mensagens: mensagensErro ?? [{ codigo: '0.00', descricao: 'Erro ao realizar operação' }]
      }
    }
  }

  buscarProdutos(
    page: number = 1,
    limit: number = 10,
    id: string = '',
    descricao: string = '',
    custo: string = '',
    precoVenda: string = ''
  ): Observable<TRetornoApi<TProduto[]>> {
    return this.http.get<TRetornoApi<TProduto[]>>(`/api/v1/produto?page=${page}&limit=${limit}&id=${id}&descricao=${descricao}&custo=${custo}&precoVenda=${precoVenda}`).pipe(
      catchError(erro => {
        return of(this.retornaObjErro(erro.error.retorno.mensagens))
      })
    );
  }

  buscarProdutoLoja(idProduto: string | null): Observable<TRetornoApi<TProdutoLoja[]>> {
    if (idProduto) {
      return this.http.get<TRetornoApi<TProdutoLoja[]>>(`/api/v1/produto/produtoloja/${idProduto}`).pipe(
        catchError(erro => {
          return of(this.retornaObjErro(erro.error.retorno.mensagens))
        })
      );
    } else {
      return of(this.retornaObjErro([{ codigo: '0.00', descricao: 'Id do produto não informado.' }]))
    }
  }

  excluirProduto(idProduto: number | null, idLoja: number | null = null): Observable<TRetornoApi<null>> {
    if (idProduto) {
      return this.http.delete<TRetornoApi<null>>(`/api/v1/produto?id_produto=${idProduto}&id_loja=${idLoja}`).pipe(
        catchError((erro) => {
          return of(this.retornaObjErro(erro.error.retorno.mensagens))
        })
      );
    } else {
      return of(this.retornaObjErro([{ codigo: '0.00', descricao: 'Id do produto não informado' }]))
    }
  }

  gravarProduto(produto: TObjCadastro): Observable<TRetornoApi<TProduto[]>> {
    if (produto.id != '') {
      return this.http.put<TRetornoApi<TProduto[]>>('/api/v1/produto', produto).pipe(
        catchError((erro) => {
          return of(this.retornaObjErro(erro.error.retorno.mensagens))
        })
      );
    } else {
      return this.http.post<TRetornoApi<TProduto[]>>('/api/v1/produto', produto).pipe(
        catchError((erro) => {
          return of(this.retornaObjErro(erro.error.retorno.mensagens))
        })
      );
    }
  }

  arrayProdutosLoja = signal<TProdutoLoja[]>([] as TProdutoLoja[])
  atualizaArrayProdutosLoja(novoArray: TProdutoLoja[]) {
    this.arrayProdutosLoja.set(novoArray)
  }
}