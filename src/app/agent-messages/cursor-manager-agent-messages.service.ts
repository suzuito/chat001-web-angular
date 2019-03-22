import { Injectable } from '@angular/core';
import { CursorManager } from '../cursor-manager';
import { ApiService } from '../api.service';
import { LocalStorageService, LocalStorageKey } from '../local-storage.service';
import { DataRoomsService } from '../data-rooms.service';
import { AgentService } from '../agent.service';
import { AgentMessages } from '../model/agent_message';

export const defaultId = 'dummy';

@Injectable({
  providedIn: 'root'
})
export class CursorManagerAgentMessagesService extends CursorManager {

  constructor(
    private agentService: AgentService,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
  ) {
    super();
  }

  public async fetch(id: string = defaultId): Promise<void> {
    return this.apiService.getAgentsMessages(
      this.localStorageService.get(LocalStorageKey.A),
      this.get(defaultId), 30,
    ).then((messages: AgentMessages) => {
      this.agentService.setMessage(...messages.messages);
      this.set(defaultId, messages.nextCursor);
      return;
    });
  }
}
