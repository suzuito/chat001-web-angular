import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AgentMessage } from 'src/app/model/agent_message';

@Component({
  selector: 'app-list-agent-message',
  templateUrl: './list-agent-message.component.html',
  styleUrls: ['./list-agent-message.component.scss']
})
export class ListAgentMessageComponent implements OnInit {

  @Input()
  public messages: AgentMessage[];

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
    this.messages = [];
    this.width = '100%';
    this.sizeImg = '50';
    this.disableHeader = false;
    this.disableMore = true;
    this.clickAll = new EventEmitter<void>();
    this.clickMore = new EventEmitter<void>();
  }

  ngOnInit() {
  }

}
