import { Injectable } from '@angular/core';
import { CursorManager } from '../cursor-manager';
import { RoomMessageService } from '../room-message.service';
import { AppService } from '../app.service';
import { ApiService } from '../api.service';
import { LocalStorageService, LocalStorageKey } from '../local-storage.service';
import { AgentsInRoom, newAgentInRoomOnlyID } from '../model/room';
import { DataAgentsInRoomService } from '../data-agents-in-room.service';
import { DataEasyAgentsService } from '../data-easy-agents.service';

@Injectable({
  providedIn: 'root'
})
export class CursorManagerRoomMemberService extends CursorManager {

  constructor(
    private appService: AppService,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private dataAgentsInRoomService: DataAgentsInRoomService,
    private dataEasyAgentsService: DataEasyAgentsService,
  ) {
    super();
  }

  public async fetch(roomId: string): Promise<void> {
    return this.apiService.getRoomMembers(
      this.localStorageService.get(LocalStorageKey.A),
      roomId,
      this.get(roomId),
      -1,
    ).then((agentsInRoom: AgentsInRoom) => {
      agentsInRoom.agents.forEach(v => {
        this.dataEasyAgentsService.setAgent(v.agent);
      });
      this.dataAgentsInRoomService.setAgentInRoom(
        roomId,
        ...agentsInRoom.agents.map(v => {
          return newAgentInRoomOnlyID(v);
        }),
      );
      this.set(roomId, agentsInRoom.nextCursor);
    });
  }
}
