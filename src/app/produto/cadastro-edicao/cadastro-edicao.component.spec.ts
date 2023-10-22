import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEdicaoComponent } from './cadastro-edicao.component';

describe('CadastroEdicaoComponent', () => {
  let component: CadastroEdicaoComponent;
  let fixture: ComponentFixture<CadastroEdicaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroEdicaoComponent]
    });
    fixture = TestBed.createComponent(CadastroEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
