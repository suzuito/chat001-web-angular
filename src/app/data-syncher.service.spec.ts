import { TestBed } from '@angular/core/testing';

import { DataSyncherService } from './data-syncher.service';

describe('DataSyncherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataSyncherService = TestBed.get(DataSyncherService);
    expect(service).toBeTruthy();
  });
});
