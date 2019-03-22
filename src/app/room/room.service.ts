import { Injectable } from '@angular/core';
import { Room, AgentInRoom, newAgentInRoom } from '../model/room';
import { EventEmitter } from 'events';
import { AgentService } from '../agent.service';
import { ApiService } from '../api.service';
import { LocalStorageService, LocalStorageKey } from '../local-storage.service';
import { RoomAgentIn } from '../model/agent';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorService } from '../error.service';
import { RoomMessage, Messages, Message } from '../model/room_message';
import { RoomMessageService } from '../room-message.service';
import { AppService } from '../app.service';
import { DataRoomsService } from '../data-rooms.service';
import { DataAgentsInRoomService } from '../data-agents-in-room.service';
import { DataEasyAgentsService } from '../data-easy-agents.service';

export enum CurrentRoomRoute {
  Info = 'info',
  Message = 'message',
  Member = 'member',
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  public roomId: string;
  public roomNameMaxLength: number;
  public roomDescriptionMaxLength: number;
  public currentRoomRoute: CurrentRoomRoute;

  constructor(
    private dataRoomsService: DataRoomsService,
    private dataAgentsInRoomService: DataAgentsInRoomService,
    private dataEasyAgentsService: DataEasyAgentsService,
    private agentService: AgentService,
    private appService: AppService,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
    this.roomId = null;
    this.roomNameMaxLength = 16;
    this.roomDescriptionMaxLength = 200;
    this.currentRoomRoute = CurrentRoomRoute.Info;
  }

  public get room(): Room {
    if (!this.roomId) {
      return null;
    }
    return this.dataRoomsService.get(this.roomId);
  }

  public getAgents(): AgentInRoom[] {
    if (!this.roomId) {
      return [];
    }
    const ret = this.dataAgentsInRoomService.getParent(this.roomId);
    const ret2 = ret.map(v => {
      return newAgentInRoom(v, this.dataEasyAgentsService.get(v.externalID));
    }).filter(v => {
      return v.agent.externalId !== this.agentService.get().externalId;
    });
    return ret2;
  }

  public async routeToRoom(roomId: string): Promise<void> {
    if (!this.agentService.isInRoom(roomId)) {
      this.router.navigate(['room-entrance', roomId]);
      return;
    }
    this.roomId = roomId;
    if (this.dataRoomsService.has(this.roomId)) {
      return;
    }
    return this.appService.fetchRoom(this.roomId).then(() => { return; });
  }

  public async putRoomsMessages(message: string): Promise<void> {
    return this.apiService.putRoomsMessages(
      this.localStorageService.get(LocalStorageKey.A),
      this.roomId,
      message,
    ).then((msg: RoomMessage) => {
      return;
    });
  }

  public async intr(agents: AgentInRoom[], room: Room): Promise<void> {
    return this.apiService.postRoomByIDIntroduction(
      this.localStorageService.get(LocalStorageKey.A),
      room.id,
      agents.map(v => v.agent.externalId),
    );
  }

}
