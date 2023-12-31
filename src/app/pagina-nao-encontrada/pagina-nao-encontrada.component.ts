import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.scss']
})
export class PaginaNaoEncontradaComponent {
  constructor(
    private router: Router,
  ) { };

  voltarParaHome() {
    this.router.navigate(['']);
  }

}
