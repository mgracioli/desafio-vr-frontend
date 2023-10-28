import { Component, ViewChild, Output, EventEmitter, Input, effect } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { TProdutoLoja } from 'src/app/produto/@types/produto.types';
import { ProdutoService } from 'src/app/services/produto.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalLojaPrecoComponent } from 'src/app/components/modal-loja-preco/modal-loja-preco.component';

@Component({
  selector: 'grid-cadastro-edicao-produto',
  templateUrl: './grid-cadastro-edicao-produto.component.html',
  styleUrls: ['./grid-cadastro-edicao-produto.component.scss']
})
export class GridCadastroEdicaoProdutoComponent {
  @Input() resetForm: boolean;
  @Output() editar = new EventEmitter();

  arrayProdutos: TProdutoLoja[] = []
  displayedColumns: string[] = ['loja', 'precoVenda', 'acoes'];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  limit = 5
  currentPage = 0
  total = 0

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private produtoService: ProdutoService,
    public dialog: MatDialog
  ) {
    effect(() => {
      const produtos = produtoService.arrayProdutos()

      if (produtos?.[0]?.loja_desc && produtos[0].loja_desc !== null) {
        //remover esse pop (tirar paginacao do get produtoloja)
        produtoService.arrayProdutos().pop()
        this.arrayProdutos = produtoService.arrayProdutos();
        //verificar paginacao
        this.total = produtoService.arrayProdutos().length
      } else {
        this.arrayProdutos = [];
      }
    })
  }

  ngAfterViewInit() {
    this.atualizaGrid()
  }

  editarProdutoLoja(loja: TProdutoLoja) {
    let dialogRef = this.dialog.open(ModalLojaPrecoComponent)
    dialogRef.componentInstance.registroEdicaoLoja.idLoja = loja.id_loja
    dialogRef.componentInstance.registroEdicaoLoja.descricao = loja.loja_desc
  }

  excluirProdutoLoja(id_produto: number, id_loja: string) {
    const arrayProdExcluido = this.arrayProdutos.filter(prodAnt => prodAnt.id_loja !== id_loja)
    this.produtoService.atualizaArrayProdutos(arrayProdExcluido)
    //verificar aabaixo
    this.total = arrayProdExcluido.length
    this.atualizaGrid()
  }

  adicionarLojaPreco() {
    let dialogRef = this.dialog.open(ModalLojaPrecoComponent)
    dialogRef.componentInstance.registroEdicaoLoja.idLoja = null
    dialogRef.componentInstance.registroEdicaoLoja.descricao = ''
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
  }

  atualizaGrid() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          console.log('wwarrayProdutos', this.arrayProdutos)

          const max = this.currentPage + 1 * this.limit
          const min = max - this.limit

          console.log('wwamax', max)
          console.log('wwamin', min)

          const novoArr = this.arrayProdutos.filter((produto, index) => {
            index >= min && index <= max
          })

          console.log('wwwnovovaar', novoArr)
          console.log('wwtotal', this.total)
          return of({
            retorno: {
              dados: [...novoArr, { total: this.total }]
            }
          })
          // return this.produtoService.buscarProduto(this.arrayProdutos[0].id, this.currentPage, this.limit)
          //   .pipe(
          //     catchError(() => of([]))
          //   );
        }),

        map((data: any) => {
          console.log('wwwdataa', data.retorno.dados)
          const dados = data.retorno.dados ?? null
          this.isLoadingResults = false;
          this.isRateLimitReached = dados === null;

          if (dados === null) {
            return [];
          }

          const objTotal = dados.pop()
          this.resultsLength = objTotal.total;
          return dados;
        })
      )
      .subscribe(data => this.produtoService.atualizaArrayProdutos(data));
  }
}
