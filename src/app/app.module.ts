import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutoComponent } from './produto/produto.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { CadastroEdicaoComponent } from './produto/cadastro-edicao/cadastro-edicao.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GridLojaComponent } from './produto/cadastro-edicao/grid-edicao/grid-produto-loja.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GridProdutoLojaCadastroComponent } from './produto/cadastro-edicao/grid-cadastro/grid-produto-loja-cadastro.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { Utils } from './utils/sistema.utils';

@NgModule({
  declarations: [
    AppComponent,
    ProdutoComponent,
    PaginaNaoEncontradaComponent,
    CadastroEdicaoComponent,
    GridLojaComponent,
    GridProdutoLojaCadastroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    ComponentsModule
  ],
  providers: [
    Utils,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4500, panelClass: ['snackbarstyle'] } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
