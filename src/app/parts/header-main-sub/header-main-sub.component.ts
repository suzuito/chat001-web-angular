import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header-main-sub',
  templateUrl: './header-main-sub.component.html',
  styleUrls: ['./header-main-sub.component.scss']
})
export class HeaderMainSubComponent implements OnInit {

  @Output()
  public clickNewRooms: EventEmitter<void>;

  @Output()
  public clickBoostRooms: EventEmitter<void>;

  @Output()
  public clickAgents: EventEmitter<void>;

  @Output()
  public clickAgentMessages: EventEmitter<void>;

  @Input()
  public notifications: number;

  constructor() {
    this.clickAgentMessages = new EventEmitter<void>();
    this.clickBoostRooms = new EventEmitter<void>();
    this.clickAgents = new EventEmitter<void>();
    this.clickNewRooms = new EventEmitter<void>();
    this.notifications = 0;
  }

  ngOnInit() {
  }

  public badgeHidden(): boolean {
    return this.notifications <= 0;
  }

}
