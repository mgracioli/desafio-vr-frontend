import { Component } from '@angular/core';
import { TLojaPreco, TObjCadastro, TProdutoLoja, TRetornoApi } from '../@types/produto.types';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { ProdutoService } from 'src/app/services/produto.service';
import { TLoja } from '../@types/loja.types';
import { MatDialog } from '@angular/material/dialog';
import { Utils } from 'src/app/utils/sistema.utils';
import { Router } from '@angular/router';

@Component({
  selector: 'cadastro-edicao-produto',
  templateUrl: './cadastro-edicao-produto.component.html',
  styleUrls: ['./cadastro-edicao-produto.component.scss']
})
export class CadastroEdicaoProdutoComponent {
  lojas$: Observable<TLoja[]>;
  formulario = this.formBuilder.group({
    id: [{ value: '', disabled: true }],
    descricao: ['', [Validators.required, Validators.maxLength(60)]],
    custo: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    public dialog: MatDialog,
    private utils: Utils,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const produtosRetorno: TRetornoApi<TProdutoLoja[]> = this.route.snapshot.data['produtosLoja']
    if (produtosRetorno && produtosRetorno.retorno.dados) {
      const arrayProdutos: TProdutoLoja[] = [...produtosRetorno.retorno.dados];

      this.formulario.setValue({
        id: arrayProdutos[0].id,
        descricao: arrayProdutos[0].prod_desc,
        custo: arrayProdutos[0].prod_custo,
      })

      this.produtoService.atualizaArrayProdutosLoja(produtosRetorno.retorno.dados)
    } else {
      this.formulario.setValue({
        id: '',
        descricao: '',
        custo: '',
      })

      this.produtoService.atualizaArrayProdutosLoja([] as TProdutoLoja[])
    }
  }

  excluirProduto() {
    const idProduto = this.formulario.get('id')?.value

    if (idProduto && idProduto != '') {
      this.produtoService.excluirProduto(parseInt(idProduto))
        .pipe(take(1))
        .subscribe((): void => {
          this.utils.exibeToast([{ codigo: '0.00', descricao: 'Produto excluído com sucesso!' }])
        })

      this.router.navigate(['']);
    } else {
      this.utils.exibeToast([{ codigo: '0.00', descricao: 'Produto não pode se excluído!' }])
    }
  }

  cadastrarProdutoLoja() {
    const arrayLojaPreco: TLojaPreco[] = this.produtoService.arrayProdutosLoja()
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
      this.produtoService.gravarProduto(objCadastro).pipe(take(1)).subscribe(data => {
        if (data.retorno.codigo_status == 200) {
          this.utils.exibeToast([{ codigo: '0.00', descricao: 'Produto gravado com sucesso!' }])
          this.router.navigate(['']);
        } else if (data.retorno.mensagens) {
          this.utils.exibeToast(data.retorno.mensagens)
        } else {
          this.utils.exibeToast([{ codigo: '0.00', descricao: 'Erro ao gravar produto!' }])
        }
      })
    }
  }

  objetoValido(objCadastro: TObjCadastro): Boolean {
    if (objCadastro.descricao == '') {
      this.utils.exibeToast([{ codigo: '0.00', descricao: 'Não foi possível salvar: Um ou mais campos obrigatórios não foram preenchidos' }])
      return false
    }

    if (!objCadastro.lojas_preco.length) {
      this.utils.exibeToast([{ codigo: '0.00', descricao: 'Não foi possível salvar: Produto não vinculado a nenhuma loja' }])
      return false
    }

    if (`${objCadastro.custo}`.length > 14) {
      this.utils.exibeToast([{ codigo: '0.00', descricao: 'Valor de custo não pode ser maior que 9.999.999.999,99' }])
      return false
    }

    return true
  }

  resetarDados() {
    this.formulario.reset();
    this.produtoService.atualizaArrayProdutosLoja([] as TProdutoLoja[])
  }

  verificaValidTouched(campo: string) {
    return !this.formulario.get(campo)!.valid && this.formulario.get(campo)!.touched
  }

  toastMensagemRetorno(data: TRetornoApi<null>) {
    if (data.retorno.codigo_status === 200) {
      this.resetarDados();
      this.utils.exibeToast([{ codigo: '0.00', descricao: 'Produto excluído com sucesso!' }])
    } else if (data.retorno.codigo_status === 500 && data.retorno.mensagens) {
      this.utils.exibeToast(data.retorno.mensagens)
    } else {
      this.utils.exibeToast([{ codigo: '0.00', descricao: 'Erro ao realizar operação!' }])
    }
  }
}
