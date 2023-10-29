import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs'

import { TLoja } from 'src/app/produto/@types/loja.types';
import { TProdutoLoja } from 'src/app/produto/@types/produto.types';
import { LojaService } from 'src/app/services/loja.service'
import { ProdutoService } from 'src/app/services/produto.service';
import { Utils } from 'src/app/utils/sistema.utils';
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
  registroEdicaoLoja: TRegistroEdicaoLoja = {
    idLoja: null,
    descricao: ''
  }

  constructor(
    private lojaService: LojaService,
    private produtoService: ProdutoService,
    public dialogRef: MatDialogRef<ModalLojaPrecoComponent>,
    private utils: Utils
  ) { }

  ngOnInit() {
    if (this.registroEdicaoLoja.idLoja) {
      this.options = [{
        id: this.registroEdicaoLoja.idLoja,
        descricao: this.registroEdicaoLoja.descricao
      }]

      this.idLojaDropDown = this.registroEdicaoLoja.idLoja
      this.nomeLojaDropDown = this.registroEdicaoLoja.descricao
    } else {
      this.lojaService.buscarLojas().pipe(take(1)).subscribe(data => {
        if (data.retorno.dados) {
          this.options = [...data.retorno.dados]

          this.idLojaDropDown = this.options[0].id
          this.nomeLojaDropDown = this.options[0].descricao
        } else if (data.retorno.mensagens) {
          this.utils.exibeToast(data.retorno.mensagens)
        } else {
          this.utils.exibeToast([{ codigo: '0.00', descricao: 'Erro ao buscar lista de lojas' }])
        }
      })
    }
  }

  salvarPrecoELoja() {
    if (this.validaCamposModal()) {
      let arrayProdutos = this.produtoService.arrayProdutosLoja();

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
      this.utils.exibeToast([{ codigo: '0.00', descricao: 'Um ou mais campos obrigatórios não foram preenchidos corretamente.' }]);
    }

    if (this.precoVenda.length > 14) {
      this.utils.exibeToast([{ codigo: '0.00', descricao: 'Valor de custo não pode ser maior que 9.999.999.999,99' }])
      return false
    }


    return retorno
  }

  salvarPrecoELojaCadastroGrid(arrayProdutos: TProdutoLoja[]) {
    const lojaExistente = arrayProdutos.find(prodLoja => prodLoja.id_loja == this.idLojaDropDown)

    if (lojaExistente) {
      this.utils.exibeToast([{ codigo: '0.00', descricao: 'Não é permitido mais que um preço de venda para a mesma loja.' }]);
    } else {
      const objprodutoLoja = {
        ...arrayProdutos[0],
        id_loja: this.idLojaDropDown,
        loja_desc: this.nomeLojaDropDown,
        preco_venda: this.precoVenda
      }

      if (arrayProdutos.length && arrayProdutos[0].id_loja === null) {
        arrayProdutos = [objprodutoLoja]
      } else {
        arrayProdutos.push(objprodutoLoja)
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
    this.produtoService.atualizaArrayProdutosLoja(arrayProdutos)
    this.utils.exibeToast([{ codigo: '0.00', descricao: 'Loja incluída com sucesso' }])
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