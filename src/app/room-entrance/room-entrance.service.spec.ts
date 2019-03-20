import { TestBed } from '@angular/core/testing';

import { RoomEntranceService } from './room-entrance.service';

describe('RoomEntranceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomEntranceService = TestBed.get(RoomEntranceService);
    expect(service).toBeTruthy();
  });
});
