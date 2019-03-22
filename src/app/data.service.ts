import { Injectable } from '@angular/core';
import { DataStore, DataStores } from './data.store';
import { Room, AgentInRoom, AgentInRoomProperties, AgentInRoomOnlyID, newAgentInRoomOnlyID, newAgentInRoom } from './model/room';
import { Agent, EasyAgent } from './model/agent';
import { OrderId as RoomOrderId, RoomsSearchOption } from './rooms/rooms-search-option/rooms-search-option.service';
import { OrderId as AgentOrderId, AgentsSearchOption } from './agents/agents-search-option.service';

/*
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms: DataStore<Room>;
  private agentsInRoom: DataStores<AgentInRoomOnlyID>;
  private agents: DataStore<EasyAgent>;

  constructor() {
    this.rooms = new DataStore<Room>();
    this.agents = new DataStore<EasyAgent>();
    this.agentsInRoom = new DataStores<AgentInRoomOnlyID>();
  }

  public setRoom(...rooms: Room[]): void {
    rooms.forEach((r: Room) => this.rooms.set(r.id, r));
  }

  public hasRoom(roomId: string): boolean {
    return this.rooms.has(roomId);
  }

  public getRoom(roomId: string): Room {
    return this.rooms.get(roomId);
  }

  public setAgentInRoom(roomId: string, agent: AgentInRoom): void {
    this.setAgent(agent.agent);
    this.agentsInRoom.set(roomId, agent.agent.externalId, newAgentInRoomOnlyID(agent));
  }


  public hasAgentInRoom(roomId: string, externalId: string): boolean {
    return this.agentsInRoom.has(roomId, externalId);
  }

  public getAgentInRoom(roomId: string, externalId: string): AgentInRoom {
    return newAgentInRoom(
      this.agentsInRoom.get(roomId, externalId),
      this.getAgent(externalId),
    );
  }

  public getAgentsInRoom(roomId: string): AgentInRoom[] {
    return this.agentsInRoom.getParent(roomId).
      map((v: AgentInRoomOnlyID) => {
        return newAgentInRoom(v, this.getAgent(v.externalID));
      });
  }

  public setAgent(...agents: EasyAgent[]): void {
    agents.forEach((a: EasyAgent) => this.agents.set(a.externalId, a));
  }

  public hasAgent(externalId: string): boolean {
    return this.agents.has(externalId);
  }

  public getAgent(externalId: string): EasyAgent {
    return this.agents.get(externalId);
  }

  public filterAgent(opt: AgentsSearchOption): EasyAgent[] {
    return this.agents.find((agent: EasyAgent) => {
      if (opt.txtWord) {
        if (new RegExp(opt.txtWord).test(agent.name) === false) {
          return false;
        }
      }
      return true;
    }).sort((a: EasyAgent, b: EasyAgent): number => {
      switch (opt.selectedOrderId) {
        case AgentOrderId.Updated:
          return b.updatedAt - a.updatedAt;
      }
      return b.updatedAt - a.updatedAt;
    });
  }

  public filterRoom(opt: RoomsSearchOption, includePrivate: boolean): Room[] {
    return this.rooms.find((room: Room): boolean => {
      if (!includePrivate) {
        if (!room.public) {
          return false;
        }
      }
      if (opt.txtWord) {
        if (new RegExp(opt.txtWord).test(room.name) === false) {
          return false;
        }
      }
      if (opt.chkCanEnter) {
        if (room.agents >= room.maxAgents) {
          return false;
        }
      }
      if (opt.chkUnlocked) {
        if (room.password) {
          return false;
        }
      }
      if (opt.chkMembers) {
        if (room.agents < opt.members) {
          return false;
        }
      }
      return true;
    }).sort((a: Room, b: Room): number => {
      switch (opt.selectedOrderId) {
        case RoomOrderId.Newed:
          return b.createdAt - a.createdAt;
        // case RoomOrderId.Entrant:
        //   return b.agents - a.agents;
        // case RoomOrderId.Popular:
        //   return b.agents - a.agents;
      }
      return b.createdAt - a.createdAt;
    });
  }
}

*/
