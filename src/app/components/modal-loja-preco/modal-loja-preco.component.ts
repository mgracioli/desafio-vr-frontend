import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TLoja } from 'src/app/produto/@types/loja.types';
import { TProdutoLoja } from 'src/app/produto/@types/produto.types';
import { LojaService } from 'src/app/services/loja.service'
import { ProdutoService } from 'src/app/services/produto.service';
import { TRegistroEdicaoLoja } from './@Types/modal-loja-preco.types';

@Component({
  selector: 'app-modal-loja-preco',
  templateUrl: './modal-loja-preco.component.html',
  styleUrls: ['./modal-loja-preco.component.scss']
})
export class ModalLojaPrecoComponent implements OnInit {
  options: TLoja[] = []
  precoVenda: string = '';
  idLojaDropDown: string = '';
  nomeLojaDropDown: string = '';
  ehCadastro: boolean = false;
  registroEdicaoLoja: TRegistroEdicaoLoja = {
    idLoja: null,
    descricao: ''
  }

  constructor(
    private lojaService: LojaService,
    private produtoService: ProdutoService,
    public dialogRef: MatDialogRef<ModalLojaPrecoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TProdutoLoja,
    private toast: MatSnackBar
  ) { }

  ngOnInit() {
    if (this.registroEdicaoLoja.idLoja) {
      this.options = [{
        id: this.registroEdicaoLoja.idLoja,
        descricao: this.registroEdicaoLoja.descricao
      }]

      this.idLojaDropDown = this.options[0].id
      this.nomeLojaDropDown = this.options[0].descricao
    } else {
      this.lojaService.buscarLojas().subscribe(data => {
        if (data.retorno.codigo_status == 200 && data.retorno.dados) {
          this.options = [...data.retorno.dados]

          this.idLojaDropDown = this.options[0].id
          this.nomeLojaDropDown = this.options[0].descricao
        }
      })
    }
  }

  defineValoresIniciaisLojaDropDown() {
    this.idLojaDropDown = this.options[0].id
    this.nomeLojaDropDown = this.options[0].descricao
  }

  salvarPrecoELoja() {
    if (this.validaCamposModal()) {
      let arrayProdutos = this.produtoService.arrayProdutos();

      if (this.registroEdicaoLoja.idLoja) {
        this.salvarPrecoELojaEdicaoGrid(arrayProdutos)
      } else {
        this.salvarPrecoELojaCadastroGrid(arrayProdutos)
      }
    }
  }

  validaCamposModal() {
    const retorno = (this.idLojaDropDown && this.precoVenda)

    if (!retorno) {
      this.toast.open('Um ou mais campos obrigatórios não foram preenchidos corretamente.');
    }

    return retorno
  }

  salvarPrecoELojaCadastroGrid(arrayProdutos: TProdutoLoja[]) {
    const lojaExistente = arrayProdutos.find(prodLoja => prodLoja.id_loja == this.idLojaDropDown)

    if (lojaExistente) {
      this.toast.open('Não é permitido mais que um preço de venda para a mesma loja.');
    } else {
      if (arrayProdutos[0].id_loja === null) {
        arrayProdutos = [{
          ...arrayProdutos[0],
          id_loja: this.idLojaDropDown,
          loja_desc: this.nomeLojaDropDown,
          preco_venda: this.precoVenda
        }]
      } else {
        arrayProdutos.push({
          ...arrayProdutos[0],
          id_loja: this.idLojaDropDown,
          loja_desc: this.nomeLojaDropDown,
          preco_venda: this.precoVenda
        })
      }

      this.finalizarCadastroEdicaoPrecoELoja(arrayProdutos)
    }
  }

  salvarPrecoELojaEdicaoGrid(arrayProdutos: TProdutoLoja[]) {
    arrayProdutos = arrayProdutos.map(prod => {
      if (prod.id_loja === this.registroEdicaoLoja.idLoja) {
        return {
          ...prod,
          preco_venda: this.precoVenda
        }
      }

      return prod
    })

    this.finalizarCadastroEdicaoPrecoELoja(arrayProdutos)
  }

  finalizarCadastroEdicaoPrecoELoja(arrayProdutos: TProdutoLoja[]) {
    this.produtoService.atualizaArrayProdutos(arrayProdutos)
    this.fecharModal()
  }

  trocarLoja(loja: string) {
    const lojaSplit = loja.split('-');
    this.idLojaDropDown = lojaSplit[0]
    this.nomeLojaDropDown = lojaSplit[1]
  }

  fecharModal() {
    this.dialogRef.close()
  }
}
