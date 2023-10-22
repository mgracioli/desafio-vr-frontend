import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidator {

  constructor() { }

  static equalsTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo');
      }

      //validação que verifica se a raiz do grupo (raíz/root é o grupo pai que contém todos os elementos (controles) do formulário - é o "this.formulario = this.formBuilder.group") existe e se os controles do formulário também já existem; caso não existam, o controle de confirmação do cep não pode funcionar senão vai dar erro
      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      //seleciona o campo email
      const field = (<FormGroup>formControl.root).get(otherField);  //root é o grupo pai que contém todos os campos/elementos/controles do formulário

      if (!field) {
        throw new Error("É necessário informar um campo válido")
      }

      //verifica se os dois campos tem os mesmos valores (o campo de email e o de validação do email)
      if (field.value !== formControl.value) {
        return { equalsTo: otherField };  //equalsTo é o nome do erro que vai ser retornado caso os valores dos dois campos não sejam iguais
      }

      return null;  //se retornar null, nesse caso, quer dizer que os campos estão com o mesmo valor
    };
    return validator;
  }
}
