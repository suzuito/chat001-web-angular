import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AgentService } from './agent.service';
import { LocalStorageService, LocalStorageKey } from './local-storage.service';
import { Init } from './model/other';
import { RoomAgentIn, EasyAgent, Agent } from './model/agent';
import { Rooms, Room, EnterRoom, ExitRoom, CreateRoom, newAgentInRoomOnlyID, AgentInRoom } from './model/room';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogPasswordInputterComponent } from './parts/dialog-password-inputter/dialog-password-inputter.component';
import { WsService } from './ws.service';
import { WSMessage } from './model/ws';
import { RoomMessage, MessageType } from './model/room_message';
import { RoomMessageService } from './room-message.service';
import { DataRoomsService } from './data-rooms.service';
import { DataEasyAgentsService } from './data-easy-agents.service';
import { DataAgentsInRoomService } from './data-agents-in-room.service';
import { Request } from './model/request';
import { AgentMessage, WSAgentMessage } from './model/agent_message';
import { RoomService } from './room/room.service';
import { DataEasyAgentsLatestService } from './data-easy-agents-latest.service';

export const errCannotEnterRoomError = new Error('');

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private soundReciveAgentMessage: any;

  constructor(
    private apiService: ApiService,
    private agentService: AgentService,
    private localStorageService: LocalStorageService,
    private roomMessageService: RoomMessageService,
    private roomService: RoomService,
    private router: Router,
    private dialog: MatDialog,
    private wsService: WsService,
    private dataRoomsService: DataRoomsService,
    private dataEasyAgentsService: DataEasyAgentsService,
    private dataAgentsInRoomService: DataAgentsInRoomService,
    private dataEasyAgentsLatestService: DataEasyAgentsLatestService,
  ) {
    this.soundReciveAgentMessage = new Audio('assets/se_maoudamashii_onepoint28.wav');
    this.wsService.addRoute('/room/message', (msg: WSMessage) => {
      const rmsg = msg.data as RoomMessage;
      switch (rmsg.message.type) {
        case MessageType.Message:
          this.roomMessageService.pushMessage(rmsg.roomId, rmsg.message);
          break;
        case MessageType.EnterRoom:
          this.roomMessageService.pushMessage(rmsg.roomId, rmsg.message);
          const agentInRoom = rmsg.message.extra.agentInRoom as AgentInRoom;
          this.dataAgentsInRoomService.set(rmsg.roomId, rmsg.message.agentExternalId, newAgentInRoomOnlyID(agentInRoom));
          break;
        case MessageType.ExitRoom:
          this.roomMessageService.pushMessage(rmsg.roomId, rmsg.message);
          this.dataAgentsInRoomService.delete(rmsg.roomId, rmsg.message.agentExternalId);
          break;
      }
      if (rmsg.roomId !== this.roomService.roomId) {
        this.roomMessageService.incrementUnread(rmsg.roomId, 1);
      }
    });
    this.wsService.addRoute('/agent/message', (msg: WSMessage) => {
      const rmsg = msg.data as WSAgentMessage;
      this.agentService.unreadMessages = rmsg.unreadMessages;
      if (rmsg.message) {
        this.agentService.setMessage(rmsg.message);
        this.soundReciveAgentMessage.play();
      }
    });
    this.wsService.addRoute('/agent/access', (msg: WSMessage) => {
      const rmsg = msg.data as EasyAgent;
      this.dataEasyAgentsService.setAgent(rmsg);
    });
    this.wsService.addRoute('/broadcast/latest-agents', (msg: WSMessage) => {
      const rmsg = msg.data as EasyAgent[];
      this.dataEasyAgentsLatestService.clear();
      this.dataEasyAgentsLatestService.setAgent(...rmsg);
    });
    this.wsService.addRoute('/broadcast/new-rooms', (msg: WSMessage) => {
      const rmsg = msg.data as Room[];
      this.dataRoomsService.setRoom(...rmsg);
    });
  }

  public async initialize(): Promise<void> {
    return this.apiService.getInit(this.localStorageService.get(LocalStorageKey.A)).then((v: Init) => {
      this.agentService.set(v.agent);
      this.localStorageService.set(LocalStorageKey.A, v.agent.id);
      this.agentService.unreadMessages = v.unreadMessages;
      v.roomsAgentIn.rooms.forEach((roomAgentIn: RoomAgentIn) => {
        this.dataRoomsService.setRoom(roomAgentIn.room);
        this.agentService.setRoom(roomAgentIn);
        this.dataEasyAgentsService.set(v.agent.externalId, v.agent);
      });
      this.dataEasyAgentsService.setAgent(...v.agents);
      this.wsService.initialize(v.agent.id);
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

  public async updateAgentProperties(name: string, description: string, isPublic: boolean): Promise<void> {
    this.apiService.putAgents(
      this.localStorageService.get(LocalStorageKey.A),
      name, description, isPublic,
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

  public async updateProfileAvatar(f: File): Promise<void> {
    return this.apiService.putAgentsAvatar(
      this.localStorageService.get(LocalStorageKey.A),
      f,
    ).then(() => {
      return;
    });
  }

  public async postRequests(externalId: string, body: string): Promise<void> {
    return this.apiService.postRequests(
      this.localStorageService.get(LocalStorageKey.A),
      externalId, body,
    );
  }

  public async postRequestsApprove(request: Request): Promise<void> {
    return this.apiService.postRequestsApprove(
      this.localStorageService.get(LocalStorageKey.A),
      request.id,
    );
  }

  // public async fetchAgentsLatest(): Promise<void> {
  //   return this.apiService.getAgentsLatest(
  //     this.localStorageService.get(LocalStorageKey.A),
  //   ).then((agents: EasyAgent[]) => {
  //     this.dataEasyAgentsService.setAgent(...agents);
  //   });
  // }

}
