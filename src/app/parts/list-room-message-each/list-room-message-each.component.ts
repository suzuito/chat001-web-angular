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

  @Output()
  public clickUserIcon: EventEmitter<void>;

  @Output()
  public clickUserName: EventEmitter<void>;

  @ViewChild('domMain')
  public domMain: ElementRef;

  @ViewChild('domUser')
  public domUser: ElementRef;

  @ViewChild('domBody')
  public domBody: ElementRef;

  constructor() {
    this.isLeft = true;
    this.clickUserIcon = new EventEmitter<void>();
    this.clickUserName = new EventEmitter<void>();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    /*
    const cssMain = getRealStyle(this.domMain);
    const cssUser = getRealStyle(this.domUser);
    const cssBody = getRealStyle(this.domBody);
    const widthUser = parseInt(cssMain.width, 10) * 0.3;
    const widthBody = parseInt(cssMain.width, 10) * 0.7;
    console.log(cssMain.width, widthUser, widthBody);
    this.domUser.nativeElement.style.width = `${widthUser}px`;
    this.domBody.nativeElement.style.width = `${widthBody}px`;
    */
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
