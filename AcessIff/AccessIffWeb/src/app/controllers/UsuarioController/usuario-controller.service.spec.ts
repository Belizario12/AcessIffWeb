import { TestBed } from '@angular/core/testing';

import { UsuarioControllerService } from './usuario-controller.service';

describe('UsuarioControllerService', () => {
  let service: UsuarioControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
