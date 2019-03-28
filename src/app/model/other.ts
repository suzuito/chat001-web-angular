import { Agent, RoomAgentIn, RoomsAgentIn, EasyAgent } from './agent';

export interface Init {
  readonly agent: Agent;
  readonly roomsAgentIn: RoomsAgentIn;
  readonly messageTtl: number;
  readonly unreadMessages: number;
  readonly messages: number;
  readonly agents: EasyAgent[];
  readonly newed: boolean;
}
