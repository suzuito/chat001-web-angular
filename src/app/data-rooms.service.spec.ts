import { TestBed } from '@angular/core/testing';

import { DataRoomsService } from './data-rooms.service';

describe('DataRoomsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataRoomsService = TestBed.get(DataRoomsService);
    expect(service).toBeTruthy();
  });
});
