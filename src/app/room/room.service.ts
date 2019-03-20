import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Room, AgentInRoom } from '../model/room';
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

  private cursors: Map<string, string>;

  constructor(
    private dataService: DataService,
    private agentService: AgentService,
    private roomMessageService: RoomMessageService,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private errService: ErrorService,
    private router: Router,
  ) {
    this.roomId = null;
    this.roomNameMaxLength = 16;
    this.roomDescriptionMaxLength = 200;
    this.cursors = new Map<string, string>();
  }

  public get room(): Room {
    if (!this.roomId) {
      return null;
    }
    return this.dataService.getRoomRaw(this.roomId);
  }

  public getAgents(): AgentInRoom[] {
    if (!this.roomId) {
      return [];
    }
    return this.dataService.getAgentsInRoom(this.roomId);
  }

  public async routeToRoom(roomId: string): Promise<void> {
    if (!this.agentService.isInRoom(roomId)) {
      return this.apiService.getAgentRoomByID(
        this.localStorageService.get(LocalStorageKey.A),
        roomId,
      ).then((r: RoomAgentIn) => {
        this.roomId = r.room.id;
        return;
      }).catch((err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.router.navigate(['room-entrance', roomId]);
        } else {
          this.errService.errp5XX();
        }
        return;
      });
    }
    this.roomId = roomId;
  }

  public async putRoomsMessages(message: string): Promise<void> {
    this.apiService.putRoomsMessages(
      this.localStorageService.get(LocalStorageKey.A),
      this.roomId,
      message,
    ).then((msg: RoomMessage) => {
      this.roomMessageService.pushMessage(msg.roomId, msg.message);
      if (this.dataService.getAgentInRoom(msg.roomId, msg.message.agentExternalId)) {
        return;
      }
      this.apiService.getRoomMember(
        this.localStorageService.get(LocalStorageKey.A),
        msg.roomId, msg.message.agentExternalId,
      ).then((agentInRoom: AgentInRoom) => {
        this.dataService.setAgentInRoom(msg.roomId, agentInRoom);
        return;
      });
    });
  }

  private getCursor(roomId: string): string {
    if (!this.cursors.has(roomId)) {
      this.cursors.set(roomId, '');
    }
    return this.cursors.get(roomId);
  }

  private setCursor(roomId: string, cursor: string): void {
    this.cursors.set(roomId, cursor);
  }

  public async initializeRoomsMessages(): Promise<void> {
    if (!this.cursors.has(this.roomId)) {
      this.getRoomsMessages();
    }
  }

  public async getRoomsMessages(): Promise<void> {
    this.apiService.getRoomMessages(
      this.localStorageService.get(LocalStorageKey.A),
      this.roomId,
      this.getCursor(this.roomId),
      30,
    ).then((messages: Messages) => {
      this.getUnknownAgentProfile(messages.messages);
      this.roomMessageService.pushMessage(this.roomId, ...messages.messages);
      this.setCursor(this.roomId, messages.nextCursor);
    });
  }

  public async getUnknownAgentProfile(messages: Message[]) {
    messages.forEach((message: Message) => {
      if (this.dataService.hasAgentInRoom(this.roomId, message.agentExternalId)) {
        return;
      }
      this.apiService.getRoomMember(
        this.localStorageService.get(LocalStorageKey.A),
        this.roomId, message.agentExternalId,
      ).then((v: AgentInRoom) => {
        this.dataService.setAgentInRoom(this.roomId, v);
      });
    });
  }

}
