import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material';
import { Router } from '@angular/router';
import { AppRootService } from './app-root.service';
import { RoomService } from '../room/room.service';

@Component({
  selector: 'app-app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent implements AfterViewInit {

  @ViewChild('sidenav')
  public sidenav: MatSidenav;

  @ViewChild('sidenavContent')
  public sidenavContent: MatSidenavContent;

  constructor(
    private router: Router,
    private appRootService: AppRootService,
    private roomService: RoomService,
  ) {
    this.appRootService.event.addListener('toggleSideNav', () => {
      this.toggleSideNav();
    });
    this.appRootService.event.addListener('openSideNav', () => {
      this.openSideNav();
    });
    this.appRootService.event.addListener('closeSideNav', () => {
      this.closeSideNav();
    });
  }

  ngAfterViewInit(): void {
    this.sidenavContent.elementScrolled().subscribe(() => {
    });
  }

  public toggleSideNav(): void {
    this.sidenav.toggle();
  }

  public openSideNav(): void {
    this.sidenav.open();
  }

  public closeSideNav(): void {
    this.sidenav.close();
  }

  public routeToTop(): void {
    this.router.navigate(['']);
  }

  public routeToAgentMessages(): void {
    this.router.navigate(['agent-messages']);
  }

  public routeToRoomInfo(): void {
    this.router.navigate(['room', this.roomService.roomId, 'info']);
  }
  public routeToRoomMessage(): void {
    this.router.navigate(['room', this.roomService.roomId]);
  }
  public routeToRoomMember(): void {
    this.router.navigate(['room', this.roomService.roomId, 'member']);
  }

  public displayRoomButtons(): boolean {
    return this.roomService.roomId !== null;
  }
}
