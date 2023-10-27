import { Component, ViewChild, Output, EventEmitter, Input, effect } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private produtoService: ProdutoService,
    public dialog: MatDialog
  ) {
    effect(() => {
      const produtos = produtoService.arrayProdutos()

      if (produtos?.[0]?.loja_desc && produtos[0].loja_desc !== null) {
        this.arrayProdutos = produtoService.arrayProdutos();
      } else {
        this.arrayProdutos = [];
      }
    })
  }

  ngAfterViewInit() {
    if (this.arrayProdutos.length > 0) {
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;

            // return this.exampleDatabase!.getRepoIssues(
            //   this.sort.active,
            //   this.sort.direction,
            //   this.paginator.pageIndex,
            // ).pipe(catchError(() => observableOf(null)));

            if (this.arrayProdutos.length > 0) {
              return this.produtoService.buscarProduto(`${this.arrayProdutos[0].id}`)
                .pipe(catchError(() => observableOf(null)));
            } else {
              return []
            }
          }),

          map((data: any) => {
            const dados = data.retorno.dados ? [...data.retorno.dados] : null

            this.isLoadingResults = false;
            this.isRateLimitReached = dados === null;

            if (dados === null) {
              return [];
            }

            this.resultsLength = 0;
            return dados;
          })
        )
        .subscribe(data => { (this.arrayProdutos = data) });
    } else {
      //erro aquiii
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
    }
  }

  editarProdutoLoja(loja: TProdutoLoja) {
    let dialogRef = this.dialog.open(ModalLojaPrecoComponent)
    dialogRef.componentInstance.registroEdicaoLoja.idLoja = loja.id_loja
    dialogRef.componentInstance.registroEdicaoLoja.descricao = loja.loja_desc
  }

  excluirProdutoLoja(id_produto: number, id_loja: string) {
    const arrayProdExcluido = this.arrayProdutos.filter(prodAnt => prodAnt.id_loja !== id_loja)
    this.produtoService.atualizaArrayProdutos(arrayProdExcluido)
  }

  adicionarLojaPreco() {
    let dialogRef = this.dialog.open(ModalLojaPrecoComponent)
    dialogRef.componentInstance.registroEdicaoLoja.idLoja = null
    dialogRef.componentInstance.registroEdicaoLoja.descricao = ''
  }
}
