import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultaProdutoComponent } from './produto/consulta/consulta-produto.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { CadastroEdicaoProdutoComponent } from './produto/cadastro-edicao/cadastro-edicao-produto.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GridCadastroEdicaoProdutoComponent } from './produto/cadastro-edicao/grid-cadastro-edicao/grid-cadastro-edicao-produto.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { Utils } from './utils/sistema.utils';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { GridConsultaComponent } from './produto/consulta/grid-consulta/grid-consulta-produto.component';
import { CurrencyMaskModule, CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";

registerLocaleData(localePt);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  decimal: ",",
  precision: 3,
  prefix: "",
  suffix: "",
  thousands: ".",
};

@NgModule({
  declarations: [
    AppComponent,
    ConsultaProdutoComponent,
    PaginaNaoEncontradaComponent,
    CadastroEdicaoProdutoComponent,
    GridCadastroEdicaoProdutoComponent,
    GridConsultaComponent
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
    ComponentsModule,
    CurrencyMaskModule
  ],
  providers: [
    Utils,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4500, panelClass: ['snackbarstyle'] } },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
