import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { EasyAgent } from 'src/app/model/agent';
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
    this.agents = [];
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
