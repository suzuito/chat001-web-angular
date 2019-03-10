import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  @Output()
  public clickExpand: EventEmitter<void>;

  @Input()
  public icon: string;

  @Input()
  public txt: string;
  @Output()
  public txtChange: EventEmitter<string>;

  constructor() {
    this.clickExpand = new EventEmitter<void>();
    this.txtChange = new EventEmitter<string>();
  }

  ngOnInit() {
  }

  public change(): void {
    this.txtChange.emit(this.txt);
  }

}
