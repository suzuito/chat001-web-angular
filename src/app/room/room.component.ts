import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RoomService, CurrentRoomRoute } from './room.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogConfirmerComponent, DataDialogConfirmerComponent } from '../parts/dialog-confirmer/dialog-confirmer.component';
import { MatDialog } from '@angular/material';
import { AppService } from '../app.service';
import { Header002Service } from '../header002/header002.service';
import { AgentService } from '../agent.service';
import { RoomStatus, Room } from '../model/room';
import { SideMenuWidthService } from '../side-menu/side-menu-width.service';
import { MetaService, defaultKeyWords, defaultImageURL } from '../meta.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  private prevRoomId: string;

  constructor(
    public roomService: RoomService,
    private agentService: AgentService,
    public router: Router,
    private dialog: MatDialog,
    private appService: AppService,
    private route: ActivatedRoute,
    private header002Service: Header002Service,
    private sideMenuWidthService: SideMenuWidthService,
    private metaService: MetaService,
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
    this.metaService.setBase({
      description: this.room.description,
      keywords: defaultKeyWords.concat(this.room.name).join(','),
    });
    this.metaService.setOG({
      title: this.room.name,
      image: defaultImageURL,
      url: `${location.href}`,
      description: this.room.description,
      type: 'website',
      locale: 'ja_jp',
      site_name: this.room.name,
    });
    this.metaService.setTwitter({
      card: 'summary',
      title: this.room.name,
      image: defaultImageURL,
      url: `${location.href}`,
      description: this.room.description,
    });
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

  public unreadAgentMessages(): number {
    return this.agentService.unreadMessages;
  }

  public unreadAgentMessagesBadgeHidden(): boolean {
    return this.agentService.unreadMessages <= 0;
  }

  public routeToAgentMessages(): void {
    this.router.navigate(['agent-messages']);
  }

  public willDeleted(): boolean {
    if (!this.roomService.room) {
      return false;
    }
    return this.roomService.room.status > RoomStatus.Deletable;
  }

  public rightHeader(): string {
    return `${this.sideMenuWidthService.width()}px`;
  }

  public rightOps(): string {
    return `${this.sideMenuWidthService.width() + 10 /*padding*/}px`;

  }

  public get room(): Room {
    return this.roomService.room;
  }

}
