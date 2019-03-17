import { TestBed } from '@angular/core/testing';

import { RoomCandeactivateService } from './room-candeactivate.service';

describe('RoomCandeactivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomCandeactivateService = TestBed.get(RoomCandeactivateService);
    expect(service).toBeTruthy();
  });
});
