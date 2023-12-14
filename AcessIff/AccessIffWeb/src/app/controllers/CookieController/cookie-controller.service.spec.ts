import { TestBed } from '@angular/core/testing';

import { CookieControllerService } from './cookie-controller.service';

describe('CookieControllerService', () => {
  let service: CookieControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
