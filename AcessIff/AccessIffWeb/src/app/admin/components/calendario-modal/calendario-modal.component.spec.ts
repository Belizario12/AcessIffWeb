import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioModalComponent } from './calendario-modal.component';

describe('CalendarioModalComponent', () => {
  let component: CalendarioModalComponent;
  let fixture: ComponentFixture<CalendarioModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarioModalComponent]
    });
    fixture = TestBed.createComponent(CalendarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});