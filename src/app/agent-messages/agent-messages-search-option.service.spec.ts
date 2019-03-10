import { TestBed } from '@angular/core/testing';

import { AgentMessagesSearchOptionService } from './agent-messages-search-option.service';

describe('AgentMessagesSearchOptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentMessagesSearchOptionService = TestBed.get(AgentMessagesSearchOptionService);
    expect(service).toBeTruthy();
  });
});
