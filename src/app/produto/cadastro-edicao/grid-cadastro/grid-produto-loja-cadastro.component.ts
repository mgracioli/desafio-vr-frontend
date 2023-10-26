import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, Output, EventEmitter, signal, Input, SimpleChanges, effect } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf, of, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, DatePipe } from '@angular/common';
import { TProduto, TProdutoLoja, TRetornoApiProdLoja } from 'src/app/produto/@types/produto.types';
import { ProdutoService } from 'src/app/services/produto.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalLojaPrecoComponent } from 'src/app/components/modal-loja-preco/modal-loja-preco.component';

@Component({
  selector: 'gridProdutoLojaCadastro',
  templateUrl: './grid-produto-loja-cadastro.component.html',
  styleUrls: ['./grid-produto-loja-cadastro.component.scss']
})
export class GridProdutoLojaCadastroComponent {
  @Input() resetForm: boolean;
  @Output() editarLojaCad = new EventEmitter();

  arrayProdutosCadastro: TProdutoLoja[] = []

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
      // const produtos = produtoService.arrayProdutos()

      // if (produtos?.[0]?.loja_desc && produtos[0].loja_desc !== null) {
      //   this.arrayProdutosCadastro = produtoService.arrayProdutos();
      // } else {
      //   this.arrayProdutosCadastro = [];
      // }
    })
  }

  ngAfterViewInit() {
    // if (this.arrayProdutosCadastro.length > 0) {
    //   this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    //   merge(this.sort.sortChange, this.paginator.page)
    //     .pipe(
    //       startWith({}),
    //       switchMap(() => {
    //         this.isLoadingResults = true;

    //         // return this.exampleDatabase!.getRepoIssues(
    //         //   this.sort.active,
    //         //   this.sort.direction,
    //         //   this.paginator.pageIndex,
    //         // ).pipe(catchError(() => observableOf(null)));

    //         if (this.arrayProdutosCadastro.length > 0) {
    //           return this.produtoService.buscarProduto(`${this.arrayProdutosCadastro[0].id}`)
    //             .pipe(catchError(() => observableOf(null)));
    //         } else {
    //           return []
    //         }
    //       }),

    //       map((data: any) => {
    //         const dados = data.retorno.dados ? [...data.retorno.dados] : null

    //         this.isLoadingResults = false;
    //         this.isRateLimitReached = dados === null;

    //         if (dados === null) {
    //           return [];
    //         }

    //         this.resultsLength = 0;
    //         return dados;
    //       })
    //     )
    //     .subscribe(data => { (this.arrayProdutosCadastro = data) });
    // } else {
    //   //erro aquiii
    //   this.isLoadingResults = false;
    //   this.isRateLimitReached = true;
    // }
  }

  editarProdutoLojaCad(produto: TProduto) {
    this.editarLojaCad.emit(produto)
  }

  //passar id  da loja a ser excluido
  excluirProdutoLojaCad(id_produto: number, id_loja: number) {

  }

  adicionarLojaCad() {
    this.dialog.open(ModalLojaPrecoComponent)
  }
}
