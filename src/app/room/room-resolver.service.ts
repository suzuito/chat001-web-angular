import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RoomService } from './room.service';
import { AppService } from '../app.service';
import { RoomAgentIn } from '../model/agent';
import { HttpErrorResponse } from '@angular/common/http';
import { AgentService } from '../agent.service';

@Injectable({
  providedIn: 'root'
})
export class RoomResolverService implements Resolve<boolean> {

  constructor(
    private dataService: DataService,
    private roomService: RoomService,
    private agentService: AgentService,
    private appService: AppService,
    private router: Router,
  ) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
  ): Promise<boolean> {
    const roomId = route.params.roomId;
    // TODO: Rewrite logic into appService method
    if (!this.agentService.isInRoom(roomId)) {
      return this.appService.apiGetAgentRoomByID(roomId).then((r: RoomAgentIn) => {
        this.roomService.roomId = r.room.id;
        return true;
      }).catch((err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.router.navigate(['room-entrance', roomId]);
        } else {
          this.router.navigate(['error']);
        }
        return false;
      });
    }
    this.roomService.roomId = route.params.roomId;
    return true;
  }
}
