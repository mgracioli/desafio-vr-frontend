import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEdicaoProdutoComponent } from './cadastro-edicao-produto.component';

describe('CadastroEdicaoComponent', () => {
  let component: CadastroEdicaoProdutoComponent;
  let fixture: ComponentFixture<CadastroEdicaoProdutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroEdicaoProdutoComponent]
    });
    fixture = TestBed.createComponent(CadastroEdicaoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
