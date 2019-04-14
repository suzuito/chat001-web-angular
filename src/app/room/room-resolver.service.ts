import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { RoomService } from './room.service';
import { CursorManagerRoomMessageService } from './cursor-manager-room-message.service';
import { AppService } from '../app.service';
import { AgentService } from '../agent.service';
import { DataRoomsService } from '../data-rooms.service';
import { ErrorService } from '../error.service';
import { Room } from '../model/room';

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
    private errorService: ErrorService,
  ) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
  ): Promise<any> {
    const roomId = route.params.roomId;
    if (this.agentService.isInRoom(roomId)) {
      // Route to room path
      this.roomService.roomId = roomId;
      this.appService.getRoomMembers(roomId);
      return;
    }
    if (this.dataRoomsService.has(roomId)) {
      if (this.dataRoomsService.get(roomId).password) {
        // To entrance path
        this.router.navigate(['room-entrance', roomId]);
        return;
      }
      // enter path
      return this.appService.enterRoom(
        this.dataRoomsService.get(roomId)
      );
    }
    return this.appService.fetchRoom(roomId)
      .then((fetchedRoom: Room) => {
        if (fetchedRoom.password) {
          // To entrance path
          this.router.navigate(['room-entrance', roomId]);
          return;
        }
        // enter path
        return this.appService.enterRoom(
          this.dataRoomsService.get(roomId)
        );
      })
      .catch(err => {
        if (err.status === 404) {
          this.errorService.fatal4XXNotFound('既に削除されたか、存在しない部屋のようです');
        } else {
          this.errorService.fatal5XX('原因不明のエラーが発生しました');
        }
      });
  }
}
