import { Injectable } from '@angular/core';
import { DataEasyAgentsService } from 'src/app/data-easy-agents.service';
import { Room } from 'src/app/model/room';
import { ErrorStateMatcher } from '@angular/material';
import { EventEmitter } from 'events';

const maxLengthMessage = 300;

@Injectable({
  providedIn: 'root'
})
export class RoomInputterService implements ErrorStateMatcher {

  public message: string;
  public maxLengthMessage: number;

  private event: EventEmitter;

  constructor(
    private dataEasyAgentsService: DataEasyAgentsService,
  ) {
    this.message = '';
    this.maxLengthMessage = maxLengthMessage;
    this.event = new EventEmitter();
  }

  public trim(): void {
    this.message = this.message.replace(/\r\n$|\n$/, '');
  }

  public textReply(externalId: string) {
    let name = externalId;
    if (this.dataEasyAgentsService.has(externalId)) {
      name = this.dataEasyAgentsService.get(externalId).name;
    }
    if (this.message === '') {
      this.message += `@${name} `;
      return;
    }
    if (this.message[this.message.length - 1] !== ' ') {
      this.message += ` @${name} `;
      return;
    }
    this.message += `@${name} `;
  }

  public textRoom(room: Room) {
    if (this.message === '') {
      this.message += `#!${room.name} `;
      return;
    }
    if (this.message[this.message.length - 1] !== ' ') {
      this.message += ` #!${room.name} `;
      return;
    }
    this.message += `#!${room.name} `;
  }

  public length(): number {
    return this.message.length;
  }

  public includeLineBreak(): boolean {
    const chk = /\n|\r\n/;
    return chk.test(this.message);
  }

  public canPost(): boolean {
    return !(this.length() <= 0 || this.length() > this.maxLengthMessage || /^\s*$/.test(this.message));
  }

  public isErrorState(): boolean {
    return this.error() !== null;
  }

  public error(): Error {
    if (this.length() > this.maxLengthMessage) {
      return new Error(`長すぎです。${this.maxLengthMessage}文字より短くしてください。${this.length()} / ${this.maxLengthMessage}`);
    }
    return null;
  }

  public focus(): void {
    this.event.emit('focus');
  }

  public addListener(event: string | symbol, listener: (...args: any[]) => void): void {
    this.event.addListener(event, listener);
  }
}
