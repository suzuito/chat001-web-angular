import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AgentService } from './agent.service';
import { LocalStorageService, LocalStorageKey } from './local-storage.service';
import { Init } from './model/other';
import { HttpErrorResponse } from '@angular/common/http';
import { RoomAgentIn, EasyAgent, Agent } from './model/agent';
import { Rooms, Room, EnterRoom, ExitRoom, CreateRoom, newAgentInRoomOnlyID } from './model/room';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogPasswordInputterComponent } from './parts/dialog-password-inputter/dialog-password-inputter.component';
import { WsService } from './ws.service';
import { WSMessage } from './model/ws';
import { RoomMessage } from './model/room_message';
import { RoomMessageService } from './room-message.service';
import { DataRoomsService } from './data-rooms.service';
import { DataEasyAgentsService } from './data-easy-agents.service';
import { DataAgentsInRoomService } from './data-agents-in-room.service';

export const errCannotEnterRoomError = new Error('');

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private apiService: ApiService,
    private agentService: AgentService,
    private localStorageService: LocalStorageService,
    private roomMessageService: RoomMessageService,
    private router: Router,
    private dialog: MatDialog,
    private wsService: WsService,
    private dataRoomsService: DataRoomsService,
    private dataEasyAgentsService: DataEasyAgentsService,
    private dataAgentsInRoomService: DataAgentsInRoomService,
  ) {
    this.wsService.addRoute('/room/message', (msg: WSMessage) => {
      const rmsg = msg.data as RoomMessage;
      this.roomMessageService.pushMessage(rmsg.roomId, rmsg.message);
    });
  }

  public async initialize(): Promise<void> {
    return this.apiService.getInit(this.localStorageService.get(LocalStorageKey.A)).then((v: Init) => {
      this.agentService.set(v.agent);
      this.localStorageService.set(LocalStorageKey.A, v.agent.id);
      v.roomsAgentIn.rooms.forEach((roomAgentIn: RoomAgentIn) => {
        this.dataRoomsService.setRoom(roomAgentIn.room);
        this.agentService.setRoom(roomAgentIn);
        this.dataEasyAgentsService.set(v.agent.id, v.agent);
      });
      // this.wsService.initialize(v.agent.id);
    });
  }

  public async fetchRooms(nextCursor: string, limits: number, order: string): Promise<Rooms> {
    return this.apiService.getRooms(
      this.localStorageService.get(LocalStorageKey.A),
      nextCursor,
      limits,
      order,
    ).then((rooms: Rooms) => {
      this.dataRoomsService.setRoom(...rooms.rooms);
      return rooms;
    });
  }

  public async fetchRoom(roomId: string): Promise<Room> {
    return this.apiService.getRoomByID(
      this.localStorageService.get(LocalStorageKey.A),
      roomId,
    ).then((room: Room) => {
      this.dataRoomsService.setRoom(room);
      return room;
    });
  }

  public async fetchRoomAgentIn(roomId: string): Promise<RoomAgentIn> {
    return this.apiService.getAgentRoomByID(
      this.localStorageService.get(LocalStorageKey.A),
      roomId,
    ).then((roomAgentIn: RoomAgentIn) => {
      this.agentService.setRoom(roomAgentIn);
      return roomAgentIn;
    });
  }

  public async enterRoom(room: Room): Promise<void> {
    if (this.agentService.isInRoom(room.id)) {
      this.router.navigate(['room', room.id]);
      return;
    }
    let password = '';
    if (room.password) {
      const ref = this.dialog.open(DialogPasswordInputterComponent);
      password = await ref.afterClosed().toPromise();
      if (!password) {
        return;
      }
    }
    return this.apiService.putEnterRoom(
      this.localStorageService.get(LocalStorageKey.A),
      room.id,
      password,
    ).then((enterRoom: EnterRoom) => {
      this.agentService.setRoom(enterRoom.roomAgentIn);
      this.router.navigate(['room', room.id]);
      return;
    }).catch(err => {
      // TODO: Notice error message
    });
  }

  public async exitRoom(roomId: string): Promise<void> {
    this.apiService.putExitRoom(
      this.localStorageService.get(LocalStorageKey.A),
      roomId,
    ).then((exitRoom: ExitRoom) => {
      this.agentService.deleteRoom(roomId);
      const roomsAgentIn = this.agentService.filterRoom();
      if (roomsAgentIn.length > 0) {
        this.router.navigate(['room', roomsAgentIn[0].roomId]);
        return;
      }
      this.router.navigate(['']);
    }).catch(err => {
      // TODO: Notice error message
    });
  }

  public async updateAgentProperties(name: string, description: string): Promise<void> {
    this.apiService.putAgents(
      this.localStorageService.get(LocalStorageKey.A),
      name, description,
    ).then((updated: Agent) => {
      this.agentService.set(updated);
      this.dataEasyAgentsService.setAgent(updated);
    });
  }

  public async createRoom(name: string, description: string, maxAgents: number, isPublic: boolean, passwordRaw: string): Promise<void> {
    return this.apiService.postRooms(
      this.localStorageService.get(LocalStorageKey.A),
      name, description, maxAgents, isPublic, passwordRaw,
    ).then((cr: CreateRoom) => {
      this.dataRoomsService.setRoom(cr.room);
      this.dataAgentsInRoomService.setAgentInRoom(cr.room.id, newAgentInRoomOnlyID(cr.agentInRoom));
      this.agentService.setRoom(cr.roomAgentIn);
      this.router.navigate(['room', cr.room.id]);
      return;
    });
  }


  public async getUnknownAgentProfile(...inExtIDs: string[]) {
    const extIDs: string[] = [];
    inExtIDs.forEach((id: string) => {
      if (extIDs.find((v: string) => v === id)) {
        return;
      }
      extIDs.push(id);
    });
    extIDs.forEach((extID: string) => {
      if (this.dataEasyAgentsService.has(extID)) {
        return;
      }
      this.apiService.getEasyAgent(
        this.localStorageService.get(LocalStorageKey.A),
        extID,
      ).then((v: EasyAgent) => {
        this.dataEasyAgentsService.setAgent(v);
      });
    });
  }

}
