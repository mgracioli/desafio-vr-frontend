import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TLoja } from '../produto/@types/produto.types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getLojas() {
    return this.http.get<TLoja[]>(`${environment.API}/loja`);
  }
}
