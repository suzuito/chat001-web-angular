import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss']
})
export class ButtonIconComponent implements OnInit {

  @Input()
  public icon: string;

  @Input()
  public text: string;

  @Output()
  public click: EventEmitter<void>;

  constructor() {
    this.click = new EventEmitter<void>();
  }

  ngOnInit() {
  }

}
