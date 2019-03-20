import { TestBed } from '@angular/core/testing';

import { AgentsSearchOptionService } from './agents-search-option.service';

describe('AgentsSearchOptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentsSearchOptionService = TestBed.get(AgentsSearchOptionService);
    expect(service).toBeTruthy();
  });
});
