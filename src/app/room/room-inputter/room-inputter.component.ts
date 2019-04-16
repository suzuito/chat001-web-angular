import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RoomService } from '../room.service';
import { fileToSrcURL } from 'src/app/util/image';
import { DialogImgUploadConfirmerComponent } from 'src/app/parts/dialog-img-upload-confirmer/dialog-img-upload-confirmer.component';
import { AppService } from 'src/app/app.service';
import { SideMenuWidthService } from 'src/app/side-menu/side-menu-width.service';
import { AgentService } from 'src/app/agent.service';
import { DataRoomsService } from 'src/app/data-rooms.service';
import { AgentInRoom, Room, AgentInRoomOnlyID } from 'src/app/model/room';
import { ErrorStateMatcher, MatDialog, MatInput } from '@angular/material';
import { DataAgentsInRoomService } from 'src/app/data-agents-in-room.service';
import { DataEasyAgentsService } from 'src/app/data-easy-agents.service';
import { DialogRoomCreaterNameOnlyComponent } from 'src/app/parts/dialog-room-creater-name-only/dialog-room-creater-name-only.component';
import { RoomInfo } from 'src/app/parts/room-info/room-info.component';
import { RoomInputterService } from './room-inputter.service';
import { SideMenuScrollService } from 'src/app/side-menu/side-menu-scroll.service';

const enum InputMode {
  Single = 1,
  Multiple,
}

@Component({
  selector: 'app-room-inputter',
  templateUrl: './room-inputter.component.html',
  styleUrls: ['./room-inputter.component.scss']
})
export class RoomInputterComponent implements OnInit {

  @ViewChild('fileInputter')
  private domFile: ElementRef;

  @ViewChild('textareaSingle', { read: MatInput })
  private domTextareaSingle: MatInput;

  @ViewChild('textareaMultiple', { read: MatInput })
  private domTextareaMultiple: MatInput;

  public mode: InputMode;

  constructor(
    private roomService: RoomService,
    private dataRoomsService: DataRoomsService,
    private dataEasyAgentsService: DataEasyAgentsService,
    private agentService: AgentService,
    private appService: AppService,
    private dialog: MatDialog,
    private sideMenuWidthService: SideMenuWidthService,
    private s: RoomInputterService,
  ) {
    this.mode = InputMode.Single;
    this.s.addListener('focus', () => {
      this.focus();
    });
  }

  ngOnInit() {
  }

  public autoCompleteReply(): AgentInRoomOnlyID[] {
    return this.roomService.getAgentsOnlyID().filter(a => this.dataEasyAgentsService.has(a.externalID));
  }

  public agentName(a: AgentInRoomOnlyID): string {
    if (this.dataEasyAgentsService.has(a.externalID)) {
      return this.dataEasyAgentsService.get(a.externalID).name;
    }
    return a.externalID;
  }

  public autoCompleteRooms(): Room[] {
    return this.agentService.filterRoom().map(r => this.dataRoomsService.get(r.roomId));
  }

  public checkInput(event: any): void {
    switch (event.inputType) {
      case 'insertFromPaste':
        if (this.mode === InputMode.Multiple) {
          return;
        }
        if (!this.s.includeLineBreak()) {
          return;
        }
        this.modeMultiple();
        break;
    }
  }

  public keydown(event: any) {
    window.scrollBy(0, 100);
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
    if (event.isComposing && event.keyCode === 229) {
      return;
    }
    if (event.keyCode === 13) {
      this.s.trim();
      this.putRoomsMessages();
    }
  }

  private putRoomsMessages(): void {
    if (this.s.length() <= 0) {
      return;
    }
    this.appService.putRoomsMessages(this.roomService.roomId, this.s.message);
    this.s.message = '';
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
        height: '90%',
      });
      ref.afterClosed().toPromise().then((result: boolean) => {
        if (!result) {
          return;
        }
        this.appService.postRoomsMessagesImage(this.roomService.roomId, file);
      });
    });
  }

  public widthInputter(): string {
    return `${window.innerWidth - this.sideMenuWidthService.width()}px`;
  }

  public modeMultiple(): void {
    this.mode = InputMode.Multiple;
  }

  public modeSingle(): void {
    this.mode = InputMode.Single;
  }

  public textReply(agent: AgentInRoomOnlyID) {
    this.s.textReply(agent.externalID);
    this.focus();
  }

  public hintLabelMessage(): string {
    return `最大${this.s.maxLengthMessage}文字`;
  }

  public hintMessage(): string {
    return `${this.s.length()} / ${this.s.maxLengthMessage}`;
  }

  public errorMessage(): string {
    const err = this.s.error();
    if (err) {
      return err.message;
    }
    return '';
  }

  public disabledPost(): boolean {
    return !this.s.canPost();
  }

  public async createRoom(): Promise<void> {
    const ref = this.dialog.open(DialogRoomCreaterNameOnlyComponent);
    const result: RoomInfo = await ref.afterClosed().toPromise();
    if (!result) {
      return;
    }
    this.appService.createRoomDefault(result.name, result.maxAgents, false).then(() => {
      this.appService.putRoomsMessages(this.roomService.roomId, `@all #!${result.name} を作成しました！`);
    });
  }

  private focus(): void {
    switch (this.mode) {
      case InputMode.Multiple:
        this.domTextareaMultiple.focus();
        break;
      case InputMode.Single:
        this.domTextareaSingle.focus();
        break;
      default:
        break;
    }
  }

}
