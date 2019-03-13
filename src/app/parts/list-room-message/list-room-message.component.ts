import { Component, OnInit, Input } from '@angular/core';
import { SortedArray } from 'src/app/data.store';
import { Message } from 'src/app/model/room_message';

@Component({
  selector: 'app-list-room-message',
  templateUrl: './list-room-message.component.html',
  styleUrls: ['./list-room-message.component.scss']
})
export class ListRoomMessageComponent implements OnInit {

  @Input()
  public messages: Message[];

  constructor() {
    this.messages = null;
  }

  ngOnInit() {
  }

}
