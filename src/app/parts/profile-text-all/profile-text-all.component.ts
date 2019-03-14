import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { getRealStyle } from 'src/app/util';
import { MatCard } from '@angular/material';

@Component({
  selector: 'app-profile-text-all',
  templateUrl: './profile-text-all.component.html',
  styleUrls: ['./profile-text-all.component.scss']
})
export class ProfileTextAllComponent implements OnInit, AfterViewInit {

  @Input()
  public agentName: string;

  @Input()
  public agentDescription: string;

  @Input()
  public nameOnly: boolean;

  @Input()
  public linesDescription: number;

  @Input()
  public width: string;

  constructor() {
    this.nameOnly = false;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
