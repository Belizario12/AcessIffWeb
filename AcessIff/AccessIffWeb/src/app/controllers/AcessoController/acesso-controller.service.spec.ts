import { TestBed } from '@angular/core/testing';

import { AcessoControllerService } from './acesso-controller.service';

describe('AcessoControllerService', () => {
  let service: AcessoControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcessoControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
