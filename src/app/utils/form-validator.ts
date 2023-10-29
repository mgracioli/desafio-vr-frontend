import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidator {

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config: any = {
      'required': `${fieldName} é obrigatório.`,
      'maxlength': `${fieldName} precisa ter, no máximo, ${validatorValue.requiredLength} caracteres.`,
    };
    return config[validatorName];
  }
}
