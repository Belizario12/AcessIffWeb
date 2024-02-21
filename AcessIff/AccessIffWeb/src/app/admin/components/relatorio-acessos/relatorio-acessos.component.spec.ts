import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioAcessosComponent } from './relatorio-acessos.component';

describe('RelatorioAcessosComponent', () => {
  let component: RelatorioAcessosComponent;
  let fixture: ComponentFixture<RelatorioAcessosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelatorioAcessosComponent]
    });
    fixture = TestBed.createComponent(RelatorioAcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
