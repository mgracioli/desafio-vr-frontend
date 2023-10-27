import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError } from 'rxjs'
import { TLoja } from '../produto/@types/loja.types';
import { TRetornoApi } from '../produto/@types/produto.types';
import { TMensagem } from '../utils/@types/sistema.types';

@Injectable({
  providedIn: 'root'
})
export class LojaService {
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

  buscarLojas(): Observable<TRetornoApi<TLoja[]>> {
    return this.http.get<TRetornoApi<TLoja[]>>('/api/v1/loja').pipe(
      catchError((erro) => {
        return of(this.retornaObjErro(erro.error.retorno.mensagens))
      })
    );
  }
}
