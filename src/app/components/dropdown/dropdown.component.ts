import { Component, Input } from '@angular/core';
import { TLoja } from 'src/app/produto/@types/loja.types';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input()
  options: TLoja[];
}
