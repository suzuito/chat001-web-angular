import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RoomEntranceService } from './room-entrance.service';
import { AppService } from '../app.service';
import { Room } from '../model/room';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomEntranceResolverService implements Resolve<boolean> {

  constructor(
    private dataService: DataService,
    private roomEntService: RoomEntranceService,
    private appService: AppService,
    private router: Router,
  ) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
  ): Promise<boolean> {
    const roomId = route.params.roomId;
    // TODO: Rewrite logic into appService method
    if (!this.dataService.hasRoom(roomId)) {
      return this.appService.apiGetRoom(roomId).then((room: Room) => {
        this.roomEntService.room = room;
        return true;
      }).catch((err: HttpErrorResponse) => {
        this.router.navigate(['error']);
        return false;
      });
    }
    this.roomEntService.room = this.dataService.getRoomRaw(roomId);
    return true;
  }

}
