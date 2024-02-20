import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHorarioModalComponent } from './add-horario-modal.component';

describe('AddHorarioModalComponent', () => {
  let component: AddHorarioModalComponent;
  let fixture: ComponentFixture<AddHorarioModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddHorarioModalComponent]
    });
    fixture = TestBed.createComponent(AddHorarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
