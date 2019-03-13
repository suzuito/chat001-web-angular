import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/model/room_message';

@Component({
  selector: 'app-list-room-message-each',
  templateUrl: './list-room-message-each.component.html',
  styleUrls: ['./list-room-message-each.component.scss']
})
export class ListRoomMessageEachComponent implements OnInit {

  @Input()
  public message: Message;

  constructor() { }

  ngOnInit() {
  }

  public isLeft(): boolean {
    return false;
  }

}
