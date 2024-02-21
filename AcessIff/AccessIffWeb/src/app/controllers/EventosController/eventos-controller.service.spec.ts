import { TestBed } from '@angular/core/testing';

import { EventosControllerService } from './eventos-controller.service';

describe('EventosControllerService', () => {
  let service: EventosControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventosControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
