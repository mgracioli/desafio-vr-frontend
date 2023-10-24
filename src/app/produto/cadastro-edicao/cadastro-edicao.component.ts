import { Component, signal } from '@angular/core';
import { TProduto, TProdutoLoja, TRetornoApiProdLoja } from '../@types/produto.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from 'src/app/utils/form-validator';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { TToastInfo } from 'src/app/components/toast/@Types/toast.types';
import { ProdutoService } from 'src/app/services/produto.service';
import { TLoja } from '../@types/loja.types';

@Component({
  selector: 'app-cadastro-edicao',
  templateUrl: './cadastro-edicao.component.html',
  styleUrls: ['./cadastro-edicao.component.scss']
})
export class CadastroEdicaoComponent {
  // arrayProdutos: TProdutoLoja[] = []
  lojas$: Observable<TLoja[]>;
  toasts: Array<TToastInfo>;
  // desabilitaCodigo: boolean = true;
  formulario = this.formBuilder.group({
    codigo: '',
    descricao: '',
    custo: ''
    // custo: ['', [FormValidator.equalsTo('email')]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private produtoService: ProdutoService) {
    // super();  //chama o construtor da classe BaseFormComponet
  }

  ngOnInit(): void {
    const produto: TRetornoApiProdLoja = this.route.snapshot.data['produtosLoja']

    console.log('wwwprodssss', produto)

    if (produto.retorno.dados) {
      const arrayProdutos: TProdutoLoja[] = [...produto.retorno.dados];

      this.formulario.setValue({
        codigo: arrayProdutos[0].id.toString(),
        descricao: arrayProdutos[0].prod_desc,
        custo: arrayProdutos[0].prod_custo,
      })

      this.produtoService.atualizaArrayProdutos(produto.retorno.dados)
    } else {
      this.formulario.setValue({
        codigo: '',
        descricao: '',
        custo: '',
      })

      // this.produtoService.atualizaDados(produto.retorno.dados)
      this.produtoService.atualizaArrayProdutos([])
    }
  }

  ngOnChange() {

  }

  excluirProduto() {
    this.produtoService.excluirProduto(this.formulario.value.codigo ? parseInt(this.formulario.value.codigo) : null)
      .subscribe(data => {
        if (data.retorno.codigo_status === 200) {
          this.resetarDados();
          console.log('wwwcerto', data)
        } else {
          console.log('wwerrroo', data)
          //tast de erro (pode ser q esteja tentando excluir um produto q nao existe)
        }
      })
  }

  onEdit(produto: TProduto) {
    this.router.navigate(['editar', produto.id], { relativeTo: this.route })
  }

  cadastrarProduto() {
    if (this.formulario.value.descricao) {
      const objCadastro = {
        descricao: this.formulario.value.descricao,
        custo: this.formulario.value.custo ?? ''
      }

      this.produtoService.gravarProduto(objCadastro)
    } else {
      //toast erro cao nao tenha validação do campo de descricao null
    }
  }

  resetarDados() {
    this.formulario.reset();
    // this.produtoService.atualizaDados([])
    this.produtoService.atualizaArrayProdutos([])
  }

  onSubmit() {
    console.log('wwwsubmeteu')
  }
}
