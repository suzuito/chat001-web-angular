import { TestBed } from '@angular/core/testing';

import { RoomsSearchOptionService } from './rooms-search-option.service';

describe('RoomsSearchOptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomsSearchOptionService = TestBed.get(RoomsSearchOptionService);
    expect(service).toBeTruthy();
  });
});
