import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TProduto } from '../@types/produto.types';
import { Router, ActivatedRoute } from '@angular/router'
import { TLoja } from '../@types/loja.types';

@Component({
  selector: 'consulta-produto',
  templateUrl: './consulta-produto.component.html',
  styleUrls: ['./consulta-produto.component.scss']
})
export class ConsultaProdutoComponent implements OnInit {
  formulario: FormGroup;
  lojas$: Observable<TLoja[]>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      codigo: [null],
      descricao: [null, [Validators.required, Validators.maxLength(60)]],
      custo: [null],
      precoVenda: [null],
    });
  }

  onSubmit() {
    console.log('wwwsunmittt') //validar
  }

  incluirProduto() {
    this.router.navigate(['cadastro'], { relativeTo: this.route })
  }

  onEdit(produto: TProduto) {
    this.router.navigate(['cadastro', produto.id], { relativeTo: this.route })
  }
}
