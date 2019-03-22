import { TestBed } from '@angular/core/testing';

import { CursorManagerRoomMessageService } from './cursor-manager-room-message.service';

describe('CursorManagerRoomMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursorManagerRoomMessageService = TestBed.get(CursorManagerRoomMessageService);
    expect(service).toBeTruthy();
  });
});
