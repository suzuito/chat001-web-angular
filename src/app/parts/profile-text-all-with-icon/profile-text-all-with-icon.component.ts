import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { getRealStyle } from 'src/app/util';

@Component({
  selector: 'app-profile-text-all-with-icon',
  templateUrl: './profile-text-all-with-icon.component.html',
  styleUrls: ['./profile-text-all-with-icon.component.scss']
})
export class ProfileTextAllWithIconComponent implements OnInit {

  @Input()
  public width: string;

  @Input()
  public linesDescription: number;

  @Input()
  public agentName: string;

  @Input()
  public agentDescription: string;

  @Input()
  public nameOnly: boolean;

  constructor() {
    this.width = '100%';
    this.linesDescription = null;
    this.nameOnly = false;
  }

  ngOnInit() {
  }
}
