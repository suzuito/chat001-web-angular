import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DataProfileEditorComponent {
  name: string;
  description: string;
}

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent implements OnInit {

  public data: DataProfileEditorComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public src: DataProfileEditorComponent,
    public ref: MatDialogRef<ProfileEditorComponent>,
  ) {
    this.data = Object.assign({}, this.src);
  }

  ngOnInit() {
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

}
