import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlertasComponent } from './lista-alertas.component';

describe('ListaAlertasComponent', () => {
  let component: ListaAlertasComponent;
  let fixture: ComponentFixture<ListaAlertasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaAlertasComponent]
    });
    fixture = TestBed.createComponent(ListaAlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
