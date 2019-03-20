import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AgentService } from './agent.service';
import { LocalStorageService, LocalStorageKey } from './local-storage.service';
import { Init } from './model/other';
import { HttpErrorResponse } from '@angular/common/http';
import { RoomAgentIn } from './model/agent';
import { Rooms, Room, EnterRoom, ExitRoom } from './model/room';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogPasswordInputterComponent } from './parts/dialog-password-inputter/dialog-password-inputter.component';

export const errCannotEnterRoomError = new Error('');

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private apiService: ApiService,
    private agentService: AgentService,
    private localStorageService: LocalStorageService,
    private dataService: DataService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  public async initialize(): Promise<void> {
    return this.apiService.getNull(this.localStorageService.get(LocalStorageKey.A)).then((v: Init) => {
      this.agentService.set(v.agent);
      this.localStorageService.set(LocalStorageKey.A, v.agent.id);
      v.roomsAgentIn.rooms.forEach((roomAgentIn: RoomAgentIn) => {
        this.agentService.setRoom(roomAgentIn);
      });
    });
  }

  public async apiGetRooms(nextCursor: string, limits: number, order: string): Promise<Rooms> {
    return this.apiService.getRooms(
      this.localStorageService.get(LocalStorageKey.A),
      nextCursor,
      limits,
      order,
    ).then((rooms: Rooms) => {
      this.dataService.setRoom(...rooms.rooms);
      return rooms;
    });
  }

  public async apiGetRoom(roomId: string): Promise<Room> {
    return this.apiService.getRoomByID(
      this.localStorageService.get(LocalStorageKey.A),
      roomId,
    ).then((room: Room) => {
      this.dataService.setRoom(room);
      return room;
    });
  }

  public async apiGetAgentRoomByID(roomId: string): Promise<RoomAgentIn> {
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
        this.router.navigate(['room', roomsAgentIn[0].room.id]);
        return;
      }
      this.router.navigate(['']);
    }).catch(err => {
      // TODO: Notice error message
    });
  }

}
