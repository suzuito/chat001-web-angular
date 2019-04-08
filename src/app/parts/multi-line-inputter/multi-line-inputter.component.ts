import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, ErrorStateMatcher } from '@angular/material';

export interface DataMultiLineInputter {
  readonly message: string;
  readonly maxLengthMessage: number;
}

class ErrorStateMatcherMessage implements ErrorStateMatcher {
  constructor(private c: MultiLineInputterComponent) { }
  public isErrorState(): boolean {
    return this.c.message.length > this.c.maxLengthMessage;
  }
}

@Component({
  selector: 'app-multi-line-inputter',
  templateUrl: './multi-line-inputter.component.html',
  styleUrls: ['./multi-line-inputter.component.scss']
})
export class MultiLineInputterComponent implements OnInit {

  public message: string;
  public maxLengthMessage: number;

  public errorStateMatcherMessage: ErrorStateMatcherMessage;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: DataMultiLineInputter,
    private ref: MatBottomSheetRef<MultiLineInputterComponent>,
  ) {
    this.message = data.message;
    this.maxLengthMessage = data.maxLengthMessage;
    this.errorStateMatcherMessage = new ErrorStateMatcherMessage(this);
  }

  ngOnInit() {
  }

  public ok() {
    this.ref.dismiss(this.message);
  }
  public cancel() {
    this.ref.dismiss(null);
  }


  public hintLabelMessage(): string {
    return `最大${this.maxLengthMessage}文字`;
  }

  public hintMessage(): string {
    return `${this.message.length} / ${this.maxLengthMessage}`;
  }

  public errorMessage(): string {
    return `長すぎです。${this.maxLengthMessage}文字より短くしてください。${this.message.length} / ${this.maxLengthMessage}`;
  }

  public disabledPost(): boolean {
    return (this.message.length <= 0 || /^\s*$/.test(this.message));
  }
}
