import { TestBed } from '@angular/core/testing';

import { RoomMemberSearchOptionService } from './room-member-search-option.service';

describe('RoomMemberSearchOptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomMemberSearchOptionService = TestBed.get(RoomMemberSearchOptionService);
    expect(service).toBeTruthy();
  });
});
