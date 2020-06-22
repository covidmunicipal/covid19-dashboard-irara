import { TestBed } from '@angular/core/testing';

import { RtdbDataService } from './rtdb-data.service';

describe('RtdbDataService', () => {
  let service: RtdbDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtdbDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
