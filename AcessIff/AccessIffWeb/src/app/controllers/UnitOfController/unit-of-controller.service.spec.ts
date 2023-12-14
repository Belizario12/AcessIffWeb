import { TestBed } from '@angular/core/testing';

import { UnitOfControllerService } from './unit-of-controller.service';

describe('UnitOfControllerService', () => {
  let service: UnitOfControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitOfControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
