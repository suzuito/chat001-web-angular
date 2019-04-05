import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ProfileAvatarEditorComponent } from './profile-avatar-editor.component';
import { DialogConfirmerComponent, DataDialogConfirmerComponent } from '../parts/dialog-confirmer/dialog-confirmer.component';

@Injectable({
  providedIn: 'root'
})
export class DeactivateProfileAvatarEditorGuard implements CanDeactivate<ProfileAvatarEditorComponent> {

  constructor(
    private dialog: MatDialog,
  ) { }

  canDeactivate(
    component: ProfileAvatarEditorComponent,
  ): Observable<boolean> | boolean {
    if (!component.fileSelected) {
      return true;
    }
    const ref = this.dialog.open(
      DialogConfirmerComponent,
      {
        disableClose: true,
        data: {
          msg: '画像を選択中ですが、本当にページを去りますか？',
          yes: 'はい',
          no: 'いいえ',
        } as DataDialogConfirmerComponent,
      },
    );
    return ref.afterClosed();
  }

}
