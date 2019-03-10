import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {

  @Input()
  public caption: string;

  @Output()
  public clickAll: EventEmitter<void>;

  constructor() {
    this.clickAll = new EventEmitter<void>();
  }

  ngOnInit() {
  }

}
