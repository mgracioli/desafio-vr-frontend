import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'

import { GridConsultaComponent } from './grid-consulta/grid-consulta-produto.component';

@Component({
  selector: 'consulta-produto',
  templateUrl: './consulta-produto.component.html',
  styleUrls: ['./consulta-produto.component.scss']
})
export class ConsultaProdutoComponent implements OnInit {
  formulario: FormGroup;

  @ViewChild(GridConsultaComponent) gridConsulta: GridConsultaComponent;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      codigo: '',
      descricao: ['', [Validators.maxLength(60)]],
      custo: '',
      precoVenda: [{ value: '', disabled: true }],
    });
  }

  incluirProduto() {
    this.router.navigate(['cadastro'], { relativeTo: this.route })
  }

  onFocusIn(campoFocado: string) {
    const form = this.formulario.value

    Object.keys(form).forEach((campoForm) => {
      if (campoForm !== campoFocado && form[campoForm] !== '') {
        this.formulario.patchValue({ [campoForm]: '' })
      }
    });
  }

  onFocusOut() {
    const csto = this.formulario.get('custo')?.value
    if (!csto || csto == 0) {
      this.formulario.patchValue({ custo: '' })
    }

    this.gridConsulta.paginator.firstPage()
    this.gridConsulta.atualizarGrid()
  }
}
