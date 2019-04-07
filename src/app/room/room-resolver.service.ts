import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { RoomService } from './room.service';
import { CursorManagerRoomMessageService } from './cursor-manager-room-message.service';
import { AppService } from '../app.service';
import { AgentService } from '../agent.service';
import { DataRoomsService } from '../data-rooms.service';

@Injectable({
  providedIn: 'root'
})
export class RoomResolverService implements Resolve<boolean> {

  constructor(
    private roomService: RoomService,
    private dataRoomsService: DataRoomsService,
    private appService: AppService,
    private agentService: AgentService,
    private router: Router,
  ) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
  ): Promise<any> {
    const roomId = route.params.roomId;
    if (!this.agentService.isInRoom(roomId)) {
      this.router.navigate(['room-entrance', roomId]);
      return;
    }
    if (this.dataRoomsService.has(roomId)) {
      this.roomService.roomId = roomId;
      return;
    }
    return this.appService.fetchRoom(roomId).then(() => {
      this.roomService.roomId = roomId;
    });
  }
}
