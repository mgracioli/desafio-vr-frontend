import { Component } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { TToastInfo } from '../components/toast/@Types/toast.types';
import { DropdownService } from '../services/dropdown.service';
import { TLoja } from './@types/loja.types';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.scss']
})
export class LojaComponent {
  public lojas$: Observable<TLoja[]>;
  public toasts: Array<TToastInfo>;

  constructor(
    private dropdownService: DropdownService
  ) { }

  ngOnInit(): void {
    this.lojas$ = this.dropdownService.getLojas()
      .pipe(
        catchError(erro => {
          this.toasts.push({ codigo: '0.00', descricao: `Erro ao buscar lojas - ${erro}`, tipoToast: 'Erro' })
          return of([])
        })
      );
  }

}
