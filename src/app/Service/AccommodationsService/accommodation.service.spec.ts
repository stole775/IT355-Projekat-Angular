import { TestBed } from '@angular/core/testing';

import { AccommodationsService } from './accommodation.service';

describe('AccommodationService', () => {
  let service: AccommodationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccommodationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
