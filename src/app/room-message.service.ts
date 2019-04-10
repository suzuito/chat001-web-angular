import { Injectable } from '@angular/core';
import { SortedArray } from './data.store';
import { Message } from './model/room_message';
import { EventEmitter } from 'events';

function comp(a: Message, b: Message): number {
  return a.createdAt - b.createdAt;
}

@Injectable({
  providedIn: 'root'
})
export class RoomMessageService {

  private messages: Map<string, SortedArray<Message>>;
  private unreadMessages: Map<string, number>;
  private ev: EventEmitter;

  constructor() {
    this.messages = new Map<string, SortedArray<Message>>();
    this.unreadMessages = new Map<string, number>();
    this.ev = new EventEmitter();
  }

  public getMessages(roomId: string): SortedArray<Message> {
    if (this.messages.has(roomId)) {
      return this.messages.get(roomId);
    }
    return new SortedArray<Message>(comp);
  }

  public pushMessage(roomId: string, ...msg: Message[]): void {
    if (!this.messages.has(roomId)) {
      this.messages.set(roomId, new SortedArray<Message>(comp));
    }
    const data = this.messages.get(roomId);
    msg.forEach(v => {
      if (data.data.find(vv => vv.id === v.id)) {
        return;
      }
      data.push(v);
    });
    this.ev.emit('message', roomId);
  }

  public addListener(event: string, listener: (...args: any[]) => void): void {
    this.ev.addListener(event, listener);
  }

  public incrementUnread(roomId: string, i: number): void {
    if (!this.unreadMessages.has(roomId)) {
      this.unreadMessages.set(roomId, 0);
    }
    this.unreadMessages.set(
      roomId,
      this.unreadMessages.get(roomId) + i,
    );
  }

  public unread(roomId: string): string {
    if (!this.unreadMessages.has(roomId)) {
      return '0';
    }
    return this.unreadMessages.get(roomId).toString();
  }

  public clearUnread(roomId: string): void {
    this.unreadMessages.set(roomId, 0);
  }
}
