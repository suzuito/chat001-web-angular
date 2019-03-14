import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-list-any',
  templateUrl: './list-any.component.html',
  styleUrls: ['./list-any.component.scss']
})
export class ListAnyComponent implements OnInit {

  @Input()
  public width: string;

  @Input()
  public caption: string;

  @Input()
  public heightList: string;

  @Input()
  public disableHeader: boolean;

  @Input()
  public disableMore: boolean;

  @Output()
  public clickAll: EventEmitter<void>;

  @Output()
  public clickMore: EventEmitter<void>;

  constructor() {
    this.clickAll = new EventEmitter<void>();
    this.clickMore = new EventEmitter<void>();
  }

  ngOnInit() {
  }

}
