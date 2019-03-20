import { Injectable } from '@angular/core';
import { RoomComponent } from './room.component';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { RoomService } from './room.service';

@Injectable({
  providedIn: 'root'
})
export class RoomCandeactivateService implements CanDeactivate<RoomComponent> {

  constructor(
    private roomService: RoomService,
  ) { }

  canDeactivate(
    component: RoomComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): boolean {
    this.roomService.roomId = null;
    return true;
  }
}
