import { TestBed } from '@angular/core/testing';

import { AlertaControllerService } from './alerta-controller.service';

describe('AlertaControllerService', () => {
  let service: AlertaControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertaControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
