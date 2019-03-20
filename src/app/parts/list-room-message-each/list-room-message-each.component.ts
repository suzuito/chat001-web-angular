import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from 'src/app/model/room_message';
import { AgentInRoom } from 'src/app/model/room';

@Component({
  selector: 'app-list-room-message-each',
  templateUrl: './list-room-message-each.component.html',
  styleUrls: ['./list-room-message-each.component.scss']
})
export class ListRoomMessageEachComponent implements OnInit {

  @Input()
  public message: Message;

  @Input()
  public agent: AgentInRoom;

  @Input()
  public isLeft: boolean;

  @Output()
  public clickUserIcon: EventEmitter<void>;

  @Output()
  public clickMenuRequest: EventEmitter<void>;

  @Output()
  public clickMenuUserInfo: EventEmitter<void>;

  constructor() {
    this.isLeft = true;
    this.clickUserIcon = new EventEmitter<void>();
    this.clickMenuRequest = new EventEmitter<void>();
    this.clickMenuUserInfo = new EventEmitter<void>();
  }

  ngOnInit() {
  }

  public agentName(): string {
    if (this.agent) {
      return this.agent.agent.name;
    }
    return '';
  }

  public agentURLImage(): string {
    if (this.agent) {
      return this.agent.agent.urlImage;
    }
    return '';
  }

  public flexDirectionMain(): string {
    if (this.isLeft) {
      return 'row';
    } else {
      return 'row-reverse';
    }
  }

  public textAlign(): string {
    if (this.isLeft) {
      return 'right';
    } else {
      return 'left';
    }
  }

}
