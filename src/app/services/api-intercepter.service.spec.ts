import { TestBed } from '@angular/core/testing';

import { ApiIntercepterService } from './api-intercepter.service';

describe('ApiIntercepterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiIntercepterService = TestBed.get(ApiIntercepterService);
    expect(service).toBeTruthy();
  });
});
