import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Message } from 'src/app/model/room_message';
import { AgentInRoom } from 'src/app/model/room';
import { EasyAgent } from 'src/app/model/agent';
import { urlAvatar, getRealStyle } from 'src/app/util';
import { ProfileImageSize } from '../profile-img/profile-img.component';

@Component({
  selector: 'app-list-room-message-each',
  templateUrl: './list-room-message-each.component.html',
  styleUrls: ['./list-room-message-each.component.scss']
})
export class ListRoomMessageEachComponent implements OnInit, AfterViewInit {

  @Input()
  public message: Message;

  @Input()
  public agent: EasyAgent;

  @Input()
  public isLeft: boolean;

  @Input()
  public displayUserActions: boolean;

  @Input()
  public displayUserImage: boolean;

  @Input()
  public displayReply: boolean;

  @Output()
  public clickUserIcon: EventEmitter<void>;

  @Output()
  public clickUserName: EventEmitter<void>;

  @Output()
  public clickMentionRoom: EventEmitter<string>;

  @Output()
  public clickMention: EventEmitter<string>;

  @Output()
  public clickReply: EventEmitter<string>;

  constructor() {
    this.isLeft = true;
    this.clickUserIcon = new EventEmitter<void>();
    this.clickUserName = new EventEmitter<void>();
    this.clickMentionRoom = new EventEmitter<string>();
    this.clickMention = new EventEmitter<string>();
    this.clickReply = new EventEmitter<string>();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  public agentName(): string {
    if (this.agent) {
      return this.agent.name;
    }
    return this.message.agentExternalId;
  }

  public agentURLImage(): string {
    if (this.agent) {
      return urlAvatar(
        this.agent.externalId,
        this.agent.avatarType,
        ProfileImageSize.Small,
      );
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
