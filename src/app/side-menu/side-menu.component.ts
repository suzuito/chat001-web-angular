import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { ProfileEditorComponent } from '../parts/profile-editor/profile-editor.component';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  public openEditProfile(): void {
    this.dialog.open(ProfileEditorComponent, {
      autoFocus: false,
    });
  }

}
