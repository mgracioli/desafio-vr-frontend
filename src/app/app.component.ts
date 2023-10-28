import { Component } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorIntlService } from './services/paginator-intl.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }]
})
export class AppComponent {
  title = 'desafio-vr-frontend';
}
