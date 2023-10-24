import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TLoja } from 'src/app/produto/@types/loja.types';
import { LojaService } from 'src/app/services/loja.service'

@Component({
  selector: 'app-modal-loja-preco',
  templateUrl: './modal-loja-preco.component.html',
  styleUrls: ['./modal-loja-preco.component.scss']
})
export class ModalLojaPrecoComponent implements OnInit {
  options: TLoja[] = []

  constructor(
    private lojaService: LojaService,
    public dialogRef: MatDialogRef<ModalLojaPrecoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TLoja,
  ) { }

  ngOnInit() {
    this.lojaService.buscarLojas().subscribe(data => {
      if (data.retorno.codigo_status == 200 && data.retorno.dados) {
        this.options = [...data.retorno.dados]
      }
    })
  }

  fecharModal() {
    this.dialogRef.close()
  }

  salvarPrecoLoja() {

  }
}
