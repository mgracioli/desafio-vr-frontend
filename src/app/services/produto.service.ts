import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { TProdutoLoja, TObjCadastro, TRetornoApi, TProduto } from "../produto/@types/produto.types";
import { Observable, catchError, of } from "rxjs";
import { TMensagem } from "../utils/@types/sistema.types";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  retornaObjErro(mensagensErro: TMensagem[] | null = null) {
    return {
      retorno: {
        status: "Erro",
        codigo_status: 500,
        mensagens: mensagensErro ?? [{ codigo: '0.00', descricao: 'Erro ao realizar operação' }]
      }
    }
  }

  constructor(private http: HttpClient) { }

  buscarProdutos(page: number = 1, limit: number = 10): Observable<TRetornoApi<TProduto[]>> {
    return this.http.get<TRetornoApi<TProduto[]>>(`/api/v1/produto?page=${page}&limit=${limit}`).pipe(
      catchError(erro => {
        return of(this.retornaObjErro(erro.error.retorno.mensagens))
      })
    );
  }

  buscarProduto(id: string | null, page: number = 1, limit: number = 10): Observable<TRetornoApi<TProdutoLoja[]>> {
    if (id) {
      return this.http.get<TRetornoApi<TProdutoLoja[]>>(`/api/v1/produto/${id}?loja=true&page=${page}&limit=${limit}`).pipe(
        catchError(erro => {
          return of(this.retornaObjErro(erro.error.retorno.mensagens))
        })
      );
    } else {
      return of(this.retornaObjErro([{ codigo: '0.00', descricao: 'Id do produto não informado.' }]))
    }
  }

  excluirProduto(id: number | null, idLoja: number | null = null): Observable<TRetornoApi<null>> {
    if (id) {
      return this.http.delete<TRetornoApi<null>>(`/api/v1/produto?id_produto=${id}&id_loja=${idLoja}`).pipe(
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

  arrayProdutos = signal<TProdutoLoja[]>([] as TProdutoLoja[])
  atualizaArrayProdutos(novoArray: TProdutoLoja[]) {
    this.arrayProdutos.set(novoArray)
  }

  objProduto = signal<TProdutoLoja>({} as TProdutoLoja)
  atualizaObjProduto(novoObj: TProdutoLoja) {
    this.objProduto.set(novoObj)
  }
}