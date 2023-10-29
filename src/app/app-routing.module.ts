import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsultaProdutoComponent } from './produto/consulta/consulta-produto.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ProdutosResolver } from './produto/guards/produtos.resolver';
import { CadastroEdicaoProdutoComponent } from './produto/cadastro-edicao/cadastro-edicao-produto.component';
import { ProdutoLojaResolver } from './produto/guards/produtoloja.resolver';

const routes: Routes = [
  {
    path: '',
    component: ConsultaProdutoComponent,
    resolve: { produtos: ProdutosResolver }
  },
  {
    path: 'cadastro',
    component: CadastroEdicaoProdutoComponent,
  },
  {
    path: 'cadastro/:id',
    component: CadastroEdicaoProdutoComponent,
    resolve: { produtosLoja: ProdutoLojaResolver }
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
