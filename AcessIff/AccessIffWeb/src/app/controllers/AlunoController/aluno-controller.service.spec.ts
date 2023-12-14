import { TestBed } from '@angular/core/testing';

import { AlunoControllerService } from './aluno-controller.service';

describe('AlunoControllerService', () => {
  let service: AlunoControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlunoControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
