import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaProdutoComponent } from './produto/consulta/consulta-produto.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ProdutosResolver } from './produto/guards/produtos.resolver';
import { ProdutoResolver } from './produto/guards/produto.resolver';
import { CadastroEdicaoProdutoComponent } from './produto/cadastro-edicao/cadastro-edicao-produto.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultaProdutoComponent,
    resolve: { produtos: ProdutosResolver }
  },
  {
    path: 'cadastro',
    component: CadastroEdicaoProdutoComponent,
    resolve: { produtosLoja: ProdutoResolver }
  },
  {
    path: 'cadastro/:id',
    component: CadastroEdicaoProdutoComponent,
    resolve: { produtosLoja: ProdutoResolver }
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
