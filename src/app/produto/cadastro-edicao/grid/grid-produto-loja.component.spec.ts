import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridLojaComponent } from './grid-produto-loja.component';


describe('GridComponent', () => {
  let component: GridLojaComponent;
  let fixture: ComponentFixture<GridLojaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridLojaComponent]
    });
    fixture = TestBed.createComponent(GridLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
