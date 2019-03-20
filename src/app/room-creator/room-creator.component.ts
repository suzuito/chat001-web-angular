import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Room } from '../model/room';
import { RoomInfo } from '../parts/room-info/room-info.component';
import { SideMenuScrollService, ScrollIdRoomCreator } from '../side-menu/side-menu-scroll.service';

@Component({
  selector: 'app-room-creator',
  templateUrl: './room-creator.component.html',
  styleUrls: ['./room-creator.component.scss']
})
export class RoomCreatorComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private scrollService: SideMenuScrollService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.scrollService.loadScrollPos(ScrollIdRoomCreator, false);
  }

  ngOnDestroy() {
    this.scrollService.saveScrollPos(ScrollIdRoomCreator);
  }

  public clickDoneRoomInfo(room: RoomInfo): void {
    console.log(room);
  }

}
