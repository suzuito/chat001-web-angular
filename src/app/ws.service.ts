import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { getWSURLFromEnv } from './util';
import { EventEmitter } from 'events';
import {
  WSMessage,
} from './model/ws';

export function newWebSocket(url: string): WebSocket {
  return new WebSocket(url);
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketNewer {
  public generate(url: string): WebSocket {
    return new WebSocket(url);
  }
}

@Injectable({
  providedIn: 'root'
})
export class WsService {

  private ws: WebSocket;
  private route: EventEmitter;
  private ev: EventEmitter;
  private websocketNewer: WebSocketNewer;
  public secondsInterval: number;
  private closed: boolean;
  private initialized: boolean;

  constructor(websocketNewer: WebSocketNewer) {
    this.closed = false;
    this.route = new EventEmitter();
    this.ev = new EventEmitter();
    this.websocketNewer = websocketNewer;
    this.secondsInterval = 1;
    this.initialized = false;
  }

  public get readyState(): number {
    if (!this.ws) { return -1; }
    return this.ws.readyState;
  }

  public addRoute(i: string, fn: (...args: any[]) => void): void {
    this.route.addListener(i, fn);
  }

  public addListener(i: string, fn: (...args: any[]) => void): void {
    this.ev.addListener(i, fn);
  }

  public initialize(agentID: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = this.websocketNewer.generate(getWSURLFromEnv(environment.ws, agentID));
      this.ws.onclose = (ev) => {
        if (this.closed) { return; }
        setTimeout(() => {
          this.initialize(agentID);
        }, this.secondsInterval * 1000);
        reject();
      };
      this.ws.onopen = (ev) => {
        if (!this.initialized) {
          this.initialized = true;
          this.ev.emit('open', null);
        } else {
          this.ev.emit('reopen', null);
        }
        resolve();
      };
      this.ws.onerror = (ev) => {
        reject();
      };
      this.ws.onmessage = (ev) => {
        this.onMessage(ev);
      };
    });
  }

  private onMessage(ev: MessageEvent): void {
    const parsed: WSMessage = JSON.parse(ev.data);
    this.route.emit(parsed.type, parsed);
  }

  public close(): void {
    if (this.ws) { this.ws.close(); }
    this.closed = true;
  }

  public wsColor(): string {
    switch (this.readyState) {
      case 0: // connecting
        return '#cddc39';
      case 1: // open
        return '#4caf50';
      case 2: // closing
        return '#ffeb3b';
      case 3: // closed
        return '#ff9800';
    }
    return '#ffffff';
  }

  public readyStateString(): string {
    switch (this.readyState) {
      case 0:
        return 'connecting';
      case 1:
        return 'open';
      case 2:
        return 'closing';
      case 3:
        return 'closed';
    }
    return 'unknown';
  }

}
