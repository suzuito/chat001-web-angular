import { TestBed } from '@angular/core/testing';

import { RoomInputterService } from './room-inputter.service';

describe('RoomInputterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomInputterService = TestBed.get(RoomInputterService);
    expect(service).toBeTruthy();
  });
});
