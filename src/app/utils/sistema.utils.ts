import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TMensagem } from "./@types/sistema.types";

@Injectable({
  providedIn: 'root'
})
export class Utils {

  constructor(
    private toast: MatSnackBar
  ) { }

  public exibeToast(mensagens: TMensagem[]) {
    mensagens.forEach(mensagem => {
      this.toast.open(`${mensagem.codigo} - ${mensagem.descricao}`)
    })
  }
}