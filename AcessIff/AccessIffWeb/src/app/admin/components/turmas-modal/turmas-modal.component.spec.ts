import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmasModalComponent } from './turmas-modal.component';

describe('TurmasModalComponent', () => {
  let component: TurmasModalComponent;
  let fixture: ComponentFixture<TurmasModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurmasModalComponent]
    });
    fixture = TestBed.createComponent(TurmasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
