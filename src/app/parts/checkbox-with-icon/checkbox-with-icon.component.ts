import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox-with-icon',
  templateUrl: './checkbox-with-icon.component.html',
  styleUrls: ['./checkbox-with-icon.component.scss']
})
export class CheckboxWithIconComponent implements OnInit {

  @Input()
  public textOn: string;
  @Input()
  public textOff: string;

  @Input()
  public iconOn: string;
  @Input()
  public iconOff: string;

  @Input()
  public paddingBetween: string;

  @Input()
  public checked: boolean;
  @Output()
  public checkedChange: EventEmitter<boolean>;

  @Input()
  public disabled: boolean;

  constructor() {
    this.checkedChange = new EventEmitter<boolean>();
    this.disabled = false;
  }

  public change() {
    this.checkedChange.emit(this.checked);
  }

  public get icon(): string {
    if (this.checked) { return this.iconOn; }
    return this.iconOff;
  }
  public get text(): string {
    if (this.checked) { return this.textOn; }
    return this.textOff;
  }

  ngOnInit() {
  }

}
