import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Room, AgentInRoom } from '../model/room';

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

}
