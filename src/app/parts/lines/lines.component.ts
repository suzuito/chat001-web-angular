import { Component, OnInit, Input } from '@angular/core';
import { Line } from 'src/app/model/line';
import { DataEasyAgentsService } from 'src/app/data-easy-agents.service';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent implements OnInit {

  @Input()
  public lines: Line[];

  constructor() { }

  ngOnInit() {
  }

}
