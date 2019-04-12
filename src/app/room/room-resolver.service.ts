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
    console.log('resolve');
    const roomId = route.params.roomId;
    if (this.agentService.isInRoom(roomId)) {
      this.roomService.roomId = roomId;
      return;
    }
    if (this.dataRoomsService.has(roomId)) {
      return this.appService.enterRoom(
        this.dataRoomsService.get(roomId)
      ).catch(() => {
        // Wrong password?
        this.router.navigate(['room-entrance', roomId]);
      });
    }
    return this.appService.fetchRoom(roomId)
      .then((fetchedRoom: Room) => {
        return this.appService.enterRoom(
          this.dataRoomsService.get(roomId)
        ).catch(() => {
          // Wrong password?
          this.router.navigate(['room-entrance', roomId]);
        });
      })
      .catch(err => {
        if (err.status === 404) {
          return this.appService.createRoomDefault(roomId)
            .catch(() => {
              this.errorService.fatal5XX('原因不明のエラーが発生しました');
            });
        } else {
          this.errorService.fatal5XX('原因不明のエラーが発生しました');
        }
      });
  }
}
