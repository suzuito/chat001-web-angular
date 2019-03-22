import { Injectable } from '@angular/core';
import { AgentInRoomOnlyID } from './model/room';
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

}
