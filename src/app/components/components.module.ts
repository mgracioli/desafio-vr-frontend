import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ModalLojaPrecoComponent } from './modal-loja-preco/modal-loja-preco.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'
import { DropdownComponent } from './dropdown/dropdown.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CampoErroComponent } from './campo-erro/campo-erro.component';

@NgModule({
  declarations: [
    ToastComponent,
    ModalLojaPrecoComponent,
    DropdownComponent,
    CampoErroComponent
  ],
  imports: [
    DatePipe,
    NgIf,
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule
  ],
  exports: [
    ToastComponent,
    DropdownComponent,
    CampoErroComponent
  ]
})
export class ComponentsModule { }
