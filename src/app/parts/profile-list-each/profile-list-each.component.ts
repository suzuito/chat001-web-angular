import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { getRealStyle } from 'src/app/util';
import { EasyAgent } from 'src/app/model/agent';
import { AgentRoleInRoom } from 'src/app/model/room';

@Component({
  selector: 'app-profile-list-each',
  templateUrl: './profile-list-each.component.html',
  styleUrls: ['./profile-list-each.component.scss']
})
export class ProfileListEachComponent implements OnInit {

  @Input()
  public role: AgentRoleInRoom;

  @Input()
  public agent: EasyAgent;

  @Input()
  public sizeImg: string;

  @Input()
  public disableAction: boolean;

  constructor(
  ) {
    this.role = null;
    this.disableAction = false;
  }

  ngOnInit() {
  }

  public sizeImgLeftPx(): string {
    const n = parseInt(this.sizeImg, 10) + 10;
    return `${n}px`;
  }

  public sizeImgRightPx(): string {
    return `${this.sizeImg}px`;
  }

}
