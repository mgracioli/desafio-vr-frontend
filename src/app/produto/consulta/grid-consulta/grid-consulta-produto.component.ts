import { Component, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { TProduto, TRetornoApi } from 'src/app/produto/@types/produto.types';
import { ProdutoService } from 'src/app/services/produto.service';
import { ActivatedRoute } from '@angular/router';
import { TMensagem } from 'src/app/utils/@types/sistema.types';

@Component({
  selector: 'grid-consulta-produto',
  templateUrl: './grid-consulta-produto.component.html',
  styleUrls: ['./grid-consulta-produto.component.scss'],
})
export class GridConsultaComponent implements AfterViewInit {
  @Output() editar = new EventEmitter();

  displayedColumns: string[] = ['codigo', 'descricao', 'custo', 'acoes'];
  produtos: TProduto[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const prodRetorno: TRetornoApi<TProduto[]> = this.route.snapshot.data['produtos']

    if (prodRetorno.retorno.dados) {
      this.produtos = [...prodRetorno.retorno.dados];
    }
  }

  ngAfterViewInit() {
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

          return this.produtoService.buscarProdutos()
            .pipe(catchError(() => observableOf(null)));
        }),

        map((data: any) => {
          const dados = data.retorno.dados ?? null
          this.isLoadingResults = false;
          this.isRateLimitReached = dados === null;

          if (dados === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          // this.resultsLength = dados.total_count;
          this.resultsLength = 0;
          return dados;
        })
      )
      .subscribe(data => (this.produtos = data));
  }

  editarProdutoLoja(produto: TProduto) {
    this.editar.emit(produto)
  }

  excluirProdutoLoja(rowId: number) {
    this.produtoService.excluirProduto(rowId).subscribe(data => {
      if (data.retorno.codigo_status === 200) {
        console.log('produto excluído com sucesso')
      } else {
        console.log('Erro ao excluir produto', data)
      }
    })
  }
}
