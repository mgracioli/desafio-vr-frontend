import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from './produto/produto.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ProdutosResolver } from './produto/guards/produtos.resolver';
import { ProdutoResolver } from './produto/guards/produto.resolver';
import { CadastroEdicaoComponent } from './produto/cadastro-edicao/cadastro-edicao.component';

const routes: Routes = [
  {
    path: '',
    component: ProdutoComponent,
    resolve: { produtos: ProdutosResolver }
  },
  {
    path: 'cadastrar',
    component: CadastroEdicaoComponent,
    resolve: { produto: ProdutoResolver }
  },
  {
    path: 'editar/:id',
    component: CadastroEdicaoComponent,
    resolve: { produto: ProdutoResolver }
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent
  }
  // {
  //   path: '/produto/editar',
  //   component: ProdutoComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
