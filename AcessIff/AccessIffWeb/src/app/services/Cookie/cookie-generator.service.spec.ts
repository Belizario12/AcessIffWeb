import { TestBed } from '@angular/core/testing';

import { CookieGeneratorService } from './cookie-generator.service';

describe('CookieGeneratorService', () => {
  let service: CookieGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
