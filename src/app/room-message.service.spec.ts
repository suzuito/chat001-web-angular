import { TestBed } from '@angular/core/testing';

import { RoomMessageService } from './room-message.service';

describe('RoomMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomMessageService = TestBed.get(RoomMessageService);
    expect(service).toBeTruthy();
  });
});
