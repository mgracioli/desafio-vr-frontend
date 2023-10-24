import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { GridComponent } from './grid/grid.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { ModalLojaPrecoComponent } from './modal-loja-preco/modal-loja-preco.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'
import { DropdownComponent } from './dropdown/dropdown.component';
@NgModule({
  declarations: [
    ToastComponent,
    GridComponent,
    ModalLojaPrecoComponent,
    DropdownComponent
  ],
  imports: [
    DatePipe,
    NgIf,
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ],
  exports: [
    ToastComponent,
    GridComponent,
    DropdownComponent
  ]
})
export class ComponentsModule { }
