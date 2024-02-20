import { TestBed } from '@angular/core/testing';

import { TurmaControllerService } from './turma-controller.service';

describe('TurmaControllerService', () => {
  let service: TurmaControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurmaControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
