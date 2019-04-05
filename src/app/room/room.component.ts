import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RoomService, CurrentRoomRoute } from './room.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogConfirmerComponent, DataDialogConfirmerComponent } from '../parts/dialog-confirmer/dialog-confirmer.component';
import { MatDialog } from '@angular/material';
import { AppService } from '../app.service';
import { Header002Service } from '../header002/header002.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  private prevRoomId: string;

  constructor(
    public roomService: RoomService,
    public router: Router,
    private dialog: MatDialog,
    private appService: AppService,
    private route: ActivatedRoute,
    private header002Service: Header002Service,
  ) {
    this.prevRoomId = null;
    this.route.params.subscribe((params: Params): void => {
      if (params.roomId) {
        if (this.prevRoomId === null) {
          this.header002Service.title = this.roomService.room.name;
        } else {
          if (this.prevRoomId !== params.roomId) {
            this.header002Service.title = this.roomService.room.name;
          }
        }
        this.prevRoomId = params.roomId;
      }
    });
  }

  ngOnInit(
  ) {
  }

  public routeToAnyRoomRoute(): void {
    switch (this.roomService.currentRoomRoute) {
      case CurrentRoomRoute.Message:
        this.router.navigate(['room', this.roomService.roomId, 'member']);
        return;
      case CurrentRoomRoute.Info:
        this.router.navigate(['room', this.roomService.roomId]);
        return;
    }
    this.router.navigate(['room', this.roomService.roomId]);
  }

  public routeToInfo(): void {
    this.router.navigate(['room', this.roomService.roomId, 'info']);
  }

  public iconRoomRoute(): string {
    switch (this.roomService.currentRoomRoute) {
      case CurrentRoomRoute.Message:
        return 'group';
      case CurrentRoomRoute.Info:
        return 'message';
    }
    return 'message';
  }

  public async exitRoom(): Promise<void> {
    const ref = this.dialog.open(DialogConfirmerComponent, {
      data: {
        msg: '本当に退出しますか？',
        yes: 'はい',
        no: 'いいえ',
      } as DataDialogConfirmerComponent,
    });
    const result = await ref.afterClosed().toPromise();
    if (!result) { return; }
    this.appService.exitRoom(this.roomService.room.id);
    return;
  }

}
