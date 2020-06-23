import { TestBed } from '@angular/core/testing';

import { BrasilIoDataService } from './brasilio-data.service';

describe('BrasilIoDataService', () => {
  let service: BrasilIoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrasilIoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
