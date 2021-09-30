import { TestBed } from '@angular/core/testing';

import { MessageDataService } from './message-data.service';

describe('MessageDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageDataService = TestBed.get(MessageDataService);
    expect(service).toBeTruthy();
  });
});
