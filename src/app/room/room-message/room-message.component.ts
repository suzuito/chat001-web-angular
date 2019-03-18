import { Component, OnInit, Input, AfterViewInit, OnDestroy, OnChanges, AfterViewChecked } from '@angular/core';
import { Room } from 'src/app/model/room';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { RoomService } from '../room.service';
import { RoomMessageService } from 'src/app/room-message.service';
import { Message } from 'src/app/model/room_message';
import { SideMenuScrollService, ScrollIdRoomMessages, byRoomId } from 'src/app/side-menu/side-menu-scroll.service';

@Component({
  selector: 'app-room-message',
  templateUrl: './room-message.component.html',
  styleUrls: ['./room-message.component.scss']
})
export class RoomMessageComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {

  private prevRoomId: string;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private roomService: RoomService,
    private roomMessageService: RoomMessageService,
    private scrollService: SideMenuScrollService,
  ) {
    this.prevRoomId = null;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params): void => {
      if (params.roomId) {
        if (this.prevRoomId !== null) {
          this.scrollService.saveScrollPos(byRoomId(ScrollIdRoomMessages, this.prevRoomId));
        }
      }
    });
  }

  ngAfterViewInit() {
    this.scrollService.loadScrollPos(byRoomId(ScrollIdRoomMessages, this.roomService.roomId));
  }

  ngAfterViewChecked() {
    if (!this.prevRoomId) {
      this.prevRoomId = this.roomService.roomId;
      return;
    }
    if (this.prevRoomId === this.roomService.roomId) {
      return;
    }
    this.scrollService.loadScrollPos(byRoomId(ScrollIdRoomMessages, this.roomService.roomId));
    this.prevRoomId = this.roomService.roomId;
    return;
  }

  ngOnDestroy() {
    this.scrollService.saveScrollPos(byRoomId(ScrollIdRoomMessages, this.prevRoomId));
  }

  public get room(): Room {
    return this.roomService.room;
  }

  public messages(): Message[] {
    return this.roomMessageService.getMessages(this.room.id).data;
  }
}
