import { TestBed } from '@angular/core/testing';

import { SveMetodeService } from './sve-metode.service';

describe('SveMetodeService', () => {
  let service: SveMetodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SveMetodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
