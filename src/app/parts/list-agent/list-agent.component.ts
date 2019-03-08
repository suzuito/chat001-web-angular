import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EasyAgent } from 'src/app/model/agent';
import { testAgents } from 'src/app/model/testdata';
import { MatList } from '@angular/material';

@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.scss']
})
export class ListAgentComponent implements OnInit {

  @Input()
  public agents: EasyAgent[];

  @Input()
  public width: string;

  @Input()
  public sizeImage: string;

  @ViewChild('list')
  public elemList: MatList;

  constructor() {
    this.agents = testAgents;
    this.width = '100%';
  }

  ngOnInit() {
  }

}
