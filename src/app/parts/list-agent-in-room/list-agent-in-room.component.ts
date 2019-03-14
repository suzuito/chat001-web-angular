import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EasyAgent } from 'src/app/model/agent';
import { AgentInRoom } from 'src/app/model/room';

@Component({
  selector: 'app-list-agent-in-room',
  templateUrl: './list-agent-in-room.component.html',
  styleUrls: ['./list-agent-in-room.component.scss']
})
export class ListAgentInRoomComponent implements OnInit {

  @Input()
  public agentsInRoom: AgentInRoom[];

  @Input()
  public width: string;

  @Input()
  public caption: string;

  @Input()
  public heightList: string;

  @Input()
  public sizeImg: string;

  @Input()
  public disableHeader: boolean;

  @Input()
  public disableMore: boolean;

  @Output()
  public clickAll: EventEmitter<void>;

  @Output()
  public clickMore: EventEmitter<void>;

  constructor() {
    this.width = '100%';
    this.sizeImg = '50';
  }

  ngOnInit() {
  }

}
