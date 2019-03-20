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
  ): Promise<any> {
    await this.roomService.routeToRoom(route.params.roomId);
    await this.roomService.initializeRoomsMessages();
  }
}
