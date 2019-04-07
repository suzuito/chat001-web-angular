import { Component, OnInit, Input, AfterViewInit, OnDestroy, OnChanges, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Room } from 'src/app/model/room';
import { ActivatedRoute, Params } from '@angular/router';
import { RoomService, CurrentRoomRoute } from '../room.service';
import { RoomMessageService } from 'src/app/room-message.service';
import { Message, Messages } from 'src/app/model/room_message';
import { SideMenuScrollService, ScrollIdRoomMessages, byRoomId } from 'src/app/side-menu/side-menu-scroll.service';
import { AppService } from 'src/app/app.service';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { DialogConfirmerComponent } from 'src/app/parts/dialog-confirmer/dialog-confirmer.component';
import { EasyAgent } from 'src/app/model/agent';
import { DataEasyAgentsService } from 'src/app/data-easy-agents.service';
import { CursorManagerRoomMessageService } from '../cursor-manager-room-message.service';
import { MultiLineInputterComponent } from 'src/app/parts/multi-line-inputter/multi-line-inputter.component';
import { fileToSrcURL } from 'src/app/util/image';
import { DialogImgUploadConfirmerComponent } from 'src/app/parts/dialog-img-upload-confirmer/dialog-img-upload-confirmer.component';

@Component({
  selector: 'app-room-message',
  templateUrl: './room-message.component.html',
  styleUrls: ['./room-message.component.scss']
})
export class RoomMessageComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {

  private prevRoomId: string;
  private message: string;

  @ViewChild('fileInputter')
  private domFile: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private roomMessageService: RoomMessageService,
    private roomMessageFetcher: CursorManagerRoomMessageService,
    private scrollService: SideMenuScrollService,
    private appService: AppService,
    private dataEasyAgentsService: DataEasyAgentsService,
    private dialog: MatDialog,
    private bsheet: MatBottomSheet,
  ) {
    this.prevRoomId = null;
    this.message = '';
    this.roomMessageService.addListener('message', (roomId: string) => {
      if (!this.scrollService.isBottom()) {
        return;
      }
      setTimeout(() => {
        this.scrollService.loadScrollPos(
          byRoomId(ScrollIdRoomMessages, roomId), true,
        );
      }, 500);
    });
  }

  ngOnInit() {
    this.roomService.currentRoomRoute = CurrentRoomRoute.Message;
    this.route.params.subscribe((params: Params): void => {
      if (params.roomId) {
        this.roomMessageFetcher.initialize(params.roomId);
        if (this.prevRoomId !== null) {
          this.scrollService.saveScrollPos(byRoomId(ScrollIdRoomMessages, this.prevRoomId));
        }
      }
    });
  }

  ngAfterViewInit() {
    this.scrollService.loadScrollPos(byRoomId(ScrollIdRoomMessages, this.roomService.roomId), true);
    this.prevRoomId = this.roomService.roomId;
  }

  ngAfterViewChecked() {
    if (!this.prevRoomId) {
      this.prevRoomId = this.roomService.roomId;
      return;
    }
    if (this.prevRoomId === this.roomService.roomId) {
      return;
    }
    this.scrollService.loadScrollPos(byRoomId(ScrollIdRoomMessages, this.roomService.roomId), true);
    this.prevRoomId = this.roomService.roomId;
    return;
  }

  ngOnDestroy() {
    this.scrollService.saveScrollPos(byRoomId(ScrollIdRoomMessages, this.prevRoomId));
  }

  public get room(): Room {
    return this.roomService.room;
  }

  public inputMessage(event: any) {
    if (event.keyCode !== 13) {
      return;
    }
    this.putRoomsMessages();
  }

  public messages(): Message[] {
    this.roomMessageService.clearUnread(this.room.id);
    return this.roomMessageService.getMessages(this.room.id).data;
  }

  public getRoomsMessages(): void {
    this.roomMessageFetcher.fetch(this.room.id);
  }

  private putRoomsMessages(): void {
    if (this.message.length <= 0) {
      return;
    }
    this.roomService.putRoomsMessages(this.message);
    this.message = '';
  }

  public messageAgent(externalId: string): EasyAgent {
    return this.dataEasyAgentsService.get(externalId);
  }

  public clickMore(): void {
    this.roomMessageFetcher.fetch(this.roomService.roomId);
  }

  public async openMultiLineInputter(): Promise<void> {
    const ref = this.bsheet.open(MultiLineInputterComponent, {
      disableClose: true,
      data: this.message,
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
    }
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

  public openDialogProfile(externalId: string): void {
    if (!this.dataEasyAgentsService.has(externalId)) {
      return;
    }
    this.appService.openDialogProfile(this.dataEasyAgentsService.get(externalId), false);
  }
  public openDialogRequester(externalId: string): void {
    if (!this.dataEasyAgentsService.has(externalId)) {
      return;
    }
    this.appService.openDialogRequester(this.dataEasyAgentsService.get(externalId));
  }
}
