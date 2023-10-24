import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { TProduto, TProdutoLoja, TRetornoApiProduto, TRetornoApiErro, TRetornoApiProdLoja } from "../produto/@types/produto.types";
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
      return this.http.get<TRetornoApiProdLoja | TRetornoApiErro>(`/api/v1/produtoloja/${id}`).pipe(
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
      console.log('wwwaqui')
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

  excluirProduto(id: number | null): Observable<TRetornoApiProduto | TRetornoApiErro> {
    if (id) {
      return this.http.delete<any>(`/api/v1/produto/${id}`).pipe(
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

  gravarProduto(produto: Partial<TProduto>): any {
    if (produto.id) {
      return this.http.post<TProduto>(`/api/v1/produto/editar/${produto.id}`, produto).pipe(
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
      return this.http.put<any>('/api/v1/produto', produto).pipe(
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

  buscarProdutoVenda(id: number): any {
    return this.http.get<any>(`/api/v1/produtoloja/${id}`).pipe(
      catchError(() => {
        return of(this.retornoApiErro)
      })
    );
  }

  arrayProdutos = signal<TProdutoLoja[]>([])
  atualizaArrayProdutos(novoArray: TProdutoLoja[]) {
    this.arrayProdutos.set(novoArray)
  }
}