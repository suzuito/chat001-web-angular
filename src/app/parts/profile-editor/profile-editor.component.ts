import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { fileToSrcURL } from 'src/app/util/image';

export interface DataProfileEditorComponent {
  name: string;
  description: string;
  isPublic: boolean;
}

const maxLengthName = 30;
const maxLengthDescription = 100;

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

  public maxLengthName(): number {
    return maxLengthName;
  }

  public lengthName(): number {
    return this.data.name.length;
  }

  public maxLengthDescription(): number {
    return maxLengthDescription;
  }

  public lengthDescription(): number {
    return this.data.description.length;
  }

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
    if (this.lengthName() <= 0) {
      return true;
    }
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

  public hintName(): string {
    return `${this.lengthName()} / ${this.maxLengthName()}`;
  }

  public hintLabelName(): string {
    return `最大${this.maxLengthName()}文字`;
  }

  public errorName(): string {
    return '名前を入力してください';
  }

  public hintDescription(): string {
    return `${this.lengthDescription()} / ${this.maxLengthDescription()}`;
  }

  public hintLabelDescription(): string {
    return `最大${this.maxLengthDescription()}文字`;
  }

}
