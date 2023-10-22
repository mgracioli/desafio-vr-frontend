import { Component, Input } from '@angular/core';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  @Input()
  mensagem: string;

  @Input()
  tipoToast: string;

}
