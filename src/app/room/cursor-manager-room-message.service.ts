import { Injectable } from '@angular/core';
import { CursorManager } from '../cursor-manager';
import { RoomMessageService } from '../room-message.service';
import { AppService } from '../app.service';
import { ApiService } from '../api.service';
import { LocalStorageService, LocalStorageKey } from '../local-storage.service';
import { Messages, Message } from '../model/room_message';
import { DataSyncherService } from '../data-syncher.service';

@Injectable({
  providedIn: 'root'
})
export class CursorManagerRoomMessageService extends CursorManager {

  constructor(
    private roomMessageService: RoomMessageService,
    private appService: AppService,
    private dataSyncherService: DataSyncherService,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
  ) {
    super();
  }

  public async fetch(roomId: string): Promise<void> {
    return this.apiService.getRoomMessages(
      this.localStorageService.get(LocalStorageKey.A),
      roomId,
      this.get(roomId),
      30,
    ).then((messages: Messages) => {
      // this.appService.getUnknownAgentProfile(...messages.messages.map((v: Message) => v.agentExternalId));
      messages.messages.forEach(msg => {
        this.dataSyncherService.addAgent(msg.agentExternalId);
      });
      this.roomMessageService.pushMessage(roomId, ...messages.messages);
      this.set(roomId, messages.nextCursor);
    });
  }

}
