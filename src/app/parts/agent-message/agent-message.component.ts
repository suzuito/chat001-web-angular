import { Component, OnInit, Input } from '@angular/core';
import { AgentMessage } from 'src/app/model/agent_message';

@Component({
  selector: 'app-agent-message',
  templateUrl: './agent-message.component.html',
  styleUrls: ['./agent-message.component.scss']
})
export class AgentMessageComponent implements OnInit {

  @Input()
  public message: AgentMessage;

  constructor() { }

  ngOnInit() {
  }

}
