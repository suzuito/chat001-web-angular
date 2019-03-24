import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { fileToSrcURL } from 'src/app/util/image';

export interface DataProfileEditorComponent {
  name: string;
  description: string;
  urlImg: string;
}

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent implements OnInit, AfterViewInit {

  public data: DataProfileEditorComponent;

  @ViewChild('fileInputter')
  public fileInputter: ElementRef;

  @ViewChild('image')
  public image: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public src: DataProfileEditorComponent,
    public ref: MatDialogRef<ProfileEditorComponent>,
  ) {
    this.data = Object.assign({}, this.src);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  public disabledUpdate(): boolean {
    return (this.data.name === this.src.name)
      && (this.data.description === this.src.description);
  }

  public clickUpdate() {
    this.ref.close(this.data);
  }

  public clickCancel() {
    this.ref.close(null);
  }

  public selectImage(): void {
    const el = this.fileInputter.nativeElement;
    const elImg = this.image.nativeElement;
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
      const f: File = files.item(0);
      console.log(f);
      // this.app.uploadFile(this.agent.currentRoomId, f);
      (el as any).value = null;
      fileToSrcURL(f).then((v: ArrayBuffer) => {
        elImg.src = v;
      });
    });
    el.click();
  }
}
