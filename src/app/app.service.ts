import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AgentService } from './agent.service';
import { LocalStorageService, LocalStorageKey } from './local-storage.service';
import { Init, RoomMessageImageLink } from './model/other';
import { RoomAgentIn, EasyAgent, Agent, RoomAgentInOnlyID } from './model/agent';
import { Rooms, Room, EnterRoom, ExitRoom, CreateRoom, newAgentInRoomOnlyID, AgentInRoom, AgentRoleInRoom } from './model/room';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogPasswordInputterComponent } from './parts/dialog-password-inputter/dialog-password-inputter.component';
import { WsService } from './ws.service';
import { WSMessage } from './model/ws';
import { RoomMessage, MessageType, attachObjectToMessage, attachObjectToAgentMessage } from './model/room_message';
import { RoomMessageService } from './room-message.service';
import { DataRoomsService } from './data-rooms.service';
import { DataEasyAgentsService } from './data-easy-agents.service';
import { DataAgentsInRoomService } from './data-agents-in-room.service';
import { Request } from './model/request';
import { AgentMessage, WSAgentMessage } from './model/agent_message';
import { RoomService } from './room/room.service';
import { DataEasyAgentsLatestService } from './data-easy-agents-latest.service';
import { DataSyncherService } from './data-syncher.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { errCodeToMsg, errByHttpError } from './model/error';
import { DialogProgressiveComponent, defaultDialogConfigProgressive } from './parts/dialog-progressive/dialog-progressive.component';
import { DialogProfileComponent, DataDialogProfile, ResultDialogProfile } from './parts/dialog-profile/dialog-profile.component';
import { DialogIntroducerComponent } from './parts/dialog-introducer/dialog-introducer.component';
import { DialogRequesterComponent, DataDialogRequester } from './parts/dialog-requester/dialog-requester.component';
import { RoomInfo } from './parts/room-info/room-info.component';
import { DialogConfirmerComponent, DataDialogConfirmerComponent } from './parts/dialog-confirmer/dialog-confirmer.component';

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
    private dataSyncherService: DataSyncherService,
    private errorService: ErrorService,
  ) {
    this.soundReciveAgentMessage = new Audio('assets/se_maoudamashii_onepoint28.wav');
    this.wsService.addRoute('/room/message', (msg: WSMessage) => {
      const rmsg = msg.data as RoomMessage;
      attachObjectToMessage(rmsg.message);
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
      attachObjectToAgentMessage(rmsg.message);
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

  private s(p: Promise<any>): Promise<any> {
    const ref = this.dialog.open(DialogProgressiveComponent, defaultDialogConfigProgressive);
    return p.then((a) => {
      ref.componentInstance.success('');
      return a;
    }).catch((err: Error) => {
      ref.componentInstance.fail(err.message);
    }).finally(() => {
    });
  }

  private routeToRemainingRoom(): void {
    const roomsAgentIn = this.agentService.filterRoom();
    if (roomsAgentIn.length > 0) {
      this.router.navigate(['room', roomsAgentIn[0].roomId]);
      return;
    }
    this.router.navigate(['']);
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
    return this.s(this.apiService.putEnterRoom(
      this.localStorageService.get(LocalStorageKey.A),
      room.id,
      password,
    ).then((enterRoom: EnterRoom) => {
      this.agentService.setRoom(enterRoom.roomAgentIn);
      this.router.navigate(['room', room.id]);
      return;
    }).catch(err => {
      throw errByHttpError(err);
    }));
  }

  public async exitRoom(roomId: string): Promise<void> {
    this.apiService.putExitRoom(
      this.localStorageService.get(LocalStorageKey.A),
      roomId,
    ).then((exitRoom: ExitRoom) => {
      this.agentService.deleteRoom(roomId);
      this.routeToRemainingRoom();
    }).catch(err => {
      throw errByHttpError(err);
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
    return this.s(this.apiService.postRooms(
      this.localStorageService.get(LocalStorageKey.A),
      name, description, maxAgents, isPublic, passwordRaw,
    ).then((cr: CreateRoom) => {
      this.dataRoomsService.setRoom(cr.room);
      this.dataAgentsInRoomService.setAgentInRoom(cr.room.id, newAgentInRoomOnlyID(cr.agentInRoom));
      this.agentService.setRoom(cr.roomAgentIn);
      this.router.navigate(['room', cr.room.id]);
      return;
    }).catch((err: HttpErrorResponse) => {
      throw errByHttpError(err);
    }));
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
    return this.s(this.apiService.postRequestsApprove(
      this.localStorageService.get(LocalStorageKey.A),
      request.id,
    ).then((room: Room) => {
      this.enterRoom(room);
    }).catch(err => {
      throw errByHttpError(err);
    }));
  }

  public async postRoomsMessagesImage(roomId: string, file: File): Promise<RoomMessageImageLink> {
    return this.apiService.postRoomsMessagesImage(
      this.localStorageService.get(LocalStorageKey.A),
      roomId, file,
    );
  }

  public async putRoomsMessages(roomId: string, message: string): Promise<void> {
    if (/^\s*$/.test(message)) {
      return Promise.resolve();
    }
    return this.apiService.putRoomsMessages(
      this.localStorageService.get(LocalStorageKey.A),
      roomId,
      message,
    ).then((msg: RoomMessage) => {
      return;
    });
  }

  public async putRoomsMembersRole(roomId: string, externalId: string, role: AgentRoleInRoom): Promise<void> {
    return this.s(this.apiService.putRoomsMembersRole(
      this.localStorageService.get(LocalStorageKey.A),
      roomId,
      externalId,
      role,
    ).then(() => {
      this.dataAgentsInRoomService.updateRole(roomId, externalId, role);
    }).catch(err => {
      throw errByHttpError(err);
    }));
  }

  public async putRooms(roomId: string, info: RoomInfo): Promise<void> {
    return this.s(this.apiService.putRooms(
      this.localStorageService.get(LocalStorageKey.A),
      roomId,
      info,
    ).then((room: Room) => {
      this.dataRoomsService.setRoom(room);
    }).catch(err => {
      throw errByHttpError(err);
    }));
  }

  public async deleteRooms(roomId: string): Promise<void> {
    return this.s(this.apiService.deleteRooms(
      this.localStorageService.get(LocalStorageKey.A),
      roomId,
    ).then((room) => {
      this.dataRoomsService.setRoom(room);
      this.errorService.warn('削除を予約しました。いずれかのタイミングでこの部屋は削除されます。');
    }).catch(err => {
      throw errByHttpError(err);
    }));
  }

  public async openDialogProfile(agent: EasyAgent, readonly: boolean = false): Promise<void> {
    const ref = this.dialog.open(
      DialogProfileComponent,
      {
        data: { agent, readonly } as DataDialogProfile,
      },
    );
    const result: ResultDialogProfile = await ref.afterClosed().toPromise();
    if (!result) {
      return;
    }
    if (result === ResultDialogProfile.Request) {
      this.openDialogRequester(agent);
    } else if (result === ResultDialogProfile.Intr) {
      this.openDialogIntr(agent);
    }
  }

  public async openDialogIntr(agent: EasyAgent): Promise<void> {
    const ref = this.dialog.open(
      DialogIntroducerComponent,
      {
        data: {
          agentNames: [agent.name],
          rooms: this.agentService.filterRoom().map((v: RoomAgentInOnlyID) => this.dataRoomsService.get(v.roomId)),
        },
      },
    );
    const result: Room = await ref.afterClosed().toPromise();
    if (!result) {
      return;
    }
    this.roomService.intr([agent], result);
  }

  public async openDialogRequester(agent: EasyAgent): Promise<void> {
    const ref = this.dialog.open(
      DialogRequesterComponent,
      {
        data: {
          agent,
        } as DataDialogRequester,
      },
    );
    const data: DataDialogRequester = await ref.afterClosed().toPromise();
    if (!data) {
      return;
    }
    this.postRequests(agent.externalId, data.message);
  }

  public async openDialogConfirmer(msg: string, yes: string, no: string): Promise<boolean> {
    const ref = this.dialog.open(
      DialogConfirmerComponent,
      {
        data: {
          msg, yes, no,
        } as DataDialogConfirmerComponent,
        disableClose: true,
      },
    );
    return await ref.afterClosed().toPromise();
  }
}
