import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Line } from 'src/app/model/line';
import { DataEasyAgentsService } from 'src/app/data-easy-agents.service';
import { Room } from 'src/app/model/room';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent implements OnInit {

  @Input()
  public lines: Line[];

  @Output()
  public clickMentionRoom: EventEmitter<string>;

  @Output()
  public clickMention: EventEmitter<string>;

  constructor() {
    this.clickMention = new EventEmitter<string>();
    this.clickMentionRoom = new EventEmitter<string>();
  }

  ngOnInit() {
  }

}
