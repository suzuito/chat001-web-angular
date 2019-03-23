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
  private ev: EventEmitter;

  constructor() {
    this.messages = new Map<string, SortedArray<Message>>();
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
    this.messages.get(roomId).push(...msg);
    this.ev.emit('message', roomId);
  }

  public addListener(event: string, listener: (...args: any[]) => void): void {
    this.ev.addListener(event, listener);
  }
}
