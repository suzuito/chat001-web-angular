import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-sub-main',
  templateUrl: './header-sub-main.component.html',
  styleUrls: ['./header-sub-main.component.scss']
})
export class HeaderSubMainComponent implements OnInit {

  @Input()
  public title: string;

  @Output()
  public clickBack: EventEmitter<void>;

  constructor() {
    this.clickBack = new EventEmitter<void>();
  }

  ngOnInit() {
  }

}
