import { Component } from '@angular/core';
import { TLojaPreco, TObjCadastro, TProdutoLoja, TRetornoApiProdLoja } from '../@types/produto.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from 'src/app/utils/form-validator';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProdutoService } from 'src/app/services/produto.service';
import { TLoja } from '../@types/loja.types';
import { MatDialog } from '@angular/material/dialog';
import { Utils } from 'src/app/utils/sistema.utils';

@Component({
  selector: 'app-cadastro-edicao',
  templateUrl: './cadastro-edicao.component.html',
  styleUrls: ['./cadastro-edicao.component.scss']
})
export class CadastroEdicaoComponent {
  lojas$: Observable<TLoja[]>;
  formulario = this.formBuilder.group({
    id: [{ value: '', disabled: true }],
    descricao: '',
    custo: ''
    // custo: ['', [FormValidator.equalsTo('email')]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private produtoService: ProdutoService,
    public dialog: MatDialog,
    private utils: Utils) {
    // super();  //chama o construtor da classe BaseFormComponet
  }

  ngOnInit(): void {
    const produto: TRetornoApiProdLoja = this.route.snapshot.data['produtosLoja']

    if (produto.retorno.dados) {
      const arrayProdutos: TProdutoLoja[] = [...produto.retorno.dados];

      this.formulario.setValue({
        id: arrayProdutos[0].id,
        descricao: arrayProdutos[0].prod_desc,
        custo: arrayProdutos[0].prod_custo,
      })

      this.produtoService.atualizaArrayProdutos(produto.retorno.dados)
    } else {
      this.formulario.setValue({
        id: '',
        descricao: '',
        custo: '',
      })

      // this.produtoService.atualizaDados(produto.retorno.dados)
      this.produtoService.atualizaArrayProdutos([] as TProdutoLoja[])
    }
  }

  excluirProduto() {
    if (this.formulario.value.id && this.formulario.value.id != '') {
      this.produtoService.excluirProduto(this.formulario.value.id ? parseInt(this.formulario.value.id) : null)
        .subscribe(data => {
          if (data.retorno.codigo_status === 200) {
            this.resetarDados();
            console.log('wwwcerto', data)
          } else {
            console.log('wwerrroo', data)
          }
        })
    } else {
      //toast de erro (pode ser q esteja tentando excluir um produto q nao existe, que está sendo cadastrado agora)
    }
  }

  cadastrarProdutoLoja() {
    const arrayLojaPreco: TLojaPreco[] = this.produtoService.arrayProdutos()
      .map(data => {
        return {
          id_loja: data.id_loja,
          preco_venda: data.preco_venda,
        }
      })

    const formValues = this.formulario.getRawValue()

    const objCadastro: TObjCadastro = {
      id: formValues.id ?? '',
      descricao: formValues.descricao ?? '',
      custo: formValues.custo ?? '',
      imagem: '',
      lojas_preco: [...arrayLojaPreco]
    }

    if (this.objetoValido(objCadastro)) {
      this.produtoService.gravarProduto(objCadastro).subscribe(data => {
        if (data.retorno.mensagens) {
          this.utils.exibeToast(data.retorno.mensagens)
        }
      })
    }
  }

  objetoValido(objCadastro: TObjCadastro): Boolean {
    if (objCadastro.descricao == '') {
      this.utils.exibeToast([{ codigo: '0.00', descricao: 'Não foi possível salvar: Um ou mais campos obrigatórios não foram preenchidos' }])
      return false
    } else if (!objCadastro.lojas_preco.length) {
      this.utils.exibeToast([{ codigo: '0.00', descricao: 'Não foi possível salvar: Produto não vinculado a nenhuma loja' }])
      return false
    }
    return true
  }

  resetarDados() {
    this.formulario.reset();
    this.produtoService.atualizaArrayProdutos([])
  }
}
