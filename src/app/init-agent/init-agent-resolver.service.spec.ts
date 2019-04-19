import { TestBed } from '@angular/core/testing';

import { InitAgentResolverService } from './init-agent-resolver.service';

describe('InitAgentResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitAgentResolverService = TestBed.get(InitAgentResolverService);
    expect(service).toBeTruthy();
  });
});
