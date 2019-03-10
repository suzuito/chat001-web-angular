import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox-with-icon',
  templateUrl: './checkbox-with-icon.component.html',
  styleUrls: ['./checkbox-with-icon.component.scss']
})
export class CheckboxWithIconComponent implements OnInit {

  @Input()
  public text: string;

  @Input()
  public icon: string;

  @Input()
  public paddingBetween: string;

  @Input()
  public checked: boolean;
  @Output()
  public checkedChange: EventEmitter<boolean>;

  constructor() {
    this.checkedChange = new EventEmitter<boolean>();
  }

  public change() {
    this.checkedChange.emit(this.checked);
  }

  ngOnInit() {
  }

}
