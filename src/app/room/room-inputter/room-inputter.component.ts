import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatBottomSheet, MatDialog, ErrorStateMatcher } from '@angular/material';
import { MultiLineInputterComponent, DataMultiLineInputter } from 'src/app/parts/multi-line-inputter/multi-line-inputter.component';
import { Message } from 'src/app/model/room_message';
import { RoomService } from '../room.service';
import { fileToSrcURL } from 'src/app/util/image';
import { DialogImgUploadConfirmerComponent } from 'src/app/parts/dialog-img-upload-confirmer/dialog-img-upload-confirmer.component';
import { AppService } from 'src/app/app.service';

const maxLengthMessage = 300;

class ErrorStateMatcherMessage implements ErrorStateMatcher {
  constructor(private c: RoomInputterComponent) { }
  public isErrorState(): boolean {
    return this.c.message.length > this.c.maxLengthMessage;
  }
}

@Component({
  selector: 'app-room-inputter',
  templateUrl: './room-inputter.component.html',
  styleUrls: ['./room-inputter.component.scss']
})
export class RoomInputterComponent implements OnInit {

  public get maxLengthMessage(): number {
    return maxLengthMessage;
  }

  public message: string;
  public errorStateMatcherMessage: ErrorStateMatcherMessage;

  @ViewChild('fileInputter')
  private domFile: ElementRef;

  constructor(
    private bsheet: MatBottomSheet,
    private roomService: RoomService,
    private appService: AppService,
    private dialog: MatDialog,
  ) {
    this.message = '';
    this.errorStateMatcherMessage = new ErrorStateMatcherMessage(this);
  }

  ngOnInit() {
  }

  public async openMultiLineInputter(): Promise<void> {
    const ref = this.bsheet.open(MultiLineInputterComponent, {
      disableClose: true,
      data: {
        message: this.message,
        maxLengthMessage: this.maxLengthMessage,
      } as DataMultiLineInputter,
    });
    const result = await ref.afterDismissed().toPromise();
    if (!result) {
      return;
    }
    this.message = result;
    this.putRoomsMessages();
  }

  public checkInput(event: any): void {
    switch (event.inputType) {
      case 'insertFromPaste':
        const chk = /\n|\r\n/;
        if (!chk.test(this.message)) {
          return;
        }
        this.openMultiLineInputter();
        break;
      case 'insertLineBreak':
        this.message = this.message.replace(/\r\n$|\n$/, '');
        this.putRoomsMessages();
        break;
    }
    if (this.message.length > this.maxLengthMessage) {
      this.openMultiLineInputter();
      return;
    }
  }

  private putRoomsMessages(): void {
    if (this.message.length <= 0) {
      return;
    }
    this.appService.putRoomsMessages(this.roomService.roomId, this.message);
    this.message = '';
  }

  public inputMessage(event: any) {
    if (event.keyCode !== 13) {
      return;
    }
    this.putRoomsMessages();
  }

  public async uploadImage(): Promise<void> {
    const el = this.domFile.nativeElement;
    el.addEventListener('change', (ev: any) => {
      if ('target' in ev === false) {
        return;
      }
      if ('files' in ev.target === false) {
        return;
      }
      const files: FileList = ev.target.files;
      if (files.length <= 0) {
        return;
      }
      const fileSelected = files.item(0);
      (el as any).value = null;
      this.openDialogImgUploadConfirmer(fileSelected);
    });
    el.click();
  }

  private async openDialogImgUploadConfirmer(file: File): Promise<void> {
    fileToSrcURL(file).then((v: string | ArrayBuffer) => {
      const src = v;
      const ref = this.dialog.open(DialogImgUploadConfirmerComponent, {
        data: src,
        disableClose: true,
      });
      ref.afterClosed().toPromise().then((result: boolean) => {
        if (!result) {
          return;
        }
        this.appService.postRoomsMessagesImage(this.roomService.roomId, file);
      });
    });
  }

  public colorOpenMultiLineInputter(): string {
    if (this.errorStateMatcherMessage.isErrorState()) {
      return 'warn';
    }
    return '';
  }

  public badgeOpenMultiLineInputter(): string {
    if (this.errorStateMatcherMessage.isErrorState()) {
      return '!';
    }
    return '';
  }
}
