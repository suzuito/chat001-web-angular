import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { fileToSrcURL } from 'src/app/util/image';

export interface DataProfileEditorComponent {
  name: string;
  description: string;
  isPublic: boolean;
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
      && (this.data.description === this.src.description)
      && (this.data.isPublic === this.src.isPublic)
      ;
  }

  public clickUpdate() {
    this.ref.close(this.data);
  }

  public clickCancel() {
    this.ref.close(null);
  }

}
