import { Component, Input } from '@angular/core';

import { FormValidator } from 'src/app/utils/form-validator';

@Component({
  selector: 'campo-erro',
  templateUrl: './campo-erro.component.html',
  styleUrls: ['./campo-erro.component.scss']
})
export class CampoErroComponent {
  @Input() control: any;
  @Input() mensagem: string;

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return FormValidator.getErrorMsg(this.mensagem, propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }

}
