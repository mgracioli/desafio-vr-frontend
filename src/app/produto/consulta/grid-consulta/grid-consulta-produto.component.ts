import { Component, ViewChild, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { catchError, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

import { TProduto } from 'src/app/produto/@types/produto.types';
import { ProdutoService } from 'src/app/services/produto.service';
import { Utils } from 'src/app/utils/sistema.utils';

@Component({
  selector: 'grid-consulta-produto',
  templateUrl: './grid-consulta-produto.component.html',
  styleUrls: ['./grid-consulta-produto.component.scss'],
})
export class GridConsultaComponent implements AfterViewInit, OnDestroy {
  @Input()
  formulario: FormGroup

  displayedColumns: string[] = ['codigo', 'descricao', 'custo', 'acoes'];
  arrayProdutos: TProduto[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  limit = 5
  currentPage = 0
  unsubscribe$ = new Subject<void>()

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private utils: Utils
  ) { }

  ngAfterViewInit() {
    this.atualizarGrid()
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  editarProdutoLoja(produto: TProduto) {
    this.router.navigate(['cadastro', produto.id], { relativeTo: this.route })
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
        startWith({} as PageEvent),
        switchMap(() => {
          this.isLoadingResults = true;
          const codigo = this.formulario.get('codigo')?.value
          const descricao = this.formulario.get('descricao')?.value
          const custo = this.formulario.get('custo')?.value
          const precoVenda = this.formulario.get('precoVenda')?.value

          return this.produtoService.buscarProdutos(this.currentPage, this.limit, codigo, descricao, custo, precoVenda)
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
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => { this.arrayProdutos = data });
  }
}
