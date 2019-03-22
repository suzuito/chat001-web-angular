import { TestBed } from '@angular/core/testing';

import { CursorManagerRoomsService } from './cursor-manager-rooms.service';

describe('CursorManagerRoomsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursorManagerRoomsService = TestBed.get(CursorManagerRoomsService);
    expect(service).toBeTruthy();
  });
});
