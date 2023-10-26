import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { TProdutoLoja, TRetornoApiProduto, TRetornoApiErro, TRetornoApiProdLoja, TObjCadastro } from "../produto/@types/produto.types";
import { environment } from "src/environments/environment";
import { Observable, catchError, of, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  retornoApiErro: TRetornoApiErro = {
    retorno: {
      status: "Erro",
      codigo_status: 500,
      mensagens: [{
        codigo: '0.00',
        descricao: 'Erro de servidor'
      }]
    }
  }

  constructor(private http: HttpClient) { }

  buscarProdutos(): Observable<TRetornoApiProduto | TRetornoApiErro> {
    return this.http.get<TRetornoApiProduto | TRetornoApiErro>('/api/v1/produto').pipe(
      catchError(erro => {
        const objErro = {
          ...this.retornoApiErro,
          mensagens: [{
            codigo: '0.00',
            descricao: erro.error.retorno.mensagens
          }]
        }
        return of(objErro)
      })
    );
  }

  buscarProduto(id: string | null): Observable<TRetornoApiProdLoja | TRetornoApiProduto | TRetornoApiErro> {
    if (id) {
      return this.http.get<TRetornoApiProdLoja | TRetornoApiErro>(`/api/v1/produto/${id}?loja=true`).pipe(
        catchError(erro => {
          const objErro = {
            ...this.retornoApiErro,
            mensagens: [{
              codigo: '0.00',
              descricao: erro.error.retorno.mensagens
            }]
          }
          return of(objErro)
        })
      );
    } else {
      return this.http.get<TRetornoApiProduto | TRetornoApiErro>(`/api/v1/produto/${id}`).pipe(
        catchError(erro => {
          const objErro = {
            ...this.retornoApiErro,
            mensagens: [{
              codigo: '0.00',
              descricao: erro.error.retorno.mensagens
            }]
          }
          return of(objErro)
        })
      );
    }
  }

  excluirProduto(id: number | null, idLoja: number | null = null): Observable<TRetornoApiProduto | TRetornoApiErro> {
    if (id) {
      return this.http.delete<any>(`/api/v1/produto?id_produto=${id}&id_loja=${idLoja}`).pipe(
        catchError((erro) => {
          const objErro = {
            ...this.retornoApiErro,
            mensagens: [{
              codigo: '0.00',
              descricao: erro.error.retorno.mensagens
            }]
          }
          return of(objErro)
        })
      );
    } else {
      return of(this.retornoApiErro)
    }
  }

  gravarProduto(produto: Partial<TObjCadastro>): Observable<any> {
    if (produto.id) {
      return this.http.put<TObjCadastro>('/api/v1/produto', produto).pipe(
        catchError((erro) => {
          const objErro = {
            ...this.retornoApiErro,
            mensagens: [{
              codigo: '0.00',
              descricao: erro
            }]
          }
          return of(objErro)
        })
      );
    } else {
      return this.http.post<TObjCadastro>('/api/v1/produto', produto).pipe(
        catchError((erro) => {
          const objErro = {
            ...this.retornoApiErro,
            mensagens: [{
              codigo: '0.00',
              descricao: erro
            }]
          }
          return of(objErro)
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