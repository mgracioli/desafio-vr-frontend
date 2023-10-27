import { Component } from '@angular/core';
import { TLojaPreco, TObjCadastro, TProdutoLoja, TRetornoApi } from '../@types/produto.types';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProdutoService } from 'src/app/services/produto.service';
import { TLoja } from '../@types/loja.types';
import { MatDialog } from '@angular/material/dialog';
import { Utils } from 'src/app/utils/sistema.utils';

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
    private utils: Utils) {
  }

  ngOnInit(): void {
    const produto: TRetornoApi<TProdutoLoja[]> = this.route.snapshot.data['produtosLoja']

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

      this.produtoService.atualizaArrayProdutos([] as TProdutoLoja[])
    }
  }

  excluirProduto() {
    if (this.formulario.value.id && this.formulario.value.id != '') {
      this.produtoService.excluirProduto(this.formulario.value.id ? parseInt(this.formulario.value.id) : null)
        .subscribe((data: TRetornoApi<null>): void => {
          this.toastMensagemRetorno(data)
        })
    } else {
      this.utils.exibeToast([{ codigo: '0.00', descricao: 'Produto não pode se excluído!' }])
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
        if (data.retorno.codigo_status == 200) {
          this.utils.exibeToast([{ codigo: '0.00', descricao: 'Produto gravado com sucesso!' }])
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
