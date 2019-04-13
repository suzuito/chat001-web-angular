import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, ErrorStateMatcher } from '@angular/material';
import { AgentInRoom, Room } from 'src/app/model/room';

export interface DataMultiLineInputter {
  readonly message: string;
  readonly maxLengthMessage: number;
  readonly autoCompleteRooms: Room[];
  readonly autoCompleteReply: AgentInRoom[];
}

export interface ResultMultiLineInputter {
  readonly ok: boolean;
  readonly message: string;
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
  public autoCompleteRooms: Room[];
  public autoCompleteReply: AgentInRoom[];

  public errorStateMatcherMessage: ErrorStateMatcherMessage;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: DataMultiLineInputter,
    private ref: MatBottomSheetRef<MultiLineInputterComponent>,
  ) {
    this.message = data.message;
    this.maxLengthMessage = data.maxLengthMessage;
    this.errorStateMatcherMessage = new ErrorStateMatcherMessage(this);
    this.autoCompleteReply = data.autoCompleteReply;
    this.autoCompleteRooms = data.autoCompleteRooms;
  }

  ngOnInit() {
  }

  public ok() {
    this.ref.dismiss({
      ok: true,
      message: this.message,
    } as ResultMultiLineInputter);
  }
  public cancel() {
    this.ref.dismiss({
      ok: false,
      message: this.message,
    } as ResultMultiLineInputter);
  }

  public widthWindow(): string {
    return `${window.innerWidth}px`;
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
