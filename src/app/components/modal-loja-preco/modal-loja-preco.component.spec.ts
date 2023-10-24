import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLojaPrecoComponent } from './modal-loja-preco.component';

describe('ModalLojaPrecoComponent', () => {
  let component: ModalLojaPrecoComponent;
  let fixture: ComponentFixture<ModalLojaPrecoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalLojaPrecoComponent]
    });
    fixture = TestBed.createComponent(ModalLojaPrecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
