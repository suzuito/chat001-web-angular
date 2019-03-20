import { Injectable } from '@angular/core';
import { Room } from '../model/room';
import { DataService } from '../data.service';
import { AgentService } from '../agent.service';
import { ApiService } from '../api.service';
import { LocalStorageService, LocalStorageKey } from '../local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class RoomEntranceService {

  public room: Room;

  constructor(
    private dataService: DataService,
    private agentService: AgentService,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private errService: ErrorService,
    private router: Router,
  ) {
    this.room = null;
  }

  public async routeToRoom(roomId: string): Promise<void> {
    if (!this.dataService.hasRoom(roomId)) {
      return this.apiService.getRoomByID(
        this.localStorageService.get(LocalStorageKey.A),
        roomId,
      ).then((room: Room) => {
        this.room = room;
        return;
      }).catch((err: HttpErrorResponse) => {
        this.errService.errp5XX();
        return;
      });
    }
    this.room = this.dataService.getRoomRaw(roomId);
    return;
  }
}
