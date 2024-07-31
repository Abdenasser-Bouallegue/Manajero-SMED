import { TestBed } from '@angular/core/testing';

import { SmedService } from './smed.service';

describe('SmedService', () => {
  let service: SmedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
