import { Agent, RoomAgentIn, RoomsAgentIn, EasyAgent } from './agent';

export interface Init {
  agent: Agent;
  roomsAgentIn: RoomsAgentIn;
  messageTtl: number;
  unreadMessages: number;
  messages: number;
  agents: EasyAgent[];
}
