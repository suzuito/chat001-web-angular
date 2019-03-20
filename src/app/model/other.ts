import { Agent, RoomAgentIn, RoomsAgentIn } from './agent';

export interface Init {
  agent: Agent;
  roomsAgentIn: RoomsAgentIn;
  messageTtl: number;
  unreadMessages: number;
  messages: number;
}
