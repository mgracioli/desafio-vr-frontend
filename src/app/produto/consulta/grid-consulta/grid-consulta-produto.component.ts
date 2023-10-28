import { Component, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { TProduto, TRetornoApi } from 'src/app/produto/@types/produto.types';
import { ProdutoService } from 'src/app/services/produto.service';
import { ActivatedRoute } from '@angular/router';
import { TMensagem } from 'src/app/utils/@types/sistema.types';
import { Utils } from 'src/app/utils/sistema.utils';

@Component({
  selector: 'grid-consulta-produto',
  templateUrl: './grid-consulta-produto.component.html',
  styleUrls: ['./grid-consulta-produto.component.scss'],
})
export class GridConsultaComponent {
  @Output()
  editar = new EventEmitter();

  displayedColumns: string[] = ['codigo', 'descricao', 'custo', 'acoes'];
  arrayProdutos: TProduto[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  limit = 5
  currentPage = 0

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private utils: Utils
  ) { }

  ngOnInit() {
    const prodRetorno: TRetornoApi<TProduto[]> = this.route.snapshot.data['produtos']

    if (prodRetorno.retorno.dados) {
      this.arrayProdutos = [...prodRetorno.retorno.dados];
    }
  }

  ngAfterViewInit() {
    this.atualizarGrid()
  }

  editarProdutoLoja(produto: TProduto) {
    this.editar.emit(produto)
  }

  excluirProdutoLoja(rowId: number) {
    this.produtoService.excluirProduto(rowId).subscribe(data => {
      if (data.retorno.codigo_status === 200) {
        this.utils.exibeToast([{ codigo: '0.00', descricao: 'Produto excluído com sucesso!' }])
        this.atualizarGrid()
      } else {
        this.utils.exibeToast([{ codigo: '0.00', descricao: 'Erro ao excluir produto' }])
      }
    })
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
  }

  atualizarGrid() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          return this.produtoService.buscarProdutos(this.currentPage, this.limit)
            .pipe(
              catchError(() => of([]))
            );
        }),

        map((data: any) => {
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
      .subscribe(data => { this.arrayProdutos = data });
  }
}
