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
  resultsLength: number = 0;
  isLoadingResults: boolean = true;
  isRateLimitReached: boolean = false;
  limit: number = 5
  currentPage: number = 0
  total: number = 0
  max: number = 0
  min: number = 0

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private produtoService: ProdutoService,
    public dialog: MatDialog
  ) {
    effect(() => {
      const produtos = produtoService.arrayProdutos()
      console.log('wwwcdaadaa', produtos)
      if (produtos?.[0]?.loja_desc && produtos[0].loja_desc !== null) {
        this.arrayProdutos = produtos;
      } else {
        this.arrayProdutos = [];
      }

      this.atualizarGrid(false, true)
    })
  }

  ngAfterViewInit() {
    this.atualizarGrid()
  }

  editarProdutoLoja(loja: TProdutoLoja) {
    let dialogRef = this.dialog.open(ModalLojaPrecoComponent)
    dialogRef.componentInstance.registroEdicaoLoja.idLoja = loja.id_loja
    dialogRef.componentInstance.registroEdicaoLoja.descricao = loja.loja_desc
  }

  excluirProdutoLoja(id_loja: string) {
    const arrayProdExcluido = this.produtoService.arrayProdutos().filter(prodAnt => prodAnt.id_loja !== id_loja)
    this.produtoService.atualizaArrayProdutos(arrayProdExcluido)

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

  atualizarGrid(exclusao: boolean = false, edicao: boolean = false) {
    this.paginator.page
      .pipe(
        startWith({} as PageEvent),
        switchMap((paginator: PageEvent) => {
          this.isLoadingResults = true;

          if (!exclusao && !edicao) {
            this.max = ((!paginator.previousPageIndex) || (paginator.previousPageIndex < paginator.pageIndex)) ?
              this.max + this.limit
              :
              this.max - this.limit

            this.min = this.max - this.limit
          }

          const novoArr = this.produtoService.arrayProdutos().filter((produto, index) => {
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

          // const objTotal = dados.pop()
          this.resultsLength = this.produtoService.arrayProdutos().length;
          return dados;
        })
      )
      .subscribe(data => { this.arrayProdutos = data });
  }
}
