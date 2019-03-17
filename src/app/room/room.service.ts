import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Room, AgentInRoom } from '../model/room';
import { EventEmitter } from 'events';

export enum RoomServiceEventType {
  RouteInfo = 'routeInfo',
  RouteMessage = 'routeMessage',
  RouteMember = 'routeMember',
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  public roomId: string;
  public roomNameMaxLength: number;
  public roomDescriptionMaxLength: number;

  constructor(
    private dataService: DataService,
  ) {
    this.roomId = null;
    this.roomNameMaxLength = 16;
    this.roomDescriptionMaxLength = 200;
  }

  public get room(): Room {
    if (!this.roomId) {
      return null;
    }
    return this.dataService.getRoomRaw(this.roomId);
  }

  public getAgents(): AgentInRoom[] {
    return this.dataService.getAgentsInRoom(this.roomId);
  }

  public getAgent(roomId: string, externalId: string): AgentInRoom {
    return this.dataService.getAgentInRoom(roomId, externalId);
  }

}
