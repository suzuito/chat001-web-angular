import { Injectable } from '@angular/core';
import { Agent, RoomAgentIn, RoomAgentInOnlyID, newRoomAgentIn, newRoomAgentInOnlyID } from './model/agent';
import { AgentMessage } from './model/agent_message';
import { DataStore } from './data.store';
import { AgentMessagesSearchOption } from './agent-messages/agent-messages-search-option.service';
import { Line } from './model/line';
import { AgentRoleInRoom } from './model/room';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private agent: Agent;
  private messages: DataStore<AgentMessage>;

  private roomsAgentIn: DataStore<RoomAgentInOnlyID>;

  public unreadMessages: number;

  constructor(
  ) {
    this.agent = null;
    this.messages = new DataStore<AgentMessage>();
    this.roomsAgentIn = new DataStore<RoomAgentInOnlyID>();
    this.unreadMessages = 0;
  }

  public set(agent: Agent): void {
    this.agent = agent;
  }

  public get(): Agent {
    return this.agent;
  }

  public getRoomAgentIn(roomId: string): RoomAgentInOnlyID {
    return this.roomsAgentIn.get(roomId);
  }

  public isInRoom(roomId: string): boolean {
    return this.roomsAgentIn.has(roomId);
  }

  public setMessage(...msg: AgentMessage[]) {
    msg.forEach((v: AgentMessage) => {
      this.messages.set(v.id, v);
    });
  }

  public filterMessage(opt: AgentMessagesSearchOption): AgentMessage[] {
    return this.messages.find((d: AgentMessage): boolean => {
      if (opt.txtWord) {
        const res = d.lines.filter((v: Line): boolean => {
          return (new RegExp(opt.txtWord).test(v.data));
        });
        if (res.length <= 0) {
          return false;
        }
      }
      if (opt.chkUnread) {
        if (d.read) {
          return false;
        }
      }
      return true;
    }).sort((a: AgentMessage, b: AgentMessage): number => {
      return b.createdAt - a.createdAt;
    });
  }

  public setRoom(...args: RoomAgentIn[]): void {
    args.forEach((v: RoomAgentIn) => {
      this.roomsAgentIn.set(v.room.id, newRoomAgentInOnlyID(v));
    });
  }

  public deleteRoom(roomId: string): void {
    this.roomsAgentIn.delete(roomId);
  }

  public filterRoom(): RoomAgentInOnlyID[] {
    return this.roomsAgentIn.find((d: RoomAgentInOnlyID): boolean => {
      return true;
    });
  }

  public isOwner(roomId: string): boolean {
    const results = this.roomsAgentIn.find((d: RoomAgentInOnlyID): boolean => {
      // console.log(d);
      return d.roomId === roomId && d.role === AgentRoleInRoom.Owner;
    });
    if (!results) {
      // console.log(results, false);
      return false;
    }
    if (results.length <= 0) {
      return false;
    }
    // console.log(results, true);
    return true;
  }
}
