import { TestBed } from '@angular/core/testing';

import { CursorManagerRoomMemberService } from './cursor-manager-room-member.service';

describe('CursorManagerRoomMemberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursorManagerRoomMemberService = TestBed.get(CursorManagerRoomMemberService);
    expect(service).toBeTruthy();
  });
});
