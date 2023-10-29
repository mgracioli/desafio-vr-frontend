import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ToastComponent } from './toast/toast.component';
import { ModalLojaPrecoComponent } from './modal-loja-preco/modal-loja-preco.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { CampoErroComponent } from './campo-erro/campo-erro.component';

@NgModule({
  declarations: [
    ToastComponent,
    ModalLojaPrecoComponent,
    DropdownComponent,
    CampoErroComponent
  ],
  imports: [
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
