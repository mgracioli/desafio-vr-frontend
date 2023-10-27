import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidator {

  constructor() { }

  //método que retorna as mensagens de erro referentes ao validators que não foram atendidos
  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config: any = {
      'required': `${fieldName} é obrigatório.`,
      'maxlength': `${fieldName} precisa ter, no máximo, ${validatorValue.requiredLength} caracteres.`,
    };
    return config[validatorName];
  }
}
