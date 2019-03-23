import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss']
})
export class HeaderMainComponent implements OnInit {

  @Input()
  public title: string;

  @Output()
  public clickTitle: EventEmitter<void>;

  constructor() {
    this.clickTitle = new EventEmitter<void>();
  }

  ngOnInit() {
  }

}
