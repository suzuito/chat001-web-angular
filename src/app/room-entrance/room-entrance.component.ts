import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { Room } from '../model/room';
import { RoomEntranceService } from './room-entrance.service';
import { SideMenuScrollService, ScrollIdRoomMembers, byRoomId } from '../side-menu/side-menu-scroll.service';
import { Scroll } from '@angular/router';
import { AppService } from '../app.service';
import { DataRoomsService } from '../data-rooms.service';

@Component({
  selector: 'app-room-entrance',
  templateUrl: './room-entrance.component.html',
  styleUrls: ['./room-entrance.component.scss']
})
export class RoomEntranceComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private roomEntService: RoomEntranceService,
    private dataRoomsService: DataRoomsService,
    private appService: AppService,
    private scrollService: SideMenuScrollService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.scrollService.saveScrollPos(byRoomId(ScrollIdRoomMembers, this.roomEntService.roomId));
  }

  ngAfterViewInit() {
    this.scrollService.loadScrollPos(byRoomId(ScrollIdRoomMembers, this.roomEntService.roomId), false);
  }

  public get room(): Room {
    return this.dataRoomsService.get(this.roomEntService.roomId);
  }

  public enterRoom(): void {
    this.appService.enterRoom(this.room);
  }
}
