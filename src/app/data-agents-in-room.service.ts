import { Injectable } from '@angular/core';
import { AgentInRoomOnlyID, AgentRoleInRoom } from './model/room';
import { DataStores } from './data.store';

@Injectable({
  providedIn: 'root'
})
export class DataAgentsInRoomService extends DataStores<AgentInRoomOnlyID> {

  constructor() {
    super();
  }

  public setAgentInRoom(roomId: string, ...agents: AgentInRoomOnlyID[]): void {
    agents.forEach((v) => this.set(roomId, v.externalID, v));
  }

  public updateRole(roomId: string, externalId: string, role: AgentRoleInRoom): void {
    if (!this.has(roomId, externalId)) {
      return;
    }
    const agent = this.get(roomId, externalId);
    agent.role = role;
    this.setAgentInRoom(roomId, agent);
  }

}
