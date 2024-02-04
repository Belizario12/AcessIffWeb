import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissaoAlertasComponent } from './emissao-alertas.component';

describe('EmissaoAlertasComponent', () => {
  let component: EmissaoAlertasComponent;
  let fixture: ComponentFixture<EmissaoAlertasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmissaoAlertasComponent]
    });
    fixture = TestBed.createComponent(EmissaoAlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
