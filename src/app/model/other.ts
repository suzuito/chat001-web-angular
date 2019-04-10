import { Agent, RoomAgentIn, RoomsAgentIn, EasyAgent } from './agent';
import { Room } from './room';

export interface Init {
  readonly agent: Agent;
  readonly roomsAgentIn: RoomsAgentIn;
  readonly messageTtl: number;
  readonly unreadMessages: number;
  readonly messages: number;
  readonly agents: EasyAgent[];
  readonly rooms: Room[];
  readonly newed: boolean;
}

export interface RoomMessageImageLink {
  readonly url: string;
}
