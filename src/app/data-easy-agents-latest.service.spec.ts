import { TestBed } from '@angular/core/testing';

import { DataEasyAgentsLatestService } from './data-easy-agents-latest.service';

describe('DataEasyAgentsLatestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataEasyAgentsLatestService = TestBed.get(DataEasyAgentsLatestService);
    expect(service).toBeTruthy();
  });
});
