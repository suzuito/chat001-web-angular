import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { WsService } from '../ws.service';

@Injectable({
  providedIn: 'root'
})
export class AppRootService {

  public event: EventEmitter;

  constructor() {
    this.event = new EventEmitter();
  }

  public toggleSideNav(): void {
    this.event.emit('toggleSideNav');
  }

  public openSideNav(): void {
    this.event.emit('openSideNav');
  }

  public closeSideNav(): void {
    this.event.emit('closeSideNav');
  }

}
