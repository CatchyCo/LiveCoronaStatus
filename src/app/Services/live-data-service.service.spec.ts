import { TestBed } from '@angular/core/testing';

import { LiveDataServiceService } from './live-data-service.service';

describe('LiveDataServiceService', () => {
  let service: LiveDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
