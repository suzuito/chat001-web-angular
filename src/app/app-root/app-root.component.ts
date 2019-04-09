import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material';
import { Router } from '@angular/router';
import { AppRootService } from './app-root.service';
import { RoomService } from '../room/room.service';
import { SideMenuScrollService } from '../side-menu/side-menu-scroll.service';

@Component({
  selector: 'app-app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav')
  public sidenav: MatSidenav;

  @ViewChild('sidenavContent')
  public sidenavContent: MatSidenavContent;

  constructor(
    private router: Router,
    private appRootService: AppRootService,
    private roomService: RoomService,
    private scrollService: SideMenuScrollService,
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

  ngOnInit(): void {
    if (this.isScreenWide()) {
      this.sidenav.open();
    }
    this.scrollService.init(this.sidenavContent);
  }

  ngAfterViewInit(): void {
  }

  public toggleSideNav(): void {
    if (this.isScreenWide() && this.sidenav.opened) {
      return;
    }
    this.sidenav.toggle();
  }

  public openSideNav(): void {
    this.sidenav.open();
  }

  public closeSideNav(): void {
    if (this.isScreenWide()) {
      return;
    }
    this.sidenav.close();
  }

  public isOpened(): boolean {
    return this.sidenav.opened;
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

  private isScreenWide(): boolean {
    return window.innerWidth > 600;
  }

  public backDropSideNav(): boolean {
    if (this.isScreenWide()) {
      return false;
    }
    return true;
  }

  public modeSideNav(): string {
    if (this.isScreenWide()) {
      return 'side';
    }
    return 'push';
  }

  public widthSideNav(): string {
    if (this.isScreenWide()) {
      return '300px';
    }
    return '90%';
  }
}
