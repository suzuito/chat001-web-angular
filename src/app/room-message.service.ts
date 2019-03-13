import { Injectable } from '@angular/core';
import { SortedArray } from './data.store';
import { Message } from './model/room_message';

@Injectable({
  providedIn: 'root'
})
export class RoomMessageService {

  private messages: Map<string, SortedArray<Message>>;

  constructor() {
    this.messages = new Map<string, SortedArray<Message>>();
  }

  public getMessages(roomId: string): SortedArray<Message> {
    return this.messages.get(roomId);
  }

  public pushMessage(roomId: string, msg: Message): void {
    if (!this.messages.has(roomId)) {
      this.messages.set(roomId, new SortedArray<Message>((a: Message, b: Message): number => {
        return b.createdAt - a.createdAt;
      }));
    }
    this.messages.get(roomId).push(msg);
  }
}
