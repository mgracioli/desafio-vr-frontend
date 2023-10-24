import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, of } from 'rxjs';
import { TToastInfo } from '../components/toast/@Types/toast.types';
import { FormValidator } from '../utils/form-validator';
import { TProduto } from './@types/produto.types';
import { Router, ActivatedRoute } from '@angular/router'
import { TLoja } from './@types/loja.types';
@Component({
  selector: 'produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {
  formulario: FormGroup;
  lojas$: Observable<TLoja[]>;
  toasts: Array<TToastInfo>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) {
    // super();  //chama o construtor da classe BaseFormComponet
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      codigo: [null],
      descricao: [null, [Validators.required, Validators.maxLength(60)]],
      custo: [null, [FormValidator.equalsTo('email')]],
      precoVenda: [null],
    });
  }

  onSubmit() {

  }

  incluirProduto() {
    this.router.navigate(['cadastro'], { relativeTo: this.route })
  }

  onEdit(produto: TProduto) {
    this.router.navigate(['cadastro', produto.id], { relativeTo: this.route })
  }
}
