import { Component, OnInit, Input, AfterViewInit, OnDestroy, OnChanges, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Room } from 'src/app/model/room';
import { ActivatedRoute, Params } from '@angular/router';
import { RoomService, CurrentRoomRoute } from '../room.service';
import { RoomMessageService } from 'src/app/room-message.service';
import { Message } from 'src/app/model/room_message';
import { SideMenuScrollService, ScrollIdRoomMessages, byRoomId } from 'src/app/side-menu/side-menu-scroll.service';
import { AppService } from 'src/app/app.service';
import { EasyAgent } from 'src/app/model/agent';
import { DataEasyAgentsService } from 'src/app/data-easy-agents.service';
import { CursorManagerRoomMessageService } from '../cursor-manager-room-message.service';
import { SideMenuWidthService } from 'src/app/side-menu/side-menu-width.service';
import { ErrorService } from 'src/app/error.service';
import { DataAgentsInRoomService } from 'src/app/data-agents-in-room.service';
import { DataRoomsService } from 'src/app/data-rooms.service';
import { RoomInputterService } from '../room-inputter/room-inputter.service';
import { AgentService } from 'src/app/agent.service';

@Component({
  selector: 'app-room-message',
  templateUrl: './room-message.component.html',
  styleUrls: ['./room-message.component.scss']
})
export class RoomMessageComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {

  private prevRoomId: string;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private roomMessageService: RoomMessageService,
    private roomMessageFetcher: CursorManagerRoomMessageService,
    private scrollService: SideMenuScrollService,
    private appService: AppService,
    private dataEasyAgentsService: DataEasyAgentsService,
    private dataAgentsInRoomService: DataAgentsInRoomService,
    private dataRoomsService: DataRoomsService,
    private errorService: ErrorService,
    private roomInputterService: RoomInputterService,
    private agentService: AgentService,
  ) {
    this.prevRoomId = null;
    this.roomMessageService.addListener('message', (roomId: string) => {
      if (!this.scrollService.isBottom()) {
        return;
      }
      setTimeout(() => {
        this.scrollService.scrollToBottom();
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

  public messages(): Message[] {
    this.roomMessageService.clearUnread(this.room.id);
    this.roomMessageService.clearIncludeYourMention(this.room.id);
    return this.roomMessageService.getMessages(this.room.id).data;
  }

  public getRoomsMessages(): void {
    this.roomMessageFetcher.fetch(this.room.id);
  }

  public messageAgent(externalId: string): EasyAgent {
    return this.dataEasyAgentsService.get(externalId);
  }

  public clickMore(): void {
    this.roomMessageFetcher.fetch(this.roomService.roomId);
  }

  public openDialogProfile(externalId: string): void {
    if (!this.dataEasyAgentsService.has(externalId)) {
      this.errorService.warn('存在しないユーザーです');
      return;
    }
    const readonly = this.agentService.get().externalId === externalId;
    this.appService.openDialogProfile(this.dataEasyAgentsService.get(externalId), readonly);
  }

  public clickMentionRoom(roomId: string): void {
    this.appService.routeToRoom(roomId);
  }

  public clickReply(externalId: string): void {
    this.roomInputterService.textReply(externalId);
    this.roomInputterService.focus();
  }

  public displayUserActions(message: Message, i: number): boolean {
    return !this.isSameBeforeUser(message, i);
  }

  public displayUserImage(message: Message, i: number): boolean {
    return !this.isSameBeforeUser(message, i);
  }

  public displayTopMessageDivider(message: Message, i: number): boolean {
    return !this.isSameBeforeUser(message, i);
  }

  public displayReply(message: Message): boolean {
    return this.agentService.get().externalId !== message.agentExternalId;
  }

  private isSameBeforeUser(message: Message, i: number): boolean {
    if (i === 0) {
      return false;
    }
    const messages = this.messages();
    if (messages.length <= 1) {
      return false;
    }
    const j = i - 1;
    return messages[j].agentExternalId === messages[i].agentExternalId;
  }

}
