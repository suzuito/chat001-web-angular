import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-main-room',
  templateUrl: './header-main-room.component.html',
  styleUrls: ['./header-main-room.component.scss']
})
export class HeaderMainRoomComponent implements OnInit {

  @Input()
  public title: string;

  @Input()
  public agents: number;

  @Output()
  public clickSettings: EventEmitter<void>;

  constructor() {
    this.title = 'testtesttesttesttesttesttesttest';
    // this.title = 'test';
    this.agents = 123;
    this.clickSettings = new EventEmitter<void>();
  }

  ngOnInit() {
  }

}
