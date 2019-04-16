import { TestBed } from '@angular/core/testing';

import { InitRoomResolverService } from './init-room-resolver.service';

describe('InitRoomResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitRoomResolverService = TestBed.get(InitRoomResolverService);
    expect(service).toBeTruthy();
  });
});
