import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fileToSrcURL, blobToFile } from '../util/image';
import { ImageCripperComponent } from '../image-cripper/image-cripper.component';
import { MatDialog } from '@angular/material';
import {
  DialogProfileAvatarConfirmerComponent,
  DataAvatarConfirmer,
} from '../parts/dialog-profile-avatar-confirmer/dialog-profile-avatar-confirmer.component';
import { Header001Service } from '../header001/header001.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-profile-avatar-editor',
  templateUrl: './profile-avatar-editor.component.html',
  styleUrls: ['./profile-avatar-editor.component.scss']
})
export class ProfileAvatarEditorComponent implements OnInit {

  public srcNew: string;

  public sizeImgCripper: string;

  public fileSelected: File;

  @ViewChild('fileInputter')
  private domFile: ElementRef;

  @ViewChild('imageCripper')
  private imageCripper: ImageCripperComponent;

  constructor(
    private dialog: MatDialog,
    private header001Service: Header001Service,
    private appService: AppService,
  ) {
    this.sizeImgCripper = '250px';
    this.fileSelected = null;
  }

  ngOnInit() {
    this.header001Service.title = 'アバターの編集';
  }

  public selectImage(): void {
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
      this.fileSelected = files.item(0);
      // this.app.uploadFile(this.agent.currentRoomId, f);
      (el as any).value = null;
      fileToSrcURL(this.fileSelected).then((v: string | ArrayBuffer) => {
        console.log(v);
        this.imageCripper.setSrc(v as string);
      });
    });
    el.click();
  }

  private clear(): void {
    this.fileSelected = null;
  }

  public async resultCripper(blob: Blob): Promise<void> {
    if (!blob) {
      this.clear();
      return;
    }
    const f = blobToFile(blob, 'confirmImg');
    this.srcNew = await fileToSrcURL(f) as string;
    const ref = this.dialog.open(DialogProfileAvatarConfirmerComponent, {
      data: {
        src: this.srcNew,
      } as DataAvatarConfirmer,
      disableClose: true,
    });
    const result = await ref.afterClosed().toPromise();
    if (!result) {
      return;
    }
    // TODO: upload
    this.appService.updateProfileAvatar(f);
    this.clear();
  }

  public vis(): string {
    if (this.fileSelected) {
      return 'visible';
    }
    return 'hidden';
  }

}
