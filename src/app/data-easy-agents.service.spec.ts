import { TestBed } from '@angular/core/testing';

import { DataEasyAgentsService } from './data-easy-agents.service';

describe('DataEasyAgentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataEasyAgentsService = TestBed.get(DataEasyAgentsService);
    expect(service).toBeTruthy();
  });
});
