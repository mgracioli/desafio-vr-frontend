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
  selector: 'gridProdutoLoja',
  templateUrl: './grid-produto-loja.component.html',
  styleUrls: ['./grid-produto-loja.component.scss']
})
export class GridLojaComponent {
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
      this.arrayProdutos = produtoService.arrayProdutos();
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
              return this.produtoService.buscarProdutoVenda(this.arrayProdutos[0].id_produto)
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
        .subscribe(data => (this.arrayProdutos = data));
    } else {
      //erro aquiii
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
    }
  }

  onEdit(produto: TProduto) {
    this.editar.emit(produto)
  }

  excluir(rowId: number) {
    this.produtoService.excluirProduto(rowId).subscribe(data => {
      if (data.retorno.codigo_status === 200) {
        console.log('produto excluído com sucesso',)
      } else {
        console.log('Erro ao excluir produto', data)
      }
    })
  }

  adicionarLoja() {
    this.dialog.open(ModalLojaPrecoComponent)
  }
}
