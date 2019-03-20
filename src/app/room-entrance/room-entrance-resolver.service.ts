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
  ): Promise<any> {
    return this.roomEntService.routeToRoom(route.params.roomId);
  }

}
