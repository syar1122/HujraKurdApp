import { TestBed } from '@angular/core/testing';

import { YTService } from './yt.service';

describe('YTService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YTService = TestBed.get(YTService);
    expect(service).toBeTruthy();
  });
});
