import { TestBed } from '@angular/core/testing';

import { CursorManagerAgentMessagesService } from './cursor-manager-agent-messages.service';

describe('CursorManagerAgentMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursorManagerAgentMessagesService = TestBed.get(CursorManagerAgentMessagesService);
    expect(service).toBeTruthy();
  });
});
