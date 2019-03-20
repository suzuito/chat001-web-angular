import { Component, OnInit, Input } from '@angular/core';
import { SortedArray } from 'src/app/data.store';
import { Message } from 'src/app/model/room_message';
import { DataService } from 'src/app/data.service';
import { AgentInRoom } from 'src/app/model/room';

@Component({
  selector: 'app-list-room-message',
  templateUrl: './list-room-message.component.html',
  styleUrls: ['./list-room-message.component.scss']
})
export class ListRoomMessageComponent implements OnInit {

  @Input()
  public roomId: string;

  @Input()
  public messages: Message[];

  @Input()
  public dataService: DataService;

  constructor() {
    this.messages = null;
  }

  ngOnInit() {
  }

  public agent(externalId: string): AgentInRoom {
    const ret = this.dataService.getAgentInRoom(this.roomId, externalId);
    return ret;
  }

}
