import { TestBed } from '@angular/core/testing';

import { RoomEntranceResolverService } from './room-entrance-resolver.service';

describe('RoomEntranceResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomEntranceResolverService = TestBed.get(RoomEntranceResolverService);
    expect(service).toBeTruthy();
  });
});
