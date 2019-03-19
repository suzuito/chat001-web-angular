import { Injectable } from '@angular/core';
import { DataStore, DataStores, DataWrapper } from './data.store';
import { Room, AgentInRoom } from './model/room';
import { Agent, EasyAgent, TemporaryAgent } from './model/agent';
import { OrderId as RoomOrderId, RoomsSearchOption } from './rooms/rooms-search-option/rooms-search-option.service';
import { OrderId as AgentOrderId, AgentsSearchOption } from './agents/agents-search-option.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms: DataStore<Room>;
  private agentsInRoom: DataStores<AgentInRoom>;
  private temporaryAgents: DataStore<TemporaryAgent>;

  constructor() {
    this.rooms = new DataStore<Room>();
    this.temporaryAgents = new DataStore<TemporaryAgent>();
    this.agentsInRoom = new DataStores<AgentInRoom>();
  }

  public hasRoom(roomId: string): boolean {
    return this.rooms.has(roomId);
  }

  public getRoomRaw(roomId: string): Room {
    if (!this.hasRoom(roomId)) {
      return null;
    }
    return this.rooms.get(roomId).data;
  }

  public getAgentInRoom(roomId: string, externalId: string): AgentInRoom {
    if (!this.agentsInRoom.has(roomId, externalId)) {
      return null;
    }
    return this.agentsInRoom.get(roomId, externalId).data;
  }

  public getAgentsInRoom(roomId: string): AgentInRoom[] {
    return this.agentsInRoom.getParent(roomId).map((v: DataWrapper<AgentInRoom>) => v.data);
  }

  public setAgentInRoom(roomId: string, agent: AgentInRoom): void {
    this.agentsInRoom.set(roomId, agent.externalId, agent);
  }

  public setRoom(...rooms: Room[]): void {
    rooms.forEach((r: Room) => this.rooms.set(r.id, r));
  }

  public setTemporaryAgent(...agents: TemporaryAgent[]): void {
    agents.forEach((a: TemporaryAgent) => this.temporaryAgents.set(a.id, a));
  }

  public filterTemporaryAgent(opt: AgentsSearchOption): EasyAgent[] {
    return this.temporaryAgents.findRaw((agent: DataWrapper<Agent>) => {
      if (opt.txtWord) {
        if (new RegExp(opt.txtWord).test(agent.data.name) === false) {
          return false;
        }
      }
      return true;
    }).sort((a: Agent, b: Agent): number => {
      switch (opt.selectedOrderId) {
        case AgentOrderId.Updated:
          return b.updatedAt - a.updatedAt;
      }
      return b.updatedAt - a.updatedAt;
    });
  }

  public filterRoom(opt: RoomsSearchOption, includePrivate: boolean): Room[] {
    return this.rooms.findRaw((room: DataWrapper<Room>): boolean => {
      if (!includePrivate) {
        if (!room.data.public) {
          return false;
        }
      }
      if (opt.txtWord) {
        if (new RegExp(opt.txtWord).test(room.data.name) === false) {
          return false;
        }
      }
      if (opt.chkCanEnter) {
        if (room.data.agents >= room.data.maxAgents) {
          return false;
        }
      }
      if (opt.chkUnlocked) {
        if (room.data.password) {
          return false;
        }
      }
      if (opt.chkMembers) {
        if (room.data.agents < opt.members) {
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
