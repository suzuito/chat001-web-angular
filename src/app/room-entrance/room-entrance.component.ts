import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { Room } from '../model/room';
import { DataService } from '../data.service';
import { RoomEntranceService } from './room-entrance.service';
import { SideMenuScrollService, ScrollIdRoomMembers, byRoomId } from '../side-menu/side-menu-scroll.service';
import { Scroll } from '@angular/router';

@Component({
  selector: 'app-room-entrance',
  templateUrl: './room-entrance.component.html',
  styleUrls: ['./room-entrance.component.scss']
})
export class RoomEntranceComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private dataService: DataService,
    private roomEntService: RoomEntranceService,
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
    return this.dataService.getRoomRaw(this.roomEntService.roomId);
  }

  public enterRoom(): void { }
}
