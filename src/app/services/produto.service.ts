import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TProduto, TProdutoLoja, TRetornoApi, TRetornoApiErro } from "../produto/@types/produto.types";
import { environment } from "src/environments/environment";
import { Observable, catchError, of, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  retornoProdutoErro: TRetornoApiErro = {
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

  buscarProdutos(): Observable<TRetornoApi> {
    return this.http.get<TRetornoApi>('/api/v1/produto').pipe(
      catchError(erro => {
        return of({
          retorno: {
            status: '',
            codigo_status: 0,
            dados: null
          }
        })
      })
    );
  }

  buscarProduto(id: string | null): any {
    if (id) {
      return this.http.get<TProdutoLoja[]>(`/api/v1/produtoloja/${id}`).pipe(
        catchError(erro => {
          return of({
            id: 0,
            id_produto: 0,
            id_loja: 0,
            preco_venda: '',
            prod_desc: '',
            prod_custo: '',
            prod_imagem: null,
            loja_desc: '',
          })
        })
      );
    } else {

      ///pegar so o produto (nao a grid) pq é um cadastro
      return of({
        id: 0,
        id_produto: 0,
        id_loja: 0,
        preco_venda: '',
        prod_desc: '',
        prod_custo: '',
        prod_imagem: null,
        loja_desc: '',
      })
    }
  }

  excluirProduto(id: number | null): Observable<TRetornoApi | TRetornoApiErro> {
    if (id) {
      return this.http.delete<any>(`/api/v1/produto/${id}`).pipe(
        catchError((erro) => {
          console.log('wweeerrrrroororo', erro.error.retorno.mensagens)
          const objErro = {
            ...this.retornoProdutoErro,
            mensagens: [{
              codigo: '0.00',
              descricao: erro.error.retorno.mensagens
            }]
          }
          return of(objErro)
        })
      );
    } else {
      return of(this.retornoProdutoErro)
    }
  }

  gravarProduto(produto: Partial<TProduto>): any {
    if (produto.id) {
      return this.http.post<TProduto>('/api/v1/produto', produto).pipe(
        catchError((erro) => {
          const objErro = {
            ...this.retornoProdutoErro,
            mensagens: [{
              codigo: '0.00',
              descricao: erro
            }]
          }
          return of(objErro)
        })
      );
    } else {
      return this.http.put<any>(`/api/v1/produto/editar/${produto.id}`, produto).pipe(
        catchError(() => {
          return of(this.retornoProdutoErro)
        })
      );
    }
  }

  buscarProdutoVenda(id: number): any {
    return this.http.get<any>(`/api/v1/produtoloja/${id}`).pipe(
      catchError(() => {
        return of(this.retornoProdutoErro)
      })
    );
  }


  listener: Subject<boolean> = new Subject()
  listen(): Observable<boolean> {
    return this.listener.asObservable();
  }

  resetForm() {
    this.listener.next(true)
  }

  // resetForms() {
  //   this.ress.next(true)
  // }

  listener2: Subject<TProdutoLoja[]> = new Subject()
  listen2(): Observable<TProdutoLoja[]> {
    return this.listener2.asObservable();
  }

  atualizaDados(obj: TProdutoLoja[]) {
    this.listener2.next(obj)
  }
}