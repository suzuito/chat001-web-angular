import { Component, OnInit } from '@angular/core';
import { AgentMessagesSearchOptionService } from '../agent-messages-search-option.service';

@Component({
  selector: 'app-agent-messages-search-option',
  templateUrl: './agent-messages-search-option.component.html',
  styleUrls: ['./agent-messages-search-option.component.scss']
})
export class AgentMessagesSearchOptionComponent implements OnInit {

  constructor(
    public opt: AgentMessagesSearchOptionService,
  ) {
  }

  ngOnInit() {
  }

}
