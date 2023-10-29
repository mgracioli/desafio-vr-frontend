import { Component, ViewChild, effect, OnDestroy, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Subject, of } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { TProdutoLoja } from 'src/app/produto/@types/produto.types';
import { ProdutoService } from 'src/app/services/produto.service';
import { ModalLojaPrecoComponent } from 'src/app/components/modal-loja-preco/modal-loja-preco.component';

@Component({
  selector: 'grid-cadastro-edicao-produto',
  templateUrl: './grid-cadastro-edicao-produto.component.html',
  styleUrls: ['./grid-cadastro-edicao-produto.component.scss']
})
export class GridCadastroEdicaoProdutoComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['loja', 'precoVenda', 'acoes'];
  arrayProdutos: TProdutoLoja[] = []
  resultsLength: number = 0;
  isLoadingResults: boolean = true;
  isRateLimitReached: boolean = false;
  limit: number = 5
  currentPage: number = 0
  total: number = 0
  max: number = 0
  min: number = 0
  unsubscribe$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private produtoService: ProdutoService,
    public dialog: MatDialog
  ) {
    effect(() => {
      const produtos = produtoService.arrayProdutosLoja()

      if (produtos?.[0]?.loja_desc && produtos[0].loja_desc !== null) {
        this.arrayProdutos = produtos;
        this.atualizarGrid(false, true)
      } else {

        this.arrayProdutos = [] as TProdutoLoja[];
      }
    })
  }

  ngAfterViewInit() {
    this.atualizarGrid()
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  editarProdutoLoja(loja: TProdutoLoja) {
    let dialogRef = this.dialog.open(ModalLojaPrecoComponent)
    dialogRef.componentInstance.registroEdicaoLoja.idLoja = loja.id_loja
    dialogRef.componentInstance.registroEdicaoLoja.descricao = loja.loja_desc
    dialogRef.componentInstance.precoVenda = loja.preco_venda
  }

  excluirProdutoLoja(id_loja: string) {
    const arrayProdExcluido = this.produtoService.arrayProdutosLoja().filter(prodAnt => prodAnt.id_loja !== id_loja)
    this.produtoService.atualizaArrayProdutosLoja(arrayProdExcluido)

    this.atualizarGrid(true)
  }

  adicionarLojaPreco() {
    let dialogRef = this.dialog.open(ModalLojaPrecoComponent)
    dialogRef.componentInstance.registroEdicaoLoja.idLoja = null
    dialogRef.componentInstance.registroEdicaoLoja.descricao = ''
  }

  trocarDePagina(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
  }

  atualizarGrid(exclusao: boolean = false, cadastroEdicao: boolean = false) {
    this.paginator.page
      .pipe(
        startWith({} as PageEvent),
        switchMap((paginator: PageEvent) => {
          this.isLoadingResults = true;

          if (!exclusao && !cadastroEdicao) {
            this.max = ((!paginator.previousPageIndex) || (paginator.previousPageIndex < paginator.pageIndex)) ?
              this.max + this.limit
              :
              this.max - this.limit

            this.min = this.max - this.limit
          }

          const novoArr = this.produtoService.arrayProdutosLoja().filter((produto, index) => {
            return (
              produto.loja_desc !== null &&
              index >= this.min &&
              index < this.max
            )
          })

          return of({
            retorno: {
              dados: novoArr.length ? [...novoArr] : null
            }
          })
        }),

        map((data: any) => {
          const dados = data.retorno.dados ?? null
          this.isLoadingResults = false;
          this.isRateLimitReached = dados === null;

          if (dados === null) {
            return [];
          }

          this.resultsLength = this.produtoService.arrayProdutosLoja().length;
          return dados;
        })
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => { this.arrayProdutos = data });
  }
}
