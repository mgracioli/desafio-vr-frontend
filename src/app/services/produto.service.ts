import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TProduto, TRetornoApi } from "../produto/@types/produto.types";
import { environment } from "src/environments/environment";
import { Observable, catchError, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  buscarProdutos(): any {
    return this.http.get<TProduto[]>('/api/v1/produto').pipe(
      catchError(erro => {
        return of([])
      })
    );
  }

  buscarProdutoPorId(id: string | null): any {
    if (id) {
      return this.http.get<TProduto>(`/api/v1/produto/${id}`).pipe(
        catchError(erro => {
          return of({
            id: '',
            descricao: '',
            custo: '',
            imagem: ''
          })
        })
      );
    } else {
      //chamar toast de erro
      return of({
        id: '',
        descricao: '',
        custo: '',
        imagem: ''
      })
    }
  }

  excluirProduto(id: number): Observable<TRetornoApi> {
    return this.http.delete<any>(`/api/v1/produto/${id}`).pipe(
      catchError(() => {
        return of({
          retorno: {
            status: "Erro",
            codigo_status: 500,
            dados: null
          }
        })
      })
    );
  }

  gravarProduto(produto: Partial<TProduto>): any {
    if (produto.id) {
      return this.http.post<TProduto>('/api/v1/produto', produto).pipe(
        catchError(() => {
          return of({
            retorno: {
              status: "Erro",
              codigo_status: 500,
              dados: null
            }
          })
        })
      );
    } else {
      return this.http.put<any>(`/api/v1/produto/editar/${produto.id}`, produto).pipe(
        catchError(() => {
          return of({
            retorno: {
              status: "Erro",
              codigo_status: 500,
              dados: null
            }
          })
        })
      );
    }
  }
}