import { Component, OnInit, Input, AfterViewInit, OnDestroy, OnChanges, AfterViewChecked } from '@angular/core';
import { Room } from 'src/app/model/room';
import { ActivatedRoute, Params } from '@angular/router';
import { RoomService, CurrentRoomRoute } from '../room.service';
import { RoomMessageService } from 'src/app/room-message.service';
import { Message, Messages } from 'src/app/model/room_message';
import { SideMenuScrollService, ScrollIdRoomMessages, byRoomId } from 'src/app/side-menu/side-menu-scroll.service';
import { AppService } from 'src/app/app.service';
import { MatDialog } from '@angular/material';
import { DialogConfirmerComponent } from 'src/app/parts/dialog-confirmer/dialog-confirmer.component';
import { EasyAgent } from 'src/app/model/agent';
import { DataEasyAgentsService } from 'src/app/data-easy-agents.service';
import { CursorManagerRoomMessageService } from '../cursor-manager-room-message.service';

@Component({
  selector: 'app-room-message',
  templateUrl: './room-message.component.html',
  styleUrls: ['./room-message.component.scss']
})
export class RoomMessageComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {

  private prevRoomId: string;
  private message: string;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private roomMessageService: RoomMessageService,
    private roomMessageFetcher: CursorManagerRoomMessageService,
    private scrollService: SideMenuScrollService,
    private appService: AppService,
    private dataEasyAgentsService: DataEasyAgentsService,
    private dialog: MatDialog,
  ) {
    this.prevRoomId = null;
    this.message = '';
    this.roomMessageService.addListener('message', (roomId: string) => {
      if (!this.scrollService.isBottom()) {
        return;
      }
      setTimeout(() => {
        this.scrollService.loadScrollPos(
          byRoomId(ScrollIdRoomMessages, roomId), true,
        );
      }, 500);
    });
  }

  ngOnInit() {
    this.roomService.currentRoomRoute = CurrentRoomRoute.Message;
    this.route.params.subscribe((params: Params): void => {
      if (params.roomId) {
        this.roomMessageFetcher.initialize(params.roomId);
        if (this.prevRoomId !== null) {
          this.scrollService.saveScrollPos(byRoomId(ScrollIdRoomMessages, this.prevRoomId));
        }
      }
    });
  }

  ngAfterViewInit() {
    this.scrollService.loadScrollPos(byRoomId(ScrollIdRoomMessages, this.roomService.roomId), true);
    this.prevRoomId = this.roomService.roomId;
  }

  ngAfterViewChecked() {
    if (!this.prevRoomId) {
      this.prevRoomId = this.roomService.roomId;
      return;
    }
    if (this.prevRoomId === this.roomService.roomId) {
      return;
    }
    this.scrollService.loadScrollPos(byRoomId(ScrollIdRoomMessages, this.roomService.roomId), true);
    this.prevRoomId = this.roomService.roomId;
    return;
  }

  ngOnDestroy() {
    this.scrollService.saveScrollPos(byRoomId(ScrollIdRoomMessages, this.prevRoomId));
  }

  public get room(): Room {
    return this.roomService.room;
  }

  public inputMessage(event: any) {
    if (event.keyCode !== 13) {
      return;
    }
    this.putRoomsMessages();
  }

  public messages(): Message[] {
    return this.roomMessageService.getMessages(this.room.id).data;
  }

  public getRoomsMessages(): void {
    this.roomMessageFetcher.fetch(this.room.id);
  }

  private putRoomsMessages(): void {
    if (this.message.length <= 0) {
      return;
    }
    // TODO: Notice length checking error
    // if (this.message.length > ???) {
    //   return;
    // }
    this.roomService.putRoomsMessages(this.message);
    this.message = '';
  }

  public messageAgent(externalId: string): EasyAgent {
    return this.dataEasyAgentsService.get(externalId);
  }
}
