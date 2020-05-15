import { TestBed } from '@angular/core/testing';

import { ClearAllService } from './clear-all.service';

describe('ClearAllService', () => {
  let service: ClearAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClearAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
