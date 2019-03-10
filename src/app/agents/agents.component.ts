import { Component, OnInit } from '@angular/core';
import { AgentsSearchOptionService } from './agents-search-option.service';
import { DataService } from '../data.service';
import { EasyAgent } from '../model/agent';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {

  constructor(
    private dataService: DataService,
    public opt: AgentsSearchOptionService,
  ) { }

  ngOnInit() {
  }

  public agents(): EasyAgent[] {
    return this.dataService.filterAgent(this.opt);
  }

}
