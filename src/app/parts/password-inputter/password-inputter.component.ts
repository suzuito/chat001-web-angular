import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-password-inputter',
  templateUrl: './password-inputter.component.html',
  styleUrls: ['./password-inputter.component.scss']
})
export class PasswordInputterComponent implements OnInit {

  public passwordRaw: string;

  constructor(
    public dialogRef: MatDialogRef<PasswordInputterComponent>
  ) { }

  ngOnInit() {
  }

  public post(): void {
    this.dialogRef.close(this.passwordRaw);
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }

}
