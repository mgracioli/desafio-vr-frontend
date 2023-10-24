import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TRetornoApiProduto, TRetornoApiErro } from '../produto/@types/produto.types';
import { Observable, of, catchError } from 'rxjs'
import { TRetornoApiLoja } from '../produto/@types/loja.types';

@Injectable({
  providedIn: 'root'
})
export class LojaService {
  retornoLojaErro: TRetornoApiLoja = {
    retorno: {
      status: "Erro",
      codigo_status: 500,
      dados: null
    }
  }

  constructor(private http: HttpClient) { }

  buscarLojas(): Observable<TRetornoApiLoja> {
    return this.http.get<TRetornoApiLoja>('/api/v1/loja').pipe(
      catchError(erro => {
        const objErro = {
          ...this.retornoLojaErro,
          dados: null
        }
        return of(objErro)
      })
    );
  }
}