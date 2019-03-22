import { TestBed } from '@angular/core/testing';

import { DataAgentsInRoomService } from './data-agents-in-room.service';

describe('DataAgentsInRoomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataAgentsInRoomService = TestBed.get(DataAgentsInRoomService);
    expect(service).toBeTruthy();
  });
});
